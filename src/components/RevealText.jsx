import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/** 見出し用：文字単位でスクロールインするテキスト（ギミックA）。reduced-motion では即時表示。 */
export function RevealText({ text, as, className, style }) {
  const Tag = as || 'span';
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const lines = text.split('\n');

  useEffect(() => {
    if (reducedMotion || !ref.current) return undefined;

    const targets = ref.current.querySelectorAll('.reveal-char');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.025,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [reducedMotion, text]);

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }} aria-hidden="true">
          {Array.from(line).map((char, ci) => (
            <span key={ci} className="reveal-char" style={reducedMotion ? undefined : { display: 'inline-block', opacity: 0 }}>
              {char === ' ' ? ' ' : char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
}
