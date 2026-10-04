import { Link } from 'react-router-dom';
import '../App.css';
import '../responsive.patch.css';
import { useSEO } from '../hooks/useSEO';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';

const NAV_ITEMS = [
  { href: '/#what-we-do', label: '事業内容' },
  { href: '/#ceo-message', label: '私たちについて' },
  { href: '/#company', label: '会社概要' },
  { to: '/blog', label: 'ブログ' },
];

export default function PrivacyPage() {
  useSEO({
    title: 'プライバシーポリシー',
    description: 'デジタルスキルアカデミー合同会社のプライバシーポリシーです。',
    path: '/privacy',
  });

  return (
    <div className="top-page-root">
      <SiteHeader navItems={NAV_ITEMS} />

      <main className="home-main">
        <div className="panel panel--paper legal-panel">
          <div className="legal-content">
            <h1 className="legal-title">プライバシーポリシー</h1>

            <p>デジタルスキルアカデミー合同会社（以下、「当社」といいます。）は、本ウェブサイト上で提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。</p>

            <h3>1. 個人情報の定義</h3>
            <p>「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報（個人識別符号が含まれるものを含む）を指します。</p>

            <h3>2. 個人情報の収集方法</h3>
            <p>当社は、ユーザーが利用登録をする際やお問い合わせフォーム送信時に、氏名、メールアドレス、組織名などの個人情報をお尋ねすることがあります。</p>

            <h3>3. 個人情報を収集・利用する目的</h3>
            <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
            <ul>
              <li><strong>本サービスの提供・運営のため:</strong> 模擬試験の結果通知やアカウント管理のため。</li>
              <li><strong>ユーザーからのお問い合わせに回答するため:</strong> 本人確認を行うことを含みます。</li>
              <li><strong>更新情報、キャンペーン等のご案内のため:</strong> 当社が提供する他のサービスの案内メールを送付するため。</li>
              <li><strong>メンテナンス、重要なお知らせなど:</strong> 必要に応じたご連絡のため。</li>
              <li><strong>利用規約に違反したユーザーの特定:</strong> 不正・不当な目的でサービスを利用しようとするユーザーをお断りするため。</li>
            </ul>

            <h3>4. 個人情報の第三者提供</h3>
            <p>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。</p>
            <ul>
              <li>法令に基づく場合。</li>
              <li>人の生命、身体または財産の保護のために必要がある場合。</li>
              <li>国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合。</li>
            </ul>

            <h3>5. 個人情報の開示・訂正・利用停止</h3>
            <p>ユーザー本人から個人情報の開示、訂正、削除、利用停止等の請求があった場合には、速やかに対応いたします。</p>

            <h3>6. お問い合わせ窓口</h3>
            <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
            <div className="legal-indent-block">
              <p><strong>住所:</strong> 東京都渋谷区恵比寿西二丁目８番４号 ＥＸ恵比寿西ビル５階</p>
              <p><strong>社名:</strong> デジタルスキルアカデミー合同会社</p>
              <p><strong>代表者:</strong> 納富 翔太</p>
              <p><strong>連絡先:</strong> <a href="https://forms.gle/WpFH8Con6hLDVyJC9" target="_blank" rel="noopener noreferrer">お問い合わせフォーム</a></p>
            </div>

            <Link to="/" className="blog-back-link legal-back-link">← トップへ戻る</Link>
          </div>
        </div>
        <SiteFooter />
      </main>
    </div>
  );
}
