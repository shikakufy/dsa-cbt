import React, { useState, useEffect } from 'react';
import './App.css';
import './responsive.patch.css';

// --- 最小モックデータ ---
const questions = [
  { id: 1, text: "問1：アジャイル開発において、スプリントのレビューを行う目的はどれか。", options: ["A. 進捗の報告", "B. 成果物の確認とフィードバック", "C. 次のスプリントの計画", "D. チームの反省"], answer: "B" },
  { id: 2, text: "問2：IPAが実施するCBT方式の試験に関する記述として、適切なものはどれか。", options: ["A. 採点結果の即時通知", "B. 筆記用具の持ち込み自由", "C. 全員一斉開始の徹底", "D. 問題用紙の持ち帰り"], answer: "A" },
];

function App() {
  // --- 追加：メニュー開閉用のState ---
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [screen, setScreen] = useState('TOP');
  const [previousScreen, setPreviousScreen] = useState('TOP'); // 戻る用
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});

  // --- URL ハッシュと画面状態を同期 ---
  useEffect(() => {
    // ページロード時及びハッシュ変更時に画面を更新
    const handleHashChange = () => {
      const rawHash = window.location.hash.slice(1) || 'TOP';
      const hash = rawHash === 'ABOUT' ? 'TOP' : rawHash;
      setScreen(hash);
    };

    // 初期化：現在のハッシュから screen を設定
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // screen が変わった時に URL ハッシュを更新
  useEffect(() => {
    if (window.location.hash.slice(1) !== screen) {
      window.history.pushState({ screen }, '', `#${screen}`);
    }
  }, [screen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [screen]);

  // --- スクロール検知ロジック ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasHeroVideoCompleted, setHasHeroVideoCompleted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= 80) {
        setIsVisible(true); // ページ最上部では常に表示
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // 下スクロールで隠す
      } else {
        setIsVisible(true); // 上スクロールで表示
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // --- 共通ヘッダースタイル ---
  const isTopHeroPlayback = screen === 'TOP' && !hasHeroVideoCompleted;
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

  const TOTAL = 80;
  const answeredCount = Object.keys(answers).length;

  // スムーズにページ内セクションへスクロールする補助関数
  const scrollToSection = (id) => {
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    if (screen !== 'TOP') {
      setScreen('TOP');
      // TOP に切り替わったあとにスクロール（レンダリングを待つ）
      setTimeout(doScroll, 60);
    } else {
      doScroll();
    }
    setIsMenuOpen(false);
  };

  function Footer() {
    return (
      <footer className="site-footer corporate-footer">
        <div className="container footer-inner">
          <div>© 2026 デジタルスキルアカデミー合同会社</div>
          <div className="footer-links">
            <a href="#" onClick={(e) => { e.preventDefault(); setPreviousScreen('TOP'); setScreen('TERMS'); window.scrollTo(0,0); }}>利用規約</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPreviousScreen('TOP'); setScreen('PRIVACY'); window.scrollTo(0,0); }}>プライバシーポリシー</a>
          </div>
        </div>
      </footer>
    );
  }

  function TermsPage() {
    return (
      <div className="top-page-root">
        <header style={headerStyle}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
            <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#" className="logo" onClick={() => { setScreen('TOP'); setIsMenuOpen(false); }}>
                デジタルスキルアカデミー
                <span>模擬CBT ― ITエンジニアの学びを加速する</span>
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
              <a href="#" onClick={() => { setIsMenuOpen(false); setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </nav>
          </div>
          {isMenuOpen && (
            <div className="mobile-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </div>
          )}
        </header>
        <main className="container" style={{ padding: '120px 40px 60px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#002B5B', textAlign: 'left' }}>利用規約</h1>
          <div style={{ color: '#475569', lineHeight: '1.9', fontSize: '0.95rem', maxWidth: '900px' }}>
            <p style={{ marginBottom: '1.5rem' }}>この利用規約（以下，「本規約」といいます。）は，デジタルスキルアカデミー合同会社（以下，「当社」といいます。）が本ウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。利用者の皆さま（以下，「ユーザー」といいます。）には，本規約に従って本サービスをご利用いただきます。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第1条（適用）</h3>
            <p style={{ marginBottom: '1.5rem' }}>本規約は，ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第2条（利用登録・アカウント管理）</h3>
            <p style={{ marginBottom: '1rem' }}>本サービスにおいては，登録希望者が本規約に同意の上，当社の定める方法によって利用登録を申請し，当社がこれを承認することによって，利用登録が完了するものとします。</p>
            <p style={{ marginBottom: '1rem' }}>ユーザーは，自己の責任において，本サービスのアカウントおよびパスワードを適切に管理するものとします。</p>
            <p style={{ marginBottom: '1.5rem' }}>ユーザーは，いかなる場合にも，アカウントおよびパスワードを第三者に譲渡または貸与し，もしくは第三者と共用することはできません。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第3条（知的財産権）</h3>
            <p style={{ marginBottom: '1rem' }}>本サービスに含まれる問題，解説，テキスト，画像，動画その他のコンテンツ（以下，「本コンテンツ」といいます。）に関する著作権その他の知的財産権は，すべて当社または正当な権利者に帰属します。</p>
            <p style={{ marginBottom: '1.5rem' }}>ユーザーは，当社の事前の書面による承諾なく，本コンテンツを複製，転載，改変，公衆送信その他の二次利用をすることはできません。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第4条（禁止事項）</h3>
            <p style={{ marginBottom: '1rem' }}>ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>法令または公序良俗に違反する行為。</li>
              <li style={{ marginBottom: '0.5rem' }}>本サービスに含まれる試験問題や回答内容を，SNS，ブログ，掲示板等に転載する行為。</li>
              <li style={{ marginBottom: '0.5rem' }}>サーバーまたはネットワークの機能を破壊したり，妨害したりする行為。</li>
              <li style={{ marginBottom: '0.5rem' }}>当社のサービスの運営を妨害するおそれのある行為。</li>
              <li>他のユーザーになりすます行為。</li>
            </ul>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第5条（本サービスの提供の停止等）</h3>
            <p style={{ marginBottom: '1rem' }}>当社は，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合。</li>
              <li style={{ marginBottom: '0.5rem' }}>地震，落雷，火災，停電または天災などの不可抗力により，本サービスの提供が困難となった場合。</li>
              <li>その他，当社が本サービスの提供が困難と判断した場合。</li>
            </ul>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第6条（保証の否認および免責事項）</h3>
            <p style={{ marginBottom: '1rem' }}>当社は，本サービスがユーザーの特定の目的に適合すること（試験の合格を保証すること等）を明示的にも黙示的にも保証するものではありません。</p>
            <p style={{ marginBottom: '1.5rem' }}>当社は，本サービスに起因してユーザーに生じたあらゆる損害について，当社の故意または重過失による場合を除き，一切の責任を負いません。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第7条（サービス内容の変更等）</h3>
            <p style={{ marginBottom: '1.5rem' }}>当社は，ユーザーに通知することなく，本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>第8条（準拠法・裁判管轄）</h3>
            <p style={{ marginBottom: '1rem' }}>本規約の解釈にあたっては，日本法を準拠法とします。</p>
            <p style={{ marginBottom: '2rem' }}>本サービスに関して紛争が生じた場合には，当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</p>
            
            <p style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#6b7280', borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>令和8年3月2日 制定<br />デジタルスキルアカデミー合同会社</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  function PrivacyPage() {
    return (
      <div className="top-page-root">
        <header style={headerStyle}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
            <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#" className="logo" onClick={() => { setScreen('TOP'); setIsMenuOpen(false); }}>
                デジタルスキルアカデミー
                <span>模擬CBT ― ITエンジニアの学びを加速する</span>
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
              <a href="#" onClick={() => { setIsMenuOpen(false); setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </nav>
          </div>
          {isMenuOpen && (
            <div className="mobile-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </div>
          )}
        </header>
        <main className="container" style={{ padding: '120px 40px 60px', textAlign: 'left' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#002B5B', textAlign: 'left' }}>プライバシーポリシー</h1>
          <div style={{ color: '#475569', lineHeight: '1.9', fontSize: '0.95rem', maxWidth: '900px' }}>
            <p style={{ marginBottom: '2rem' }}>デジタルスキルアカデミー合同会社（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>1. 個人情報の定義</h3>
            <p style={{ marginBottom: '2rem' }}>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別符号が含まれるものを含む）を指します。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>2. 個人情報の収集方法</h3>
            <p style={{ marginBottom: '2rem' }}>当社は、ユーザーが利用登録をする際やお問い合わせフォーム送信時に、氏名、メールアドレス、組織名などの個人情報をお尋ねすることがあります。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>3. 個人情報を収集・利用する目的</h3>
            <p style={{ marginBottom: '1rem' }}>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.8rem' }}><strong>本サービスの提供・運営のため:</strong> 模擬試験の結果通知やアカウント管理のため。</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>ユーザーからのお問い合わせに回答するため:</strong> 本人確認を行うことを含みます。</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>更新情報、キャンペーン等のご案内のため:</strong> 当社が提供する他のサービスの案内メールを送付するため。</li>
              <li style={{ marginBottom: '0.8rem' }}><strong>メンテナンス、重要なお知らせなど:</strong> 必要に応じたご連絡のため。</li>
              <li><strong>利用規約に違反したユーザーの特定:</strong> 不正・不当な目的でサービスを利用しようとするユーザーをお断りするため。</li>
            </ul>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>4. 個人情報の第三者提供</h3>
            <p style={{ marginBottom: '1rem' }}>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。</p>
            <ul style={{ marginLeft: '1.5rem', marginBottom: '2rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>法令に基づく場合。</li>
              <li style={{ marginBottom: '0.5rem' }}>人の生命、身体または財産の保護のために必要がある場合。</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合。</li>
            </ul>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>5. 個人情報の開示・訂正・利用停止</h3>
            <p style={{ marginBottom: '2rem' }}>ユーザー本人から個人情報の開示、訂正、削除、利用停止等の請求があった場合には、速やかに対応いたします。</p>
            
            <h3 style={{ fontSize: '1.1rem', color: '#002B5B', marginTop: '2rem', marginBottom: '0.8rem', fontWeight: '700' }}>6. お問い合わせ窓口</h3>
            <p style={{ marginBottom: '0.8rem' }}>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
            <div style={{ marginLeft: '1.5rem', marginBottom: '2rem', fontSize: '0.95rem' }}>
              <p style={{ marginBottom: '0.5rem' }}><strong>住所:</strong> 東京都渋谷区恵比寿西二丁目８番４号 ＥＸ恵比寿西ビル５階</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>社名:</strong> デジタルスキルアカデミー合同会社</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>代表者:</strong> 納富 翔太</p>
              <p><strong>連絡先:</strong> <a href="https://forms.gle/WpFH8Con6hLDVyJC9" target="_blank" rel="noopener noreferrer" style={{ color: '#002B5B', textDecoration: 'underline' }}>お問い合わせフォーム</a></p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (screen === 'TERMS') return <TermsPage />;
  if (screen === 'PRIVACY') return <PrivacyPage />;

  if (screen === 'TOP') {
    return (
      <div className="top-page-root">
        <header style={headerStyle}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
            <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="#" className="logo" onClick={() => { setScreen('TOP'); setIsMenuOpen(false); }}>
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
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('what-we-do'); }}>事業内容</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('company'); }}>会社概要</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('ceo-message'); }}>私たちについて</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
            </nav>
          </div>

          {isMenuOpen && (
            <div className="mobile-menu">
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToSection('what-we-do'); }}>事業内容</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToSection('company'); }}>会社概要</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); scrollToSection('ceo-message'); }}>私たちについて</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)}>お問い合わせ</a>
            </div>
          )}
        </header>

        <main className="home-main" style={{ paddingTop: 0 }}>
          <section className="hero" style={{ position: 'relative', width: '100%', height: '100vh', minHeight: '100dvh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', overflow: 'hidden' }}>
            {/* 背景動画を薄めの透過で表示 */}
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

          <div className="container">
            <section id="what-we-do" className="services-section">
              <h2 className="section-title">事業内容<span>Service</span></h2>

              <div className="service-grid">
                <div className="service-card">
                  <div className="service-icon" aria-hidden="true">📘</div>
                  <div className="service-content">
                    <span className="service-number">01</span>
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
                    <span className="service-number">02</span>
                    <h3>法人向け研修<span>Training</span></h3>
                    <p className="catchphrase">組織の課題に即した、完全オーダーメイドの教育プログラム</p>
                    <p className="description">
                      企業のニーズに合わせ、ITスキルからマインドセットまで柔軟な研修を実施します。単なる知識の伝達に留まらず、現場で即戦力として活かせる実践的な学びを提供します。
                    </p>
                  </div>
                </div>

                <div className="service-card">
                  <div className="service-icon" aria-hidden="true">📈</div>
                  <div className="service-content">
                    <span className="service-number">03</span>
                    <h3>DXコンサルティング<span>DX Consulting</span></h3>
                    <p className="catchphrase">変革のパートナーとして、戦略の実行を伴走支援</p>
                    <p className="description">
                      企業のDX（デジタルトランスフォーメーション）施策を成功へ導くため、共に歩むパートナーとして支援します。戦略策定から現場への定着まで、実効性のあるソリューションを提案します。
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
                  <p>その後、大阪大学大学院で工学を修め、社会人として歩む中で常に感じてきたのは、デジタルの底知れない奥深さと、その変化の早さです。</p>
                  <p>この変化の深さと速さの中で活動するビジネスパーソンに向けて、単なる情報の羅列や提供ではなく、良質な知識を確実に構造化・提供し、実務へと繋げる「確かな仕掛け」が必要であると痛感してきました。</p>
                  <p>私はこれまで、リクルートでの多様な事業開発や、デジタル庁での行政DX推進、そして技術経営（MOT）の研究を通じ、一貫して「技術と組織、そして人の成長」に向き合ってきました。その中で、いまのスタティックな情報提供や学びの媒体から、より一人ひとりの理解に応じた情報の提供、学習機会を作り出せる可能性を感じています。</p>
                  <p>デジタルスキルアカデミーは、現代の知識変遷や技術進展を鑑みたうえで、学び方を<strong>「学びをエンジニアリングする」</strong>ことを掲げ、創業しました。産・官・学の各現場で培った実践的な知見を、科学的な教育アプローチで体系化し、高度IT人材を育成するための最適な学習媒体・環境・場をプロデュースします。</p>
                  <p>私たちが提供する本や場から感じる「確かな学び」が、皆さんのキャリアと未来をより豊かに、より情熱的なものに変えていく伴走者となれば幸いです。</p>
                </div>

                <div className="ceo-image">
                  <img src="/profile.jpg" alt="代表 納富翔太" />
                </div>
              </div>

              <div className="ceo-profile-card">
                <div className="profile-header">
                  <h3 className="ceo-name">納富 翔太<span>Shota Nodomi / 代表</span></h3>
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
                        <strong>デジタル庁 | プロダクトマネージャーユニット長（Head of Product Management</strong>
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

        <Footer />
      </div>
    );
  }

  // --- EXAM screen ---
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
      <div style={{ width: 1120, background: '#ffffff', border: '1px solid #d1d5db', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
        {/* 試験画面のヘッダーは消えない方が良いので static 配置 */}
        <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
          <div className="flex items-center gap-6">
            <div className="text-[12px] text-gray-700">受験番号：AP2026-0302</div>
            <div className="text-[12px] text-gray-700">氏名：納富 翔太</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-sm bg-[#002B5B] text-white px-3 py-1 rounded">残り時間 148:22</div>
            <button className="px-3 py-1 border rounded text-[11px]" onClick={() => setScreen('TOP')}>トップに戻る</button>
          </div>
        </div>
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>模擬試験コンテンツ</h2>
          <p>問題 {currentIdx + 1} を表示中...</p>
          <button onClick={() => setScreen('TOP')}>試験を中断して戻る</button>
        </div>
      </div>
    </div>
  );
}

export default App;