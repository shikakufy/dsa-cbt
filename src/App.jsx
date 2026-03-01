import React, { useState, useEffect } from 'react';
import './App.css';
import './responsive.patch.css';

// --- 最小モックデータ ---
const questions = [
  { id: 1, text: "問1：アジャイル開発において、スプリントのレビューを行う目的はどれか。", options: ["A. 進捗の報告", "B. 成果物の確認とフィードバック", "C. 次のスプリントの計画", "D. チームの反省"], answer: "B" },
  { id: 2, text: "問2：IPAが実施するCBT方式の試験に関する記述として、適切なものはどれか。", options: ["A. 採点結果の即時通知", "B. 筆記用具の持ち込み自由", "C. 全員一斉開始の徹底", "D. 問題用紙の持ち帰り"], answer: "A" },
];

const samplePosts = [
  { id: 1, title: '【応用情報】CBT試験で差がつく時間配分と優先順位', excerpt: '150分の制限時間をどう使い切るか。見直しのタイミングやフラグ機能の活用術を解説。', tags: ['試験対策','CBT攻略'], author: '納富 翔太', thumbnail: '' },
  { id: 2, title: '効率的な復習を実現する「弱点抽出法」', excerpt: '過去問を解くだけで終わらせない。デジタルスキルアカデミー流の効率的な復習サイクル。', tags: ['学習法','過去問'], author: '教育開発チーム', thumbnail: '' },
  { id: 3, title: '2026年度版：ストラテジ系の頻出テーマ徹底分析', excerpt: '最新の出題傾向から導き出した、短期間でスコアを伸ばすための重要ポイント集。', tags: ['ストラテジ','最新傾向'], author: '情報 太郎', thumbnail: '' },
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
      const hash = window.location.hash.slice(1) || 'TOP';
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

  // --- スクロール検知ロジック ---
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    transition: 'transform 0.4s ease-in-out, opacity 0.4s ease-in-out',
    transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
    opacity: isVisible ? 1 : 0,
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
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
            <a href="#" className="logo" onClick={() => setScreen('TOP')}>
              デジタルスキルアカデミー
              <span>模擬CBT ― ITエンジニアの学びを加速する</span>
            </a>
            <nav className="main-nav">
              <a href="#" onClick={() => { setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </nav>
          </div>
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
            <a href="#" className="logo" onClick={() => setScreen('TOP')}>
              デジタルスキルアカデミー
              <span>模擬CBT ― ITエンジニアの学びを加速する</span>
            </a>
            <nav className="main-nav">
              <a href="#" onClick={() => { setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
            </nav>
          </div>
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

    function ProfilePage() {
      return (
        <div className="top-page-root">
          <header style={headerStyle}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
              <a href="#" className="logo" onClick={() => setScreen('TOP')}>
                デジタルスキルアカデミー
                <span>模擬CBT ― ITエンジニアの学びを加速する</span>
              </a>
              <nav className="main-nav">
                <a href="#" onClick={() => { setScreen(previousScreen); window.scrollTo(0,0); }}>戻る</a>
              </nav>
            </div>
          </header>

          <main className="container profile-page" style={{ padding: '120px 40px 80px', textAlign: 'left' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#002B5B' }}>私たちについて</h1>

            <div className="profile-inner">
              <div className="profile-photo">
                <img src="/profile.jpg" alt="代表 納富 翔太" className="profile-img" />
              </div>

              <div className="profile-body">
                <div style={{ color: '#475569', lineHeight: '1.9', fontSize: '0.98rem' }}>
                <p style={{ marginBottom: '1rem', fontWeight: 700 }}>代表メッセージ：学びを、エンジニアリングする。</p>

                <p style={{ marginBottom: '1rem' }}>「なぜ、私は17歳でITの世界を志したのか」<br />私のテクノロジーへの探求心は、17歳の時に「初級システムアドミニストレータ」の資格を取得した瞬間に産声を上げました。単に資格を得ること以上に、複雑な事象を分解し、論理的な解法を導き出す「問題分析」のプロセスに、私は抗いがたい魅力を感じたのです。</p>

                <p style={{ marginBottom: '1rem' }}>その後、大阪大学、そして東京工業大学という日本最高峰の学府において、情報の深淵に触れる機会を得ました。そこで叩き込まれたのは、単なる知識の蓄積ではなく、物事の本質を構造的に捉え、最適化する「エンジニアリング」の思考回路です。</p>

                <p style={{ marginBottom: '1rem' }}>「教育を、精神論からシステムへ」<br />現代において、デジタル技術の進展は目覚ましく、情報の価値は日々塗り替えられています。しかし、日本のIT教育はいまだに効率性や再現性に課題を残しています。</p>

                <p style={{ marginBottom: '1rem' }}>私は、自らが歩んできた「問題分析」と「学術的研鑽」のプロセスを、誰もが享受できるシステムとして昇華させたいと考え、デジタルスキルアカデミーを設立しました。</p>

                <p style={{ marginBottom: '1rem' }}>私たちの提供する書籍出版、対面研修、そして最新のCBT（Computer Based Testing）プラットフォームは、それぞれが独立した点ではありません。それらは、学習者が最短距離で「わかる」から「実装できる」へと至るために緻密に設計された、一つの大きなエンジニアリング・システムです。</p>

                <p style={{ marginBottom: '1rem' }}>「知の解像度を、最高レベルへ」<br />私たちは、単なる試験対策の会社ではありません。テクノロジーを駆使して「学びの解像度」を極限まで高め、ITエンジニア一人ひとりの可能性を拡張し続ける技術集団です。</p>

                <p style={{ marginTop: '1.5rem', color: '#111827', fontWeight: 700 }}>デジタルスキルアカデミー合同会社<br />代表 <span style={{marginRight: '8px'}}>納富 翔太</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); setPreviousScreen('TOP'); setScreen('ABOUT'); window.scrollTo(0,0); }} style={{ marginLeft: '8px', fontSize: '0.95rem', color: '#002B5B', textDecoration: 'underline' }}>私たちについて</a>
                </p>
              </div>
            </div>
              </div>
          </main>

          <Footer />
        </div>
      );
    }

  if (screen === 'TERMS') return <TermsPage />;
  if (screen === 'PRIVACY') return <PrivacyPage />;
  if (screen === 'ABOUT') return <ProfilePage />;

  if (screen === 'TOP') {
    return (
      <div className="top-page-root">
        <header style={headerStyle}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
            <a href="#" className="logo">
              デジタルスキルアカデミー
              <span>学びを、エンジニアリングする。</span>
            </a>
            <nav className="main-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('what-we-do'); }}>事業内容</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('join-us'); }}>会社概要</a>
              <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('latest-news'); }}>ニュース</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setPreviousScreen('TOP'); setScreen('ABOUT'); window.scrollTo(0,0); }}>私たちについて</a>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSffFv1PxPpy6m7A-qUtmi-2iIjLU8Ma6a6KFgHp1CEuyXDimg/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">お問い合わせ</a>
            </nav>
          </div>
        </header>

        <main style={{ paddingTop: '70px' }}>
          <section className="hero" style={{ position: 'relative', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)', overflow: 'hidden' }}>
            {/* 背景にキャラクター画像（やや濃く、大きめに表示） */}
            <img src="/charactor.jpg" alt="" style={{ position: 'absolute', width: '30%', maxWidth: '420px', right: '6%', top: '10%', opacity: 0.16, pointerEvents: 'none', transform: 'translateZ(0)', mixBlendMode: 'normal' }} />
            <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#002B5B', lineHeight: '1.2' }}>ITエンジニアの「学び」を、<br />デジタルで革新する。</h1>
            <p style={{ fontSize: '1.2rem', color: '#475569', marginTop: '24px', maxWidth: '700px' }}>応用情報技術者試験をはじめとする、高度IT人材育成のための最適な学習環境をプロデュースします。</p>
          </section>

          <div className="container">
            <section id="what-we-do" style={{ padding: '100px 0' }}>
              <h2>事業内容</h2>
              <div className="grid-cards">
                <div className="card">
                  <h3>書籍・教育コンテンツ制作</h3>
                  <p>最新の試験傾向を分析した教材開発。動画講座やテキストを通じて、深い理解をサポートします。</p>
                </div>
                <div className="card">
                  <h3>模擬CBTプラットフォーム</h3>
                  <p>本番さながらのUI/UXを再現した試験システムを提供。実践的な演習で合格力を高めます。</p>
                </div>
                <div className="card">
                  <h3>DX人材育成コンサルティング</h3>
                  <p>企業向けのITリテラシー向上研修。リスキリングを促進し、組織のデジタル変革を支援します。</p>
                </div>
              </div>
            </section>

<section id="latest-news" style={{ padding: '80px 0', backgroundColor: '#fff' }}>
  <div className="container">
    <h2 style={{ fontSize: '1.8rem', color: '#002B5B', marginBottom: '40px', textAlign: 'center' }}>試験対策ニュース</h2>
    <div className="news-list" style={{ display: 'grid', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
      {samplePosts.map(p => (
        <div key={p.id} className="news-card" style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row', // スマホでは縦並び
          alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
          padding: '20px', 
          backgroundColor: '#fff', 
          borderRadius: '12px', 
          border: '1px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          {/* タグ：スマホではタイトルの上に配置 */}
          <div style={{ marginBottom: window.innerWidth <= 768 ? '12px' : '0', minWidth: '100px' }}>
            <span style={{ 
              fontSize: '10px', 
              fontWeight: 'bold', 
              padding: '4px 10px', 
              borderRadius: '4px', 
              backgroundColor: '#eff6ff', 
              color: '#1e40af',
              whiteSpace: 'nowrap'
            }}>{p.tags[0]}</span>
          </div>

          <div style={{ flex: 1, paddingLeft: window.innerWidth <= 768 ? '0' : '20px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#1e293b', marginBottom: '8px', lineHeight: '1.5' }}>{p.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{p.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="join-us" style={{ padding: '80px 0', backgroundColor: '#f8fafc' }}>
  <div className="container" style={{ maxWidth: '800px' }}>
    <h2 style={{ fontSize: '1.8rem', color: '#002B5B', marginBottom: '40px', textAlign: 'center' }}>会社概要</h2>
    
    <div className="profile-list" style={{ backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
      {[
        { label: "会社名", value: "デジタルスキルアカデミー合同会社" },
        { label: "代表者", value: "納富 翔太" },
        { label: "設立", value: "2026年3月2日" },
        { label: "所在地", value: "東京都渋谷区恵比寿西二丁目８番４号" },
        { label: "資本金", value: "30,000円" }
      ].map((item, idx) => (
        <div key={idx} style={{ 
          display: 'flex', 
          flexDirection: window.innerWidth <= 480 ? 'column' : 'row', // 極小スマホでは縦並び
          padding: '20px', 
          borderBottom: idx === 4 ? 'none' : '1px solid #f1f5f9',
          gap: window.innerWidth <= 480 ? '4px' : '0'
        }}>
          <div style={{ flex: '0 0 120px', fontWeight: 'bold', color: '#64748b', fontSize: '0.85rem' }}>{item.label}</div>
          <div style={{ flex: 1, color: '#1e293b', fontSize: '0.95rem', fontWeight: '500' }}>{item.value}</div>
        </div>
      ))}
    </div>
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