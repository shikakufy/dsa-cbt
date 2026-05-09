#!/usr/bin/env python3
# coding: utf-8
"""
Simple script to generate an SEO article using Google Generative Language (Gemini) API.
Saves the returned Markdown into the project's content folder.

Usage:
  GEMINI_API_KEY=<key> python .github/scripts/generate_seo_content.py

Optional env vars:
  OUTPUT_DIR - where to write generated files (default: src/content/blog)
  MODEL      - model id (default: gemini-1.5-flash)

The script injects a site-specific "論述のトーン" into the prompt to bias style.
"""

import os
import sys
import time
import json
import requests
from datetime import datetime

DEFAULT_MODEL = os.getenv("MODEL", "gemini-1.5-flash")
DEFAULT_OUTPUT = os.getenv("OUTPUT_DIR", "src/content/blog")
API_BASE = "https://generativelanguage.googleapis.com/v1beta/models"

# A short, explicit description of the site's tone and constraints.
SITE_TONE_JA = (
    "論述スキル.com のトーン: 丁寧かつ実践的。専門的な用語は必要に応じて使うが、可読性を最優先する。"
    "読者はIPA高度試験（午後II）を受験する社会人・学生。解説は段落構成を明確にし、" 
    "箇条書き・見出し・解答例を用いて学習しやすくする。冗長な前置きは避け、" 
    "具体的な指摘と採点観点（次数・論点）を明記する。" 
)

# Build the request payload for the Gemini generateContent endpoint.
def build_prompt_yaml():
    instruction = (
        "あなたはIPA高度情報処理技術者試験の専門家です。"
        "以下の制約に従い、午後II論述対策の記事をMarkdownで一つ生成してください。\n"
        "制約:\n"
        "- タイトル (h1)、設問の分析 (h2)、論述のポイント (h2 + 箇条書き)、解答例 (h2 + コードブロックや引用) を含める。\n"
        "- 文章は日本語で書く。句読点や整形を適切に行う。\n"
        "- 長さ: おおむね800〜1600字程度を目安に、読みやすく段落を分ける。\n"
        "- トーン: {tone}\n"
        "- 出力は純粋なMarkdown本文のみとし、余計な説明やメタ情報は付けない。\n"
    ).format(tone=SITE_TONE_JA)

    user_task = (
        "対象: IPA高度試験 午後II の問題 (システムアーキテクト / ITストラテジスト など) の想定問題一題。"
        "読者がそのまま学習に使えるよう、設問の論点抽出と、論述で押さえるべきポイント、" 
        "最後に模範解答（段落・論拠付き）を提示してください。"
    )

    # Compose request body following provided snippet shape (compatible with simple generateContent usage)
    prompt = {
        "contents": [
            {
                "parts": [
                    {"text": instruction + "\n" + user_task}
                ]
            }
        ]
    }
    return prompt


def generate_article():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("Error: GEMINI_API_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(2)

    model = DEFAULT_MODEL
    url = f"{API_BASE}/{model}:generateContent?key={api_key}"

    payload = build_prompt_yaml()

    headers = {
        "Content-Type": "application/json; charset=UTF-8"
    }

    # Basic retry/backoff
    for attempt in range(1, 5):
        try:
            resp = requests.post(url, headers=headers, json=payload, timeout=60)
            resp.raise_for_status()
            data = resp.json()

            # The exact response shape may vary; try to read common paths and fail gracefully.
            text = None
            if isinstance(data, dict):
                # Common structure: candidates[0].content.parts[0].text
                candidates = data.get('candidates') or data.get('outputs') or []
                if candidates:
                    first = candidates[0]
                    # nested access safety
                    content = first.get('content') if isinstance(first, dict) else None
                    if content and isinstance(content, dict):
                        parts = content.get('parts')
                        if parts and isinstance(parts, list) and len(parts) > 0:
                            p0 = parts[0]
                            if isinstance(p0, dict) and 'text' in p0:
                                text = p0['text']
                    # fallback: candidates[0].text
                    if not text and isinstance(first, dict) and 'text' in first:
                        text = first['text']
                # fallback: top-level 'output' or 'content'
                if not text:
                    if 'output' in data and isinstance(data['output'], str):
                        text = data['output']
                    elif 'content' in data and isinstance(data['content'], str):
                        text = data['content']

            if not text:
                # Last resort: try to pretty-print the JSON for debugging
                print("Warning: unable to find text field in response JSON. Dumping response for inspection.", file=sys.stderr)
                print(json.dumps(data, ensure_ascii=False)[:2000], file=sys.stderr)
                raise RuntimeError("Unexpected response shape from Gemini API")

            # Normalize and save
            os.makedirs(DEFAULT_OUTPUT, exist_ok=True)
            filename = f"auto-{datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')}-{os.urandom(3).hex()}.md"
            filepath = os.path.join(DEFAULT_OUTPUT, filename)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(text)

            print(f"Generated article saved to: {filepath}")
            return filepath

        except requests.HTTPError as e:
            status = getattr(e.response, 'status_code', None)
            print(f"HTTP error (attempt {attempt}): {status} - {e}", file=sys.stderr)
            if status and 400 <= status < 500:
                # Client error is unlikely to be fixed by retrying
                print(e.response.text, file=sys.stderr)
                break
        except Exception as e:
            print(f"Error on attempt {attempt}: {e}", file=sys.stderr)

        sleep = 2 ** attempt
        print(f"Retrying in {sleep}s...", file=sys.stderr)
        time.sleep(sleep)

    print("Failed to generate article after retries.", file=sys.stderr)
    return None


if __name__ == '__main__':
    generate_article()
