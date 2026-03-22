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

export default function TermsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useSEO({
    title: '利用規約',
    description: 'デジタルスキルアカデミー合同会社の利用規約です。',
    path: '/terms',
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
