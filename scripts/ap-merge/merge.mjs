import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..', '..');
const outDir = join(root, 'public', 'blog');
const singlePath = join(__dirname, 'ap-exam-source-body.html');
const splitPaths = [
  join(__dirname, 'ap-exam-source-body.p1.html'),
  join(__dirname, 'ap-exam-source-body.p2.html'),
];

const bundleDefault = [
  'a1-head.html',
  'p1a-summary-filter.html',
  'sys-teku-open.html',
  'dai1.html',
  'dai2.html',
  'dai3.html',
  'dai4.html',
  'p2-full.html',
  'p2-strategy.html',
];

mkdirSync(outDir, { recursive: true });

const head = `<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>応用情報技術者試験 午前 出題分析 R3〜R7 | デジタルスキルアカデミー</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/blog/blog-ap-report.css">
</head>
<body>
`;

const script = `
<script>
function scrollSys(name,btn){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('on'));
  if(btn) btn.classList.add('on');
  if(name==='all'){window.scrollTo({top:0,behavior:'smooth'});return;}
  const el=document.querySelector(\`[data-system="\${name}"]\`);
  if(el){const y=el.getBoundingClientRect().top+window.scrollY-52;window.scrollTo({top:y,behavior:'smooth'});}
}
document.querySelectorAll('.dai-chip').forEach(c=>{
  c.onclick=()=>{
    const el=document.getElementById('dai-'+c.dataset.dai);
    if(el){const y=el.getBoundingClientRect().top+window.scrollY-52;window.scrollTo({top:y,behavior:'smooth'});}
  };
});
function toggleZero(cb){
  document.querySelectorAll('.zero-row').forEach(r=>{r.style.display=cb.checked?'':'none';});
}
document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.zero-row').forEach(r=>r.style.display='none');
});
</script>
</body></html>
`;

let body;
if (existsSync(singlePath)) {
  body = readFileSync(singlePath, 'utf8');
} else if (splitPaths.every((p) => existsSync(p))) {
  body = splitPaths.map((p) => readFileSync(p, 'utf8')).join('');
} else if (bundleDefault.every((f) => existsSync(join(__dirname, f)))) {
  body = bundleDefault.map((f) => readFileSync(join(__dirname, f), 'utf8')).join('');
} else {
  console.error(
    'Missing report fragments. Add scripts/ap-merge/ap-exam-source-body.html (full body inner HTML) or keep default bundle files.',
  );
  process.exit(1);
}

writeFileSync(join(outDir, 'ap-exam-standalone.html'), head + body + script, 'utf8');
console.log('Wrote public/blog/ap-exam-standalone.html');
