import { Link } from 'react-router-dom';

const NAV_SECTIONS = [
  { id: 'what-we-do', label: '事業内容' },
  { id: 'ceo-message', label: '私たちについて' },
  { id: 'company', label: '会社概要' },
];

/** ブログ・利用規約・プライバシーポリシーなど、トップページ以外で使う共通フッター（panel--white） */
export function SiteFooter() {
  return (
    <footer className="panel panel--white footer-only-panel">
      <div className="footer-v2">
        <div className="footer-v2-brand">
          <svg width="30" height="30" viewBox="0 0 26 26" aria-hidden="true">
            <rect x="2" y="2" width="22" height="22" rx="7" fill="none" stroke="#2e4374" strokeWidth="1.6" />
            <path d="M10 8 H14 A5 5 0 0 1 14 18 H10 Z" fill="#000" />
          </svg>
          <span>デジタルスキルアカデミー</span>
        </div>
        <nav className="footer-v2-nav">
          {NAV_SECTIONS.map((s) => (
            <a key={s.id} href={`/#${s.id}`} className="hover-underline">{s.label}</a>
          ))}
          <Link to="/blog" className="hover-underline">ブログ</Link>
        </nav>
        <div className="footer-v2-meta">
          <Link to="/terms">利用規約</Link>
          <Link to="/privacy">プライバシーポリシー</Link>
          <span>© 2026 デジタルスキルアカデミー合同会社</span>
        </div>
      </div>
    </footer>
  );
}
