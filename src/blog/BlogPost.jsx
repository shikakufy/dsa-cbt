import { useCallback, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BLOG_POSTS } from './postsMeta';
import { useSEO } from '../hooks/useSEO';

const REPORT_SRC = `${import.meta.env.BASE_URL}blog/ap-exam-standalone.html`;

/** 同一オリジンの埋め込みレポートの実高さに合わせ、iframe 下の空きをなくす */
function useReportIframeHeight() {
  const iframeRef = useRef(null);

  const fitIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    try {
      const doc = iframe.contentDocument;
      if (!doc?.body) return;
      const measure = () => {
        const b = doc.body;
        const e = doc.documentElement;
        return Math.max(
          b.scrollHeight,
          b.offsetHeight,
          e.scrollHeight,
          e.offsetHeight,
        );
      };
      const apply = () => {
        const h = measure();
        if (h > 0) iframe.style.height = `${Math.ceil(h) + 8}px`;
      };
      apply();
      requestAnimationFrame(() => requestAnimationFrame(apply));
    } catch {
      iframe.style.height = '6400px';
    }
  }, []);

  return { iframeRef, fitIframeHeight };
}

export default function BlogPost() {
  const { id } = useParams();
  const meta = BLOG_POSTS.find((p) => p.id === id);

  useSEO(
    meta
      ? {
          title: meta.title,
          description: meta.description,
          path: `/blog/${meta.id}`,
          jsonLdId: 'blog-post-ld',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            datePublished: meta.dateISO,
            url: `https://digitalskillacademy.co.jp/blog/${meta.id}`,
            author: {
              '@type': 'Organization',
              name: 'デジタルスキルアカデミー合同会社',
              url: 'https://digitalskillacademy.co.jp',
            },
            publisher: {
              '@type': 'Organization',
              name: 'デジタルスキルアカデミー合同会社',
              url: 'https://digitalskillacademy.co.jp',
              logo: {
                '@type': 'ImageObject',
                url: 'https://digitalskillacademy.co.jp/favicon.png',
              },
            },
          },
        }
      : { title: 'ブログ', path: '/blog' },
  );

  if (!meta) {
    return (
      <main className="blog-page-main container">
        <p className="blog-page-lead">記事が見つかりません。</p>
        <Link to="/blog" className="blog-back-link">
          ブログ一覧へ
        </Link>
      </main>
    );
  }

  if (id === '2') {
    return <BlogPostPDExam meta={meta} />;
  }

  if (id !== '1') {
    return (
      <main className="blog-page-main container">
        <p className="blog-page-lead">この記事は準備中です。</p>
        <Link to="/blog" className="blog-back-link">
          ブログ一覧へ
        </Link>
      </main>
    );
  }

  return <BlogPostReport1 meta={meta} />;
}

function BlogPostPDExam({ meta }) {
  return (
    <main className="blog-page-main">
      <article className="blog-article container">
        <header className="blog-article-header">
          <p className="blog-article-meta">
            <time dateTime={meta.dateISO}>{meta.dateLabel}</time>
            <span className="news-badge">{meta.category}</span>
          </p>
          <h1 className="blog-article-title">{meta.title}</h1>
        </header>

        <div className="blog-article-intro">
          <p>
            2026年3月31日、経済産業省とIPA（独立行政法人 情報処理推進機構）は「情報処理技術者試験における試験区分体系などの見直し（案）」を公表しました。この見直しの目玉が、2027年度に新設が予定されている
            <strong>「プロフェッショナルデジタルスキル試験（仮称）」</strong>
            です。SNSやブログでは略称の
            <strong>「PD試験」</strong>
            としても呼ばれ始めています。現行の応用情報技術者試験・高度試験を受験予定の方にとっては、学習計画に直結する重要な制度変更なので、公表されている情報を一次情報ベースで整理しておきます。
          </p>

          <h2 style={{ fontSize: '1.3rem', margin: '2rem 0 1rem', color: 'var(--color-ink)' }}>プロフェッショナルデジタルスキル試験（PD試験）とは</h2>
          <p>
            プロフェッショナルデジタルスキル試験は、現行の<strong>応用情報技術者試験</strong>と各分野の<strong>高度試験</strong>を大括り化・再編するかたちで新設される試験区分です。デジタルスキル標準Ver.2.0のスキルレベル4〜5に対応する内容とされ、難易度は現行の応用情報〜高度試験と同等以上になる見込みです。
          </p>

          <h2 style={{ fontSize: '1.3rem', margin: '2rem 0 1rem', color: 'var(--color-ink)' }}>3つの試験区分（PD-M／PD-D／PD-S）</h2>
          <ul className="blog-takeaways">
            <li>
              <strong>PD-M（プロフェッショナルデジタルスキル〈マネジメント〉試験・仮称）</strong>
              ：戦略・変革・サービス・プロジェクト・ガバナンスなどマネジメント領域を横断する区分。
            </li>
            <li>
              <strong>PD-D（プロフェッショナルデジタルスキル〈データ・AI〉試験・仮称）</strong>
              ：データ活用・AI利活用に関する領域を扱う区分。
            </li>
            <li>
              <strong>PD-S（プロフェッショナルデジタルスキル〈システム〉試験・仮称）</strong>
              ：アーキテクチャ・クラウド・ネットワーク・IoT・組込み・開発・運用などシステム領域を横断する区分。
            </li>
          </ul>
          <p>
            あわせて、AI活用に必要なデータの整備・管理スキルを問う<strong>「データマネジメント試験（仮称）」</strong>も新設される予定です。
          </p>

          <h2 style={{ fontSize: '1.3rem', margin: '2rem 0 1rem', color: 'var(--color-ink)' }}>出題形式とスケジュール</h2>
          <p>
            現行の高度試験で特徴的だった論述式・記述式の出題は、新試験では原則として廃止され、全区分がCBT（コンピュータ使用試験）方式に移行する見込みです。現行制度は2026年度で終了し、新制度は2027年度から順次開始される予定で、ITパスポート・情報セキュリティマネジメント・基本情報技術者試験が2027年春ごろ、データマネジメント試験・プロフェッショナルデジタルスキル試験（PD試験）が2027年夏〜秋ごろに開始されるとの見方が有力です。
          </p>
          <p className="blog-intro-note">
            ※ 名称・区分・スケジュールはいずれも2026年9月時点の公表内容にもとづく「仮称・予定」です。シラバス案は今後もバージョンアップされる見込みのため、最新情報は必ず
            {' '}
            <a href="https://www.ipa.go.jp/shiken/minaoshi/index.html" target="_blank" rel="noopener noreferrer">IPA公式サイト「試験制度の見直しについて」</a>
            {' '}
            でご確認ください。
          </p>

          <h2 style={{ fontSize: '1.3rem', margin: '2rem 0 1rem', color: 'var(--color-ink)' }}>受験予定の方への影響</h2>
          <p>
            論述式が中心だった現行の高度試験とは出題形式が大きく変わるため、これから学習を始める方は「現行制度で受験し切るか」「新制度（PD試験）を待つか」の判断が必要になります。当社では、応用情報技術者試験の出題傾向分析（
            <Link to="/blog/1">過去5年間の出題傾向レポート</Link>
            ）のような一次データにもとづくコンテンツと、論文添削AIサービス「RonSaiten」を通じて、こうした制度変更の情報も継続してお届けしていきます。
          </p>
        </div>

        <p className="blog-article-footer-nav">
          <Link to="/blog" className="blog-back-link">
            ← ブログ一覧
          </Link>
        </p>
      </article>
    </main>
  );
}

