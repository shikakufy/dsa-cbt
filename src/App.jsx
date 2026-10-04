import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './App.css';
import './responsive.patch.css';
import { useSEO } from './hooks/useSEO';
import { useLenis } from './hooks/useLenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useScrollFade } from './hooks/useScrollFade';
import { RevealText } from './components/RevealText';
import { SiteHeader } from './components/SiteHeader';
import { HeroBookshelf } from './components/HeroBookshelf';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog';

// トップページ・新着情報
const TOP_NEWS_ITEMS = [
  {
    id: '2026-09-21-pd-exam',
    dateISO: '2026-09-21',
    dateLabel: '2026.9.21',
    category: '試験制度',
    title: '「プロフェッショナルデジタルスキル試験（PD試験）」とは？2027年度開始の新試験制度を解説しました。',
    href: '/blog/2',
  },
  {
    id: '2026-05-09-ronjutsu-release',
    dateISO: '2026-05-09',
    dateLabel: '2026.5.9',
    category: 'サービス',
    title: '新サービス「RonSaiten」をリリースしました。',
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

const SERVICES = [
  {
    id: 'ronsaiten',
    accent: '#2e4374',
    glyph: '論',
    title: 'パーソナル学習サイト RonSaiten',
    sub: 'Personal Learning Site',
    catch: 'あなたの論文をAIが採点・添削・助言',
    body: '情報処理推進機構(IPA)の高度試験対策に特化したAI採点サービスです。過去問と採点基準を徹底的に学習したエンジンが、合格答案との差を明確にし、あなたの文章を直接添削して合格へ導きます。',
    href: 'https://ronjutsu.digitalskillacademy.co.jp/',
  },
  {
    id: 'publishing',
    accent: '#000000',
    glyph: '本',
    title: '出版',
    sub: 'Publishing',
    catch: 'ITエンジニアの「知」を支える、良質なコンテンツの創出',
    body: '主にIT業界向けの教育・教養書の制作および出版を行っています。最新の技術動向から、2027年度に予定される「プロフェッショナルデジタルスキル試験（PD試験）」への制度改定まで、読者の成長を加速させる確かな情報をお届けします。',
  },
];

const NAV_SECTIONS = [
  { id: 'what-we-do', label: '事業内容' },
  { id: 'ceo-message', label: '私たちについて' },
  { id: 'company', label: '会社概要' },
];

const MarkD = ({ size = 76 }) => (
  <svg width={size} height={size} viewBox="0 0 76 76" aria-hidden="true">
    <rect x="6" y="6" width="64" height="64" rx="18" fill="none" stroke="#2e4374" strokeWidth="2.2" />
    <path d="M30 24 H39 A14 14 0 0 1 39 52 H30 Z" fill="#000" />
  </svg>
);

function App() {
  const lenisRef = useLenis();
  const reducedMotion = useReducedMotion();
  const servicesRef = useRef(null);
  const watermarkRef = useRef(null);
  const missionRef = useRef(null);
  const newsRef = useRef(null);
  const ceoRef = useRef(null);
  const companyRef = useRef(null);

  useSEO({
    title: null, // トップページはデフォルトタイトルを使用
    description: '情報処理技術者試験や、2027年度開始予定の「プロフェッショナルデジタルスキル試験（PD試験）」をはじめとするIT資格対策の教育コンテンツを企画・制作・出版。書籍と学びの場で、高度IT人材の成長を支えます。',
    path: '/',
  });

  const scrollToSection = (id) => (e) => {
    e?.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -20 });
    } else {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }
  };

  const navItems = [
    ...NAV_SECTIONS.map((s) => ({ href: `#${s.id}`, label: s.label, onClick: scrollToSection(s.id) })),
    { to: '/blog', label: 'ブログ' },
  ];

  useScrollFade(missionRef, { y: 24 });
  useScrollFade(newsRef, { y: 24, stagger: 0.08 });
  useScrollFade(ceoRef, { y: 24 });
  useScrollFade(companyRef, { y: 24 });

  // ギミックB（傾いたカードスタック）＋ C（背景シェイプのパララックス）
  useEffect(() => {
    if (reducedMotion || !servicesRef.current) return undefined;

    const ctx = gsap.context(() => {
      const cards = servicesRef.current.querySelectorAll('.service-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, rotate: 0 },
        {
          opacity: 1,
          y: 0,
          rotate: (i) => (i % 2 === 0 ? -1.4 : 1.2),
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: { trigger: servicesRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        },
      );

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: servicesRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      }
    }, servicesRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="top-page-root">
      <SiteHeader navItems={navItems} />

      <main className="home-main">
        {/* ---------- Hero (Stage) ---------- */}
        <section className="panel panel--paper hero-stage">
          <HeroBookshelf className="hero-stage-bookshelf" />
          <div className="hero-stage-mark">
            <MarkD />
          </div>
          <div className="hero-stage-word">Digital Skill Academy</div>
          <p className="hero-stage-hint">人の手で、学びを<br />組み立てている。（仮）</p>
        </section>

        {/* ---------- Mission ---------- */}
        <section id="mission-section" ref={missionRef} className="panel panel--paper mission-grid">
          <span className="section-label" data-fade>(MISSION)</span>
          <div className="mission-content" data-fade>
            <RevealText as="h1" className="mission-heading" text={'「学び」を\nエンジニアリングする。'} />
            <p className="mission-body">
              情報処理技術者試験をはじめとする、高度IT人材育成のための書籍・学びの場をプロデュースします。産・官・学の現場で培った知見を、科学的な教育アプローチで体系化し、ひとりひとりの理解に合わせた学習のかたちをつくっていきます。
            </p>
          </div>
        </section>

        {/* ---------- Service / Books（ダークセクション） ---------- */}
        <section id="what-we-do" ref={servicesRef} data-header-invert className="panel panel--dark service-dark-section">
          <svg ref={watermarkRef} className="service-dark-watermark" style={{ top: '-18%', right: '-14%' }} width="640" height="640" viewBox="0 0 640 640" aria-hidden="true">
            <rect x="60" y="60" width="520" height="520" rx="140" fill="none" stroke="#fff" strokeWidth="44" />
            <path d="M260 180 H330 A140 140 0 0 1 330 460 H260 Z" fill="#fff" />
          </svg>

          <div className="service-dark-head">
            <span className="section-label section-label--invert">(SERVICE)</span>
            <h2>事業内容</h2>
          </div>

          <div className="service-cards-row">
            {SERVICES.map((s) => (
              <article key={s.id} className="service-card">
                <div className="thumb" aria-hidden="true">
                  <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 40, color: s.accent }}>{s.glyph}</span>
                </div>
                <h3>
                  {s.title}
                  <small>{s.sub}</small>
                </h3>
                <p style={{ color: s.accent, fontWeight: 700, margin: 0 }}>{s.catch}</p>
                <p>{s.body}</p>
                {s.href && (
                  <a className="pill-btn pill-btn--sm hover-underline" style={{ background: s.accent, textDecoration: 'none' }} href={s.href} target="_blank" rel="noopener noreferrer">
                    詳しく見る<span className="pill-dot" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ---------- 代表メッセージ ---------- */}
        <section id="ceo-message" ref={ceoRef} className="panel panel--paper ceo-v2-section">
          <div className="ceo-v2-top">
            <span className="section-label" data-fade>(ABOUT)</span>
            <div className="ceo-v2-body" data-fade>
              <div className="ceo-v2-text">
                <p className="ceo-v2-tagline">学びをエンジニアリングする</p>
                <p>私がデジタルに興味を持ったのは15歳の時。地元の工業高校への入学時に購入した「ポケコン」でプログラミングに没頭したことがすべての始まりでした。同時に、現在のITパスポートの源流である「初級システムアドミニストレータ」の学習を通じて、社会を支える技術の仕組みに強く惹かれました。</p>
                <p>その後、大阪大学大学院で工学を修め、社会人として歩む中で常に感じてきたのは、デジタルの底知れない奥深さと、その変化の速さです。</p>
                <p>この変化の深さと速さの中で活動するビジネスパーソンに向けて、単なる情報の羅列ではなく、良質な知識を確実に構造化・提供し、実務へと繋げる「確かな仕掛け」が必要であると痛感してきました。</p>
                <p>私はこれまで、リクルートでの多様な事業開発や、デジタル庁での行政DX推進、そして技術経営（MOT）の研究を通じ、一貫して「技術と組織、そして人の成長」に向き合ってきました。</p>
                <p>デジタルスキルアカデミーは、現代の知識変遷や技術進展を鑑みたうえで、<strong>「学びをエンジニアリングする」</strong>ことを掲げて創業しました。産・官・学の各現場で培った実践的な知見を、科学的な教育アプローチで体系化し、高度IT人材を育成するための最適な学習媒体・環境・場をプロデュースします。</p>
                <p>私たちが提供する本や場から得られる「確かな学び」が、皆さんのキャリアと未来をより豊かに、より情熱的なものに変えていく一助となり、私たちがその伴走者となれば幸いです。</p>
              </div>
              <div className="ceo-v2-photo">
                <img src="/profile.jpg" alt="代表 納富翔太" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="ceo-v2-name">納富 翔太<span>Shota Nodomi / 代表</span></h3>
            <div className="ceo-v2-timeline">
              <div className="ceo-v2-timeline-item">
                <span className="ceo-v2-timeline-dot" />
                <strong>国立大学法人 大阪大学大学院 工学研究科</strong>
                <p>工学の専門性を磨くとともに、デジタルの本質的な面白さを探究。</p>
              </div>
              <div className="ceo-v2-timeline-item">
                <span className="ceo-v2-timeline-dot" />
                <strong>株式会社リクルート | プロジェクトマネージャー（Project Manager）</strong>
                <p>HR、住宅、結婚、自動車、社内DXなど多岐にわたる事業領域でプロジェクトマネジメントを経験。アジア・北米の海外開発チームとの協業に従事。</p>
              </div>
              <div className="ceo-v2-timeline-item">
                <span className="ceo-v2-timeline-dot" />
                <strong>デジタル庁 | プロダクトマネージャーユニット長（Head of Product Management）</strong>
                <p>国民向け・法人向けの基幹サービス立ち上げおよび運用を歴任。行政におけるPdM・PM組織のマネジメントを牽引。</p>
              </div>
              <div className="ceo-v2-timeline-item">
                <span className="ceo-v2-timeline-dot" />
                <strong>国立大学法人 東京科学大学 | 技術経営専門職学位課程（MOT）</strong>
                <p>技術知見を経営・ビジネスの観点から再定義し、技術を価値に変える「仕組み」を学術的に研究。</p>
              </div>
              <div className="ceo-v2-timeline-item">
                <span className="ceo-v2-timeline-dot" />
                <strong>デジタルスキルアカデミー | CEO</strong>
                <p>15歳からのIT学習経験と産・官・学での実績を背景に、技術書・教材書籍などの教育コンテンツの企画・制作・出版を行う会社として創業。</p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- 会社概要 ---------- */}
        <section id="company" ref={companyRef} className="panel panel--paper company-v2-section">
          <span className="section-label" data-fade>(COMPANY)</span>
          <dl className="company-v2-table" data-fade>
            <div className="company-v2-row">
              <dt>会社名</dt>
              <dd>デジタルスキルアカデミー合同会社</dd>
            </div>
            <div className="company-v2-row">
              <dt>代表者</dt>
              <dd>納富 翔太</dd>
            </div>
            <div className="company-v2-row">
              <dt>設立</dt>
              <dd>2026年3月2日</dd>
            </div>
            <div className="company-v2-row">
              <dt>所在地</dt>
              <dd>〒150-0021 東京都渋谷区恵比寿西二丁目8番4号 EX恵比寿西ビル5階</dd>
            </div>
            <div className="company-v2-row">
              <dt>主な事業内容</dt>
              <dd>デジタルスキル及び情報技術に関する教育コンテンツの企画、制作、出版及び販売</dd>
            </div>
          </dl>
        </section>

        {/* ---------- News ---------- */}
        <section id="news" ref={newsRef} className="panel panel--paper news-v2-grid" aria-labelledby="news-heading">
          <div className="section-label-col" data-fade>
            <span className="section-label" id="news-heading">(NEWS)</span>
            <Link to="/blog" className="pill-btn pill-btn--outline pill-btn--sm" style={{ width: 'fit-content' }}>
              View All<span className="pill-dot" />
            </Link>
          </div>
          <ul className="news-v2-list" style={{ listStyle: 'none', margin: 0, padding: 0 }} data-fade>
            {TOP_NEWS_ITEMS.map((item) => (
              <li key={item.id} className="news-v2-item">
                <time className="news-v2-date" dateTime={item.dateISO}>{item.dateLabel}</time>
                <span className="news-v2-cat">{item.category}</span>
                <div className="news-v2-thumb" aria-hidden="true" />
                {item.href.startsWith('/blog') ? (
                  <Link className="news-v2-title hover-underline" to={item.href}>{item.title}</Link>
                ) : (
                  <a className="news-v2-title hover-underline" href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* ---------- Contact + Footer ---------- */}
        <section className="panel panel--white">
          <div className="contact-v2">
            <h2>お気軽にお問い合わせください。</h2>
            <a className="pill-btn" href={CONTACT_FORM} target="_blank" rel="noopener noreferrer">
              Contact<span className="pill-dot" />
            </a>
          </div>
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
                <a key={s.id} href={`#${s.id}`} onClick={scrollToSection(s.id)} className="hover-underline">{s.label}</a>
              ))}
              <Link to="/blog" className="hover-underline">ブログ</Link>
            </nav>
            <div className="footer-v2-meta">
              <Link to="/terms">利用規約</Link>
              <Link to="/privacy">プライバシーポリシー</Link>
              <span>© 2026 デジタルスキルアカデミー合同会社</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
