import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * セクション見出しラベル（例: (MISSION)）。
 * スクロールインで「左から短い線が伸びる→文字がフェードイン」を一度だけ再生する。
 * prefers-reduced-motion では最初から表示状態のまま動かさない。
 */
export function SectionLabel({ en, ja, invert = false, id }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return undefined;

    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const className = [
    'section-label',
    invert ? 'section-label--invert' : '',
    reducedMotion ? 'is-revealed' : '',
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} id={id} className={className}>
      <span className="section-label-line" aria-hidden="true" />
      <span className="section-label-text">
        {en}
        {ja && <small>{ja}</small>}
      </span>
    </span>
  );
}
