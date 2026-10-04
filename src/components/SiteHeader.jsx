import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const CONTACT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog';

/** dark: trueでダークセクション用の白版 */
const MarkD = ({ size = 34, dark = false }) => (
  <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden="true">
    <rect x="2" y="2" width="22" height="22" rx="7" fill="none" stroke={dark ? '#fff' : '#2e4374'} strokeWidth="1.6" />
    <path d="M10 8 H14 A5 5 0 0 1 14 18 H10 Z" fill={dark ? '#fff' : '#000'} />
  </svg>
);

/**
 * 共通ヘッダー：ハンバーガー+ロゴ（常時表示）、中央ピルナビ＋右の丸アイコン（スクロールでフェード）、
 * data-header-invert を付けたセクションがヘッダーの背後に来ると、ロゴ・ハンバーガーが自動で白反転する
 * （mix-blend-mode は position:fixed と組み合わせるとブラウザのコンポジットが安定しないため、
 * IntersectionObserver による明示的な判定にしている）。
 */
export function SiteHeader({ navItems }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDark, setIsOverDark] = useState(false);
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll('[data-header-invert]');
    if (!targets.length) return undefined;

    // ヘッダーの高さ付近（上端から 40〜70px）を横切る帯だけを監視する
    const observer = new IntersectionObserver(
      () => {
        const stillOverDark = Array.from(targets).some((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top <= 56 && rect.bottom >= 40;
        });
        setIsOverDark(stillOverDark);
      },
      { rootMargin: '-40px 0px -40px 0px', threshold: [0, 0.01, 0.5, 1] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    const drawer = drawerRef.current;
    const focusable = drawer?.querySelectorAll('a, button');
    focusable?.[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key === 'Tab' && focusable?.length) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="site-header-v2">
        <div className="site-header-v2-inner">
          <div className={`site-header-v2-brand${isOverDark ? ' is-inverted' : ''}`}>
            <button
              ref={hamburgerRef}
              type="button"
              className="hamburger-v2"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
              onClick={() => setIsOpen((v) => !v)}
            >
              <span className={`hamburger-v2-line${isOpen ? ' a' : ''}`} />
              <span className={`hamburger-v2-line${isOpen ? ' b' : ''}`} />
            </button>
            <Link to="/" className="site-header-v2-logo" onClick={close}>
              <MarkD dark={isOverDark} />
              <span>デジタルスキルアカデミー</span>
            </Link>
          </div>

          <nav className={`pill-nav${isScrolled ? ' is-hidden' : ''}`} aria-label="メインナビゲーション">
            {navItems.map((item, i) => (
              <span key={item.label} className="pill-nav-item">
                {item.to ? (
                  <Link to={item.to}>{item.label}</Link>
                ) : (
                  <a href={item.href} onClick={item.onClick}>{item.label}</a>
                )}
                {i < navItems.length - 1 && <span className="pill-nav-sep">/</span>}
              </span>
            ))}
          </nav>

          <div className={`site-header-v2-icons${isScrolled ? ' is-hidden' : ''}`}>
            <span className="icon-btn-v2" title="English (Coming soon)">EN</span>
            <a className="icon-btn-v2" href={CONTACT_FORM} target="_blank" rel="noopener noreferrer" aria-label="お問い合わせ">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="0.5" y="0.5" width="15" height="11" rx="1.5" />
                <path d="M1 1.5L8 7L15 1.5" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <div className={`menu-drawer-scrim${isOpen ? ' is-open' : ''}`} onClick={close} aria-hidden="true" />
      <div ref={drawerRef} className={`menu-drawer${isOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-label="メニュー">
        <nav className="menu-drawer-nav">
          {navItems.map((item) =>
            item.to ? (
              <Link key={item.label} to={item.to} onClick={close}>{item.label}</Link>
            ) : (
              <a key={item.label} href={item.href} onClick={(e) => { item.onClick?.(e); close(); }}>{item.label}</a>
            ),
          )}
          <a href={CONTACT_FORM} target="_blank" rel="noopener noreferrer" onClick={close}>お問い合わせ</a>
        </nav>
      </div>
    </>
  );
}
