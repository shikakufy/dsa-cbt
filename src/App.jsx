import React, { useState, useEffect } from 'react';

// --- 最小モックデータ（実データは別ファイルで管理してください） ---
const questions = [
  { id: 1, text: "問1：アジャイル開発において、スプリントのレビューを行う目的はどれか。", options: ["A. 進捗の報告", "B. 成果物の確認とフィードバック", "C. 次のスプリントの計画", "D. チームの反省"], answer: "B" },
  { id: 2, text: "問2：IPAが実施するCBT方式の試験に関する記述として、適切なものはどれか。", options: ["A. 採点結果の即時通知", "B. 筆記用具の持ち込み自由", "C. 全員一斉開始の徹底", "D. 問題用紙の持ち帰り"], answer: "A" },
];

const samplePosts = [
  { id: 1, title: '合格のための時間配分と優先順位付け', excerpt: '150分の模擬試験で実践すべき時間配分、見直しのコツを丁寧にまとめました。', tags: ['時間管理','試験戦略'], author: '試験 太郎', thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=60&auto=format&fit=crop' },
  { id: 2, title: '過去問を使った効率的な復習法', excerpt: '過去問の使い方、弱点抽出から復習計画の立て方まで。', tags: ['復習','過去問'], author: '模試 花子', thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=60&auto=format&fit=crop' },
  { id: 3, title: 'ストラテジ系の頻出テーマまとめ', excerpt: '出題傾向を押さえて、短時間で復習できるポイント集。', tags: ['ストラテジ','対策'], author: '情報 太郎', thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=60&auto=format&fit=crop' },
];

/*
  YouTubeLatest: fetches YouTube search results (order=date) for a query.
  - This runs client-side and requires a YouTube Data API v3 key.
  - Enter an API key in the input to load thumbnails.
*/
function YouTubeLatest() {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('YOUTUBE_API_KEY') || '');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // don't auto-load without a key
    if (!apiKey) return;
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const q = encodeURIComponent('応用情報技術者');
        const maxResults = 8;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&order=date&type=video&maxResults=${maxResults}&key=${apiKey}`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        const items = (json.items || []).map(it => ({
          id: it.id.videoId,
          title: it.snippet.title,
          thumb: it.snippet.thumbnails?.medium?.url || it.snippet.thumbnails?.default?.url,
          publishedAt: it.snippet.publishedAt,
          channelTitle: it.snippet.channelTitle,
        }));
        // sort by publishedAt desc
        items.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
        setVideos(items);
      } catch (e) {
        if (e.name !== 'AbortError') setError(e.message || String(e));
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [apiKey]);

  function saveKey() {
    localStorage.setItem('YOUTUBE_API_KEY', apiKey);
    // re-run effect (apiKey already changed)
    setApiKey(apiKey);
  }

  return (
    <div className="yt-strip container">
      <div className="yt-head">
        <div className="yt-title">YouTube：最近の応用情報関連</div>
        <div className="yt-controls">
          <input className="yt-key" placeholder="YouTube API Key（省略時は読み込みしません）" value={apiKey} onChange={e => setApiKey(e.target.value)} />
          <button className="yt-load" onClick={saveKey}>保存して読み込み</button>
        </div>
      </div>

      {error && <div className="yt-error">動画取得エラー: {error}</div>}

      {loading && <div className="yt-loading">読み込み中…</div>}

      <div className="yt-row">
        {videos.length === 0 && !loading && <div className="yt-empty">APIキーを入力して「保存して読み込み」を押すとサムネイルが表示されます。</div>}
        {videos.map(v => (
          <a key={v.id} className="yt-item" href={`https://youtu.be/${v.id}`} target="_blank" rel="noreferrer">
            <img src={v.thumb} alt={v.title} />
            <div className="yt-meta">
              <div className="yt-vtitle">{v.title}</div>
              <div className="yt-channel">{v.channelTitle}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useState('TOP');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qid]: 'A' }
  const [flags, setFlags] = useState({}); // { [qid]: true }

  const TOTAL = 80;

  const answeredCount = Object.keys(answers).length;

  if (screen === 'TOP') {
    return (
      <div className="top-page-root note-like">
        <header className="site-header">
          <div className="container header-inner">
            <div className="brand">
              <div className="brand-logo" aria-hidden>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" rx="6" fill="#002B5B" />
                  <path d="M12 32L24 16L36 32" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="brand-text">
                <div className="brand-title">デジタルスキルアカデミー</div>
                <div className="brand-sub">模擬CBT — 応用情報対策</div>
              </div>
            </div>

            <button className="hamburger" aria-label="メニュー" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#002B5B" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <nav className={`main-nav ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)}>
              <a href="#features">特徴</a>
              <a href="#past">過去問</a>
              <a href="#faq">よくある質問</a>
              <button className="nav-cta" onClick={() => setScreen('EXAM')}>模擬試験を開始</button>
            </nav>
          </div>
        </header>

        {/* YouTube latest videos strip (search: 応用情報技術者) */}
        <YouTubeLatest />

        <main className="note-hero">
          <div className="container note-hero-inner">
            <div className="note-hero-left">
              <h1 className="note-title">学習メモと模擬試験を、まとめて効率よく</h1>
              <p className="note-sub">過去問ベースの模擬試験と解説を素早くチェック。学習の記録を残して次の学習へつなげます。</p>

              <div className="search-wrap">
                <input className="search-input" placeholder="記事・対策を検索（例：時間配分、過去問）" />
                <button className="search-btn">検索</button>
              </div>

              <div className="quick-tags">
                <button className="tag">#時間管理</button>
                <button className="tag">#過去問</button>
                <button className="tag">#ストラテジ</button>
                <button className="tag">#復習</button>
              </div>
            </div>

            <div className="note-hero-right">
              <div className="promo-card">
                <div className="promo-label">おすすめ</div>
                <h3 className="promo-title">模擬試験で本番の雰囲気を体験</h3>
                <p className="promo-excerpt">受験番号やタイマー表示を含む本番想定のUIで実践練習できます。</p>
                <button className="nav-cta" onClick={() => setScreen('EXAM')}>模擬試験を開始</button>
              </div>
            </div>
          </div>

          <div className="container posts-section">
            <h2 className="section-title">注目の投稿</h2>
            <div className="posts-grid">
              {samplePosts.map(p => (
                <article key={p.id} className="post-card" role="article">
                  {p.thumbnail && (
                    <img className="post-thumb" src={p.thumbnail} alt={`${p.title} のサムネイル`} />
                  )}
                  <div className="post-content">
                    <div className="post-tag">{p.tags[0]}</div>
                    <h3 className="post-title">{p.title}</h3>
                    <p className="post-excerpt">{p.excerpt}</p>
                    <div className="post-meta"><span className="author">{p.author}</span></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>

        <section id="features" className="features container">
          <div className="feature-grid">
            <div className="feature">
              <h3>本番ライクなUI</h3>
              <p>受験番号表示や問題ナビなど、本番に近い画面で演習できます。</p>
            </div>
            <div className="feature">
              <h3>復習モード</h3>
              <p>解説や間違い直しの履歴を残して復習できます。</p>
            </div>
            <div className="feature">
              <h3>時間管理</h3>
              <p>制限時間を意識した練習で試験本番に備えます。</p>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div>© 2026 デジタルスキルアカデミー</div>
            <div className="small-links">
              <a href="#">利用規約</a>
              <a href="#">プライバシー</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // --- EXAM screen (IPA-like past-question layout) ---
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif', fontSize: '12px' }}>
      <div style={{ width: 1120, background: '#ffffff', border: '1px solid #d1d5db', boxShadow: '0 4px 12px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column' }}>
        {/* top bar: candidate info / timer / controls */}
        <div className="flex items-center justify-between bg-white px-4 py-2 border-b">
          <div className="flex items-center gap-6">
            <div className="text-[12px] text-gray-700">受験番号：IP1401 A001</div>
            <div className="text-[12px] text-gray-700">氏名：試験 太郎</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-sm bg-[#002B5B] text-white px-3 py-1 rounded">残り時間 148:22</div>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 border rounded text-[11px]">白黒反転</button>
              <button className="px-2 py-1 border rounded text-[11px]">背景色変更</button>
              <button className="px-2 py-1 border rounded text-[11px]">文字色変更</button>
              <button className="px-2 py-1 border rounded text-[11px]">表示倍率</button>
            </div>
          </div>
        </div>

        {/* content area with left nav + main question */}
        <div style={{ display: 'flex', gap: 12, padding: 16 }}>
          {/* left navigation: 1-80 grid */}
          <aside style={{ width: 220, background: '#f8fafc', border: '1px solid #e6eef6', padding: 10 }}>
            <div style={{ fontSize: 12, color: '#374151', fontWeight: 700, marginBottom: 8 }}>問題一覧</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
              {Array.from({ length: TOTAL }).map((_, i) => {
                const qid = i + 1;
                const answered = !!answers[qid];
                const flagged = !!flags[qid];
                const isCurrent = currentIdx === i;
                const base = { height: 34, borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' };
                const style = Object.assign({}, base, flagged ? { background: '#fff7cc', border: '1px solid #f1c40f' } : answered ? { background: '#1e40af', color: '#fff', border: '1px solid #1e3a8a' } : { background: '#fff' });
                if (isCurrent) style.boxShadow = 'inset 0 0 0 2px rgba(0,43,91,0.08)';
                return (
                  <button key={qid} onClick={() => setCurrentIdx(i)} style={style} title={`問題 ${qid}`}>
                    {flagged ? '🚩 ' : ''}{qid}
                  </button>
                );
              })}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, color: '#6b7280' }}>回答済: {answeredCount}/{TOTAL}</div>
          </aside>

          {/* main question panel */}
          <main style={{ flex: 1 }}>
            <div style={{ border: '1px solid #d1d5db', padding: 12, background: '#ffffff' }}>
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>問 {currentIdx + 1} [ストラテジ系]</div>
              <div style={{ border: '1px solid #e5e7eb', padding: 12, background: '#ffffff', color: '#111827', lineHeight: 1.6 }}>{questions[currentIdx] ? questions[currentIdx].text : '問題データがありません（ダミー表示）'}</div>

              <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                {questions[currentIdx] && questions[currentIdx].options.map((opt, i) => {
                  const qid = questions[currentIdx].id;
                  const selected = answers[qid] === opt[0];
                  return (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', border: '1px solid #e6eef6', borderRadius: 6, background: selected ? '#eff6ff' : '#fff' }}>
                      <input type="radio" name={`q-${qid}`} checked={selected} onChange={() => setAnswers({...answers, [qid]: opt[0]})} />
                      <span style={{ fontSize: 13 }}>{opt}</span>
                    </label>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                <div>
                  <span style={{ fontSize: 12, marginRight: 8 }}>解答欄：</span>
                  {['ア','イ','ウ','エ','オ'].map((c, idx) => (
                    <label key={idx} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 28, border: '1px solid #e5e7eb', borderRadius: 6, marginRight: 6, background: answers[questions[currentIdx]?.id] === String.fromCharCode(65+idx) ? '#1e40af' : '#fff', color: answers[questions[currentIdx]?.id] === String.fromCharCode(65+idx) ? '#fff' : '#111' }}>{c}</label>
                  ))}
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={!!flags[questions[currentIdx]?.id]} onChange={(e) => setFlags({...flags, [questions[currentIdx].id]: e.target.checked})} />
                  <span>後で見直す</span>
                </label>
              </div>
            </div>
          </main>
        </div>

        {/* bottom bar: status / nav / actions */}
        <div className="flex items-center justify-between border-t px-4 py-3 bg-gray-50">
          {/* left: small status table (10 cols view) */}
          <div style={{ width: '33%' }}>
            <div style={{ fontSize: 12, color: '#4b5563', marginBottom: 6 }}>解答状況</div>
            <div style={{ overflowX: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: 6 }}>
                {Array.from({ length: 10 }).map((_, i) => {
                  const qnum = Math.floor(currentIdx / 10) * 10 + i + 1;
                  const answered = !!answers[qnum];
                  const flagged = !!flags[qnum];
                  const btnStyle = Object.assign({ height: 32, borderRadius: 6, border: '1px solid #e5e7eb', fontSize: 12, cursor: 'pointer', background: '#ffffff' }, flagged ? { background: '#fff7cc', border: '1px solid #f1c40f' } : answered ? { background: '#1e40af', color: '#fff', border: '1px solid #1e3a8a' } : {});
                  return (
                    <button key={qnum} onClick={() => setCurrentIdx(qnum - 1)} style={btnStyle}>
                      {flagged ? '🚩' : ''}{qnum}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* center: nav */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 border rounded text-sm" onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0}>{'< 前の問へ'}</button>
            <button className="px-4 py-2 border rounded text-sm" onClick={() => setCurrentIdx(Math.min(TOTAL - 1, currentIdx + 1))}>{'次の問へ >'}</button>
          </div>

          {/* right: actions */}
          <div className="flex items-center gap-3">
            <button className="px-3 py-1 border rounded text-sm">解答見直し</button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded font-semibold text-sm" onClick={() => alert('試験終了（ダミー）')}>試験終了</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;