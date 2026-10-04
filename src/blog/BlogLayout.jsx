import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import '../App.css';
import '../responsive.patch.css';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

const NAV_ITEMS = [
  { href: '/#what-we-do', label: '事業内容' },
  { href: '/#ceo-message', label: '私たちについて' },
  { href: '/#company', label: '会社概要' },
  { to: '/blog', label: 'ブログ' },
];

export default function BlogLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="top-page-root">
      <SiteHeader navItems={NAV_ITEMS} />

      <main className="home-main">
        <div className="panel panel--paper blog-panel">
          <Outlet />
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