function BlogPostReport1({ meta }) {
  const { iframeRef, fitIframeHeight } = useReportIframeHeight();

  return (
    <main className="blog-page-main">
      <article className="blog-article container">
        <header className="blog-article-header">
          <p className="blog-article-meta">
            <time dateTime={meta.dateISO}>{meta.dateLabel}</time>
            <span className="news-badge">{meta.category}</span>
          </p>
          <h1 className="blog-article-title">{meta.title}</h1>
        </header>

        <div className="blog-article-intro">
          <p>
            情報処理技術者試験のような国家資格では、出題範囲が広く、毎回の試験で「当たり／外れ」もあります。だからこそ、単発の予想問題に振り回されるのではなく、
            <strong>過去数年の出題傾向をデータとして押さえておく</strong>
            ことが、学習の優先順位づけとモチベーションの両面で効いてきます。シラバス上は同列に見える分野でも、実際の配分や頻度には差があり、限られた時間をどこに投資するかの判断材料になります。
          </p>
          <p>
            以下のレポートは、応用情報技術者試験・午前（令和3年春期〜令和7年秋期の10回、計800問）をIPAシラバスVer.7.1の小分類に沿って整理したものです。数字から読み取れる実務的な示唆の例としては、次のような点があります。
          </p>
          <ul className="blog-takeaways">
            <li>
              <strong>出題の集中</strong>
              ：10回あたりの合計では「システムの構成」が30問と突出し、その次に「アルゴリズム」25問、「応用数学」「プロセッサ」「評価指標」「OS」「ハードウェア」「データ操作」「通信プロトコル」「情報セキュリティ」などが各20問台で続きます。基礎〜技術要素のコアに学習時間を厚くするほど、期待値が高まりやすい構造です。
            </li>
            <li>
              <strong>大分類のボリューム</strong>
              ：テクノロジ系（大1〜4）が全体の過半を占め、とくに「技術要素」（大3）の出題が最も多い一方、マネジメント・ストラテジも一定数ずつ継続して出ます。「技術だけ」「管理系は後回し」にすると穴が残りやすいバランスです。
            </li>
            <li>
              <strong>シラバス上はあるが実質ゼロに近い小分類</strong>
              ：レポートでは出題0の行を折りたたみ可能にしてあります。試験対策の「捨てる／後回し」判断の参考にしてください（ただし将来の改訂で変わり得ます）。
            </li>
            <li>
              <strong>セキュリティとネットワーク・DB</strong>
              ：中分類ベースではセキュリティ、ネットワーク、データベース周りの合計が大きく、現場でも直結しやすい領域です。頻出小分類は「暗記一本」より「用語と仕組みを説明できる」レベルを目安にすると汎用性が高いです。
            </li>
          </ul>
          <p className="blog-intro-note">
            なお、小分類ごとの回別内訳には、IPA公開情報と配点割合に基づく推計を含みます。詳細はレポート冒頭の注記をご確認ください。
          </p>
        </div>

        <div className="blog-report-iframe-wrap">
          <iframe
            ref={iframeRef}
            className="blog-report-iframe"
            title="応用情報技術者試験 午前 シラバス小分類別 出題分析（R3〜R7）"
            src={REPORT_SRC}
            loading="lazy"
            onLoad={fitIframeHeight}
          />
        </div>

        <p className="blog-article-footer-nav">
          <Link to="/blog" className="blog-back-link">
            ← ブログ一覧
          </Link>
        </p>
      </article>
    </main>
  );
}
