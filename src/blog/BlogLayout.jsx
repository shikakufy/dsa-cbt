import { useState, useEffect, useCallback } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import '../responsive.patch.css';

const CONTACT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog';

export default function BlogLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 80) setIsVisible(true);
      else if (y > lastScrollY) setIsVisible(false);
      else setIsVisible(true);
      setLastScrollY(y);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToTopHash = useCallback((e, hash) => {
    e.preventDefault();
    setIsMenuOpen(false);
    window.location.href = `/${hash}`;
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out, box-shadow 0.3s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isVisible ? 1 : 0,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  };

  return (
    <div className="top-page-root">
      <header style={headerStyle}>
        <div
          className="container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}
        >
          <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
              デジタルスキルアカデミー
              <span>学びをエンジニアリングする出版社</span>
            </Link>
            <button
              type="button"
              className="mobile-toggle"
              aria-label={isMenuOpen ? '閉じるメニュー' : 'メニュー'}
              onClick={() => setIsMenuOpen((p) => !p)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <nav className="main-nav">
            <a href="/#what-we-do" onClick={(e) => scrollToTopHash(e, '#what-we-do')}>
              事業内容
            </a>
            <a href="/#company" onClick={(e) => scrollToTopHash(e, '#company')}>
              会社概要
            </a>
            <a href="/#ceo-message" onClick={(e) => scrollToTopHash(e, '#ceo-message')}>
              私たちについて
            </a>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
              ブログ
            </Link>
            <a href={CONTACT_FORM} target="_blank" rel="noopener noreferrer">
              お問い合わせ
            </a>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="/#what-we-do" onClick={(e) => scrollToTopHash(e, '#what-we-do')}>
              事業内容
            </a>
            <a href="/#company" onClick={(e) => scrollToTopHash(e, '#company')}>
              会社概要
            </a>
            <a href="/#ceo-message" onClick={(e) => scrollToTopHash(e, '#ceo-message')}>
              私たちについて
            </a>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>
              ブログ
            </Link>
            <a
              href={CONTACT_FORM}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              お問い合わせ
            </a>
          </div>
        )}
      </header>

      <Outlet />

      <footer className="site-footer corporate-footer blog-page-footer">
        <div className="container footer-inner">
          <div>© 2026 デジタルスキルアカデミー合同会社</div>
          <div className="footer-links">
            <Link to="/">トップ</Link>
            <Link to="/blog">ブログ</Link>
            <a href="/#TERMS">利用規約</a>
            <a href="/#PRIVACY">プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
