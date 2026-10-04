import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

/**
 * 慣性スクロール（Lenis）を初期化し、GSAP ScrollTrigger と同期させる。
 * reduced-motion ではネイティブスクロールのまま何もしない。
 * 戻り値の ref 経由で lenis.scrollTo() をアンカーリンクの処理から呼べる。
 */
export function useLenis() {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reducedMotion) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return lenisRef;
}
