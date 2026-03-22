import { useEffect } from 'react';

const SITE_NAME = 'デジタルスキルアカデミー';
const BASE_URL = 'https://digitalskillacademy.co.jp';

function setMeta(selector, attrName, attrValue, contentValue) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', contentValue);
}

function setCanonical(href) {
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.setAttribute('type', 'application/ld+json');
    el.setAttribute('id', id);
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * @param {{
 *   title?: string,
 *   description?: string,
 *   path?: string,
 *   image?: string,
 *   jsonLd?: object,
 *   jsonLdId?: string,
 * }} options
 */
export function useSEO({ title, description, path = '/', image, jsonLd, jsonLdId } = {}) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME}｜「学び」をエンジニアリングする出版社`;
    const canonicalUrl = `${BASE_URL}${path}`;
    const ogImage = image ?? `${BASE_URL}/ogp-main.jpg`;

    document.title = fullTitle;

    setMeta('meta[name="description"]', 'name', 'description', description ?? '');
    setMeta('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description ?? '');
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description ?? '');
    setCanonical(canonicalUrl);

    if (jsonLd && jsonLdId) {
      setJsonLd(jsonLdId, jsonLd);
    }

    return () => {
      if (jsonLdId) {
        document.getElementById(jsonLdId)?.remove();
      }
    };
  }, [title, description, path, image, jsonLd, jsonLdId]);
}
