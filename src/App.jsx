import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import './responsive.patch.css';
import { useSEO } from './hooks/useSEO';

// トップページ・新着情報
const TOP_NEWS_ITEMS = [
  {
    id: '2026-05-09-ronjutsu-release',
    dateISO: '2026-05-09',
    dateLabel: '2026.5.9',
    category: 'サービス',
    title: '新サービス「論述」をリリースしました。',
    href: 'https://ronjutsu.digitalskillacademy.co.jp/',
  },
  {
    id: '2026-03-22-ap-exam-trend',
    dateISO: '2026-03-22',
    dateLabel: '2026.3.22',
    category: 'ブログ',
    title: '応用情報技術者試験の過去5年間の出題傾向を分析してみました。',
    href: '/blog/1',
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasHeroVideoCompleted, setHasHeroVideoCompleted] = useState(false);

  useSEO({
    title: null, // トップページはデフォルトタイトルを使用
    description: '情報処理技術者試験などIT資格の学びから法人研修まで。書籍と学びの場で、高度IT人材の成長を支えます。',
    path: '/',
  });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 80) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isTopHeroPlayback = !hasHeroVideoCompleted;
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: isTopHeroPlayback ? 'transparent' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: isTopHeroPlayback ? 'none' : 'blur(10px)',
    transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out, background-color 5s ease, backdrop-filter 5s ease, box-shadow 5s ease',
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isVisible ? 1 : 0,
    boxShadow: isTopHeroPlayback ? 'none' : '0 2px 10px rgba(0,0,0,0.05)',
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <div className="top-page-root">
      <header style={headerStyle}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a href="/" className="logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}>
              デジタルスキルアカデミー
              <span>学びをエンジニアリングする出版社</span>
            </a>
            <button
              className="mobile-toggle"
              aria-label={isMenuOpen ? '閉じるメニュー' : 'メニュー'}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <nav className="main-nav">
            <a href="#what-we-do" onClick={(e) => { e.preventDefault(); scrollToSection('what-we-do'); }}>事業内容</a>
            <a href="#company" onClick={(e) => { e.preventDefault(); scrollToSection('company'); }}>会社概要</a>
            <a href="#ceo-message" onClick={(e) => { e.preventDefault(); scrollToSection('ceo-message'); }}>私たちについて</a>
            <Link to="/blog">ブログ</Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#what-we-do" onClick={(e) => { e.preventDefault(); scrollToSection('what-we-do'); }}>事業内容</a>
            <a href="#company" onClick={(e) => { e.preventDefault(); scrollToSection('company'); }}>会社概要</a>
            <a href="#ceo-message" onClick={(e) => { e.preventDefault(); scrollToSection('ceo-message'); }}>私たちについて</a>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>ブログ</Link>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>お問い合わせ</a>
          </div>
        )}
      </header>

      <main className="home-main" style={{ paddingTop: 0 }}>
        <section className="hero" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', overflow: 'hidden' }}>
          <video
            src="/heromovie.mp4"
            autoPlay
            muted
            playsInline
            aria-hidden="true"
            onEnded={() => setHasHeroVideoCompleted(true)}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2, pointerEvents: 'none', transform: 'translateZ(0)' }}
          />
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#002B5B', lineHeight: '1.2', position: 'relative', zIndex: 1 }}>「学び」をエンジニアリングする。</h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', marginTop: '24px', maxWidth: '700px', position: 'relative', zIndex: 1 }}>情報処理技術者試験をはじめとする、高度IT人材育成のための書籍・学びの場をプロデュースします。</p>
        </section>

        <section id="news" className="news-section" aria-labelledby="news-heading">
          <div className="container">
            <h2 className="section-title" id="news-heading">
              新着情報
              <span>News</span>
            </h2>
            <ul className="news-list">
              {TOP_NEWS_ITEMS.map((item) => (
                <li key={item.id} className="news-item">
                  <time dateTime={item.dateISO}>{item.dateLabel}</time>
                  <div className="news-item-body">
                    <span className="news-badge">{item.category}</span>
                    {item.href ? (
                      item.href.startsWith('/blog') ? (
                        <Link className="news-title-link" to={item.href}>
                          {item.title}
                        </Link>
                      ) : (
                        <a className="news-title-link" href={item.href} target="_blank" rel="noopener noreferrer">
                          {item.title}
                        </a>
                      )
                    ) : (
                      <span className="news-title-text">{item.title}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="container">
          <section id="what-we-do" className="services-section">
            <h2 className="section-title">事業内容<span>Service</span></h2>

            <div className="service-grid">
              <div className="service-card">
                <div className="service-icon" aria-hidden="true">🎯</div>
                <div className="service-content">
                  <span className="service-number">01</span>
                  <h3>パーソナル学習サイト RonSaiten<span>Personal Learning Site</span></h3>
                  <p className="catchphrase">あなたの論文をAIが採点・添削・助言</p>
                  <p className="description">
                    情報処理推進機構(IPA)の高度試験対策に特化したAI採点サービスです。過去問と採点基準を徹底的に学習したエンジンが、合格答案との差を明確にし、あなたの文章を直接添削して合格へ導きます。
                  </p>
                </div>
              </div>

              <div className="service-card">
                <div className="service-icon" aria-hidden="true">📘</div>
                <div className="service-content">
                  <span className="service-number">02</span>
                  <h3>出版<span>Publishing</span></h3>
                  <p className="catchphrase">ITエンジニアの「知」を支える、良質なコンテンツの創出</p>
                  <p className="description">
                    主にIT業界向けの教育・教養書の制作および出版を行っています。最新の技術動向から普遍的なリテラシーまで、読者の成長を加速させる確かな情報をお届けします。
                  </p>
                </div>
              </div>

              <div className="service-card">
                <div className="service-icon" aria-hidden="true">👥</div>
                <div className="service-content">
                  <span className="service-number">03</span>
                  <h3>法人向け研修<span>Training</span></h3>
                  <p className="catchphrase">組織の課題に即した、完全オーダーメイドの教育プログラム</p>
                  <p className="description">
                    企業のニーズに合わせ、ITスキルからマインドセットまで柔軟な研修を実施します。単なる知識の伝達に留まらず、現場で即戦力として活かせる実践的な学びを提供します。
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section id="ceo-message" className="ceo-section">
            <h2 className="section-title">代表メッセージ<span>CEO Message</span></h2>

            <div className="ceo-intro-flex">
              <div className="ceo-text">
                <p className="ceo-tagline engineering-text">学びをエンジニアリングする</p>
                <p>私がデジタルに興味を持ったのは15歳の時。地元の工業高校への入学時に購入した「ポケコン」でプログラミングに没頭したことがすべての始まりでした。同時に、現在のITパスポートの源流である「初級システムアドミニストレータ」の学習を通じて、社会を支える技術の仕組みに強く惹かれました。</p>
                <p>その後、大阪大学大学院で工学を修め、社会人として歩む中で常に感じてきたのは、デジタルの底知れない奥深さと、その変化の速さです。</p>
                <p>この変化の深さと速さの中で活動するビジネスパーソンに向けて、単なる情報の羅列ではなく、良質な知識を確実に構造化・提供し、実務へと繋げる「確かな仕掛け」が必要であると痛感してきました。</p>
                <p>私はこれまで、リクルートでの多様な事業開発や、デジタル庁での行政DX推進、そして技術経営（MOT）の研究を通じ、一貫して「技術と組織、そして人の成長」に向き合ってきました。その中で、いまのスタティックな情報提供や学びの媒体から、より一人ひとりの理解に応じた情報の提供や学習機会を作り出せる可能性を感じています。</p>
                <p>デジタルスキルアカデミーは、現代の知識変遷や技術進展を鑑みたうえで、<strong>「学びをエンジニアリングする」</strong>ことを掲げて創業しました。産・官・学の各現場で培った実践的な知見を、科学的な教育アプローチで体系化し、高度IT人材を育成するための最適な学習媒体・環境・場をプロデュースします。</p>
                <p>私たちが提供する本や場から得られる「確かな学び」が、皆さんのキャリアと未来をより豊かに、より情熱的なものに変えていく一助となり、私たちがその伴走者となれば幸いです。</p>
              </div>

              <div className="ceo-image">
                <img src="/profile.jpg" alt="代表 納富翔太" />
              </div>
            </div>

            <div className="ceo-profile-card">
              <div className="profile-header">
                <h3 className="ceo-name">納富 翔太<span>Shota Nodomi / 代表</span></h3>
                <p className="profile-section-label">経歴</p>
              </div>

              <div className="profile-body">
                <div className="timeline">
                  <div className="timeline-item">
                    <span className="dot"></span>
                    <div className="history-content">
                      <strong>国立大学法人 大阪大学大学院 工学研究科</strong>
                      <p>工学の専門性を磨くとともに、デジタルの本質的な面白さを探究。</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <span className="dot"></span>
                    <div className="history-content">
                      <strong>株式会社リクルート | プロジェクトマネージャー（Project Manager）</strong>
                      <p>HR、住宅、結婚、自動車、社内DXなど多岐にわたる事業領域でプロジェクトマネジメントを経験。アジア・北米の海外開発チームとの協業に従事。</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <span className="dot"></span>
                    <div className="history-content">
                      <strong>デジタル庁 | プロダクトマネージャーユニット長（Head of Product Management）</strong>
                      <p>国民向け・法人向けの基幹サービス立ち上げおよび運用を歴任。行政におけるPdM・PM組織のマネジメントを牽引。</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <span className="dot"></span>
                    <div className="history-content">
                      <strong>国立大学法人 東京科学大学 | 技術経営専門職学位課程（MOT）</strong>
                      <p>技術知見を経営・ビジネスの観点から再定義し、技術を価値に変える「仕組み」を学術的に研究。</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <span className="dot"></span>
                    <div className="history-content">
                      <strong>デジタルスキルアカデミー | CEO</strong>
                      <p>15歳からのIT学習経験と産・官・学での実績を背景に、技術書・教材書籍の出版および教育コンサルティングを行う会社として創業。</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="company" className="company-section">
            <h2 className="section-title">会社概要<span>Company Overview</span></h2>

            <div className="company-info-wrapper">
              <table className="company-table">
                <tbody>
                  <tr>
                    <th>会社名</th>
                    <td>デジタルスキルアカデミー合同会社</td>
                  </tr>
                  <tr>
                    <th>代表者</th>
                    <td>納富 翔太</td>
                  </tr>
                  <tr>
                    <th>設立</th>
                    <td>2026年3月2日</td>
                  </tr>
                  <tr>
                    <th>所在地</th>
                    <td>〒150-0021 東京都渋谷区恵比寿西二丁目8番4号 EX恵比寿西ビル5階</td>
                  </tr>
                  <tr>
                    <th>主な事業内容</th>
                    <td>
                      <ul className="business-list">
                        <li>デジタルスキル及び情報技術に関する教育コンテンツの企画、制作、出版及び販売</li>
                        <li>法人向けIT・DX研修の企画・運営</li>
                        <li>企業のDX施策における伴走支援・コンサルティング</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section id="contact" style={{ padding: '100px 0', textAlign: 'center' }}>
            <h2>お問い合わせ</h2>
            <p>導入相談や研修のご依頼はこちらから</p>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ display: 'inline-block', padding: '15px 40px', marginTop: '20px' }}>お問い合わせフォームを開く</a>
          </section>
        </div>
      </main>

      <footer className="site-footer corporate-footer">
        <div className="container footer-inner">
          <div>© 2026 デジタルスキルアカデミー合同会社</div>
          <div className="footer-links">
            <Link to="/terms">利用規約</Link>
            <Link to="/privacy">プライバシーポリシー</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
