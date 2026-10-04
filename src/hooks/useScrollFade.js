import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/** 要素（複数可）がスクロールインしたら y/opacity でふわっと出す汎用フック。reduced-motion では即表示。 */
export function useScrollFade(ref, { y = 40, stagger = 0, start = 'top 85%' } = {}) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return undefined;

    const targets = ref.current.matches?.('[data-fade]') ? ref.current : ref.current.querySelectorAll('[data-fade]');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger,
          scrollTrigger: {
            trigger: ref.current,
            start,
            toggleActions: 'play none none none',
          },
        },
      );
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);
}
