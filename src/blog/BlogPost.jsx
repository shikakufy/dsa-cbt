import { Link, useParams } from 'react-router-dom';
import { BLOG_POSTS } from './postsMeta';

const REPORT_SRC = `${import.meta.env.BASE_URL}blog/ap-exam-standalone.html`;

export default function BlogPost() {
  const { id } = useParams();
  const meta = BLOG_POSTS.find((p) => p.id === id);

  if (!meta) {
    return (
      <main className="blog-page-main container">
        <p className="blog-page-lead">記事が見つかりません。</p>
        <Link to="/blog" className="blog-back-link">
          ブログ一覧へ
        </Link>
      </main>
    );
  }

  if (id !== '1') {
    return (
      <main className="blog-page-main container">
        <p className="blog-page-lead">この記事は準備中です。</p>
        <Link to="/blog" className="blog-back-link">
          ブログ一覧へ
        </Link>
      </main>
    );
  }

  return (
    <main className="blog-page-main">
      <article className="blog-article container">
        <header className="blog-article-header">
          <p className="blog-article-meta">
            <time dateTime={meta.dateISO}>{meta.dateLabel}</time>
            <span className="news-badge">{meta.category}</span>
          </p>
          <h1 className="blog-article-title">{meta.title}</h1>
        </header>

        <div className="blog-article-intro">
          <p>
            情報処理技術者試験のような国家資格では、出題範囲が広く、毎回の試験で「当たり／外れ」もあります。だからこそ、単発の予想問題に振り回されるのではなく、
            <strong>過去数年の出題傾向をデータとして押さえておく</strong>
            ことが、学習の優先順位づけとモチベーションの両面で効いてきます。シラバス上は同列に見える分野でも、実際の配分や頻度には差があり、限られた時間をどこに投資するかの判断材料になります。
          </p>
          <p>
            以下のレポートは、応用情報技術者試験・午前（令和3年春期〜令和7年秋期の10回、計800問）をIPAシラバスVer.7.1の小分類に沿って整理したものです。数字から読み取れる実務的な示唆の例としては、次のような点があります。
          </p>
          <ul className="blog-takeaways">
            <li>
              <strong>出題の集中</strong>
              ：10回あたりの合計では「システムの構成」が30問と突出し、その次に「アルゴリズム」25問、「応用数学」「プロセッサ」「評価指標」「OS」「ハードウェア」「データ操作」「通信プロトコル」「情報セキュリティ」などが各20問台で続きます。基礎〜技術要素のコアに学習時間を厚くするほど、期待値が高まりやすい構造です。
            </li>
            <li>
              <strong>大分類のボリューム</strong>
              ：テクノロジ系（大1〜4）が全体の過半を占め、とくに「技術要素」（大3）の出題が最も多い一方、マネジメント・ストラテジも一定数ずつ継続して出ます。「技術だけ」「管理系は後回し」にすると穴が残りやすいバランスです。
            </li>
            <li>
              <strong>シラバス上はあるが実質ゼロに近い小分類</strong>
              ：レポートでは出題0の行を折りたたみ可能にしてあります。試験対策の「捨てる／後回し」判断の参考にしてください（ただし将来の改訂で変わり得ます）。
            </li>
            <li>
              <strong>セキュリティとネットワーク・DB</strong>
              ：中分類ベースではセキュリティ、ネットワーク、データベース周りの合計が大きく、現場でも直結しやすい領域です。頻出小分類は「暗記一本」より「用語と仕組みを説明できる」レベルを目安にすると汎用性が高いです。
            </li>
          </ul>
          <p className="blog-intro-note">
            なお、小分類ごとの回別内訳には、IPA公開情報と配点割合に基づく推計を含みます。詳細はレポート冒頭の注記をご確認ください。
          </p>
        </div>

        <div className="blog-report-iframe-wrap">
          <iframe
            className="blog-report-iframe"
            title="応用情報技術者試験 午前 シラバス小分類別 出題分析（R3〜R7）"
            src={REPORT_SRC}
            loading="lazy"
          />
        </div>

        <p className="blog-article-footer-nav">
          <Link to="/blog" className="blog-back-link">
            ← ブログ一覧
          </Link>
        </p>
      </article>
    </main>
  );
}
