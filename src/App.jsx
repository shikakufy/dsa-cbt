import React, { useState } from 'react';

// --- 最小モックデータ（実データは別ファイルで管理してください） ---
const questions = [
  { id: 1, text: "問1：アジャイル開発において、スプリントのレビューを行う目的はどれか。", options: ["A. 進捗の報告", "B. 成果物の確認とフィードバック", "C. 次のスプリントの計画", "D. チームの反省"], answer: "B" },
  { id: 2, text: "問2：IPAが実施するCBT方式の試験に関する記述として、適切なものはどれか。", options: ["A. 採点結果の即時通知", "B. 筆記用具の持ち込み自由", "C. 全員一斉開始の徹底", "D. 問題用紙の持ち帰り"], answer: "A" },
];

function App() {
  const [screen, setScreen] = useState('TOP');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // { [qid]: 'A' }
  const [flags, setFlags] = useState({}); // { [qid]: true }

  const TOTAL = 80;

  const answeredCount = Object.keys(answers).length;

  if (screen === 'TOP') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans text-sm">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-[#002B5B] mb-2">デジタルスキルアカデミー CBT</h1>
          <p className="text-sm text-gray-600 max-w-2xl">
            2026年度対応・本番に近い模擬試験シミュレーター（MVP）。
          </p>
        </header>

        <div className="bg-white p-6 rounded shadow border border-gray-200 text-center max-w-md w-full">
          <h2 className="text-lg font-bold mb-4">応用情報技術者試験</h2>
          <p className="text-sm text-gray-500 mb-6">過去問ベースの模擬問題に挑戦できます。</p>
          <button
            onClick={() => setScreen('EXAM')}
            className="w-full bg-[#002B5B] text-white py-2 rounded font-semibold text-sm hover:opacity-95"
          >
            試験を開始する
          </button>
        </div>

        <footer className="mt-12 text-gray-400 text-xs">
          &copy; 2026 Digital Skill Academy
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