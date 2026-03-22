import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSEO } from '../hooks/useSEO';

const HEADER_STYLE = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
  backgroundColor: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
};

export default function PrivacyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useSEO({
    title: 'プライバシーポリシー',
    description: 'デジタルスキルアカデミー合同会社のプライバシーポリシーです。',
    path: '/privacy',
  });

  return (
    <div className="top-page-root">
      <header style={HEADER_STYLE}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
          <div className="logo-group" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
              デジタルスキルアカデミー
              <span>学びをエンジニアリングする出版社</span>
            </Link>
            <button
              className="mobile-toggle"
              aria-label={isMenuOpen ? '閉じるメニュー' : 'メニュー'}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
          <nav className="main-nav">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>戻る</a>
            <Link to="/blog">ブログ</Link>
          </nav>
        </div>
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#" onClick={(e) => { e.preventDefault(); setIsMenuOpen(false); navigate(-1); }}>戻る</a>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>ブログ</Link>
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
