import { Link } from 'react-router-dom';
import { BLOG_POSTS } from './postsMeta';
import { useSEO } from '../hooks/useSEO';

export default function BlogIndex() {
  useSEO({
    title: 'ブログ',
    description:
      '試験対策・学びのヒントを発信しています。情報処理技術者試験などIT資格の学習に役立つ記事を公開中。',
    path: '/blog',
  });

  return (
    <main className="blog-page-main container">
      <header className="blog-index-header">
        <h1 className="blog-page-title">ブログ</h1>
        <p className="blog-page-lead">試験対策・学びのヒントを発信しています。</p>
      </header>
      <ul className="blog-post-list">
        {BLOG_POSTS.map((post) => (
          <li key={post.id} className="blog-post-list-item">
            <time dateTime={post.dateISO}>{post.dateLabel}</time>
            <div className="blog-post-list-body">
              <span className="news-badge">{post.category}</span>
              <Link className="news-title-link" to={`/blog/${post.id}`}>
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
