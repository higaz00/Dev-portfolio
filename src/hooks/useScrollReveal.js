import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for scroll-triggered reveal animations
 * @param {string} selector - CSS selector for elements to animate
 * @param {object} options - Animation options
 */
export function useScrollReveal(selector, options = {}) {
  useEffect(() => {
    const {
      y = 60,
      opacity = 0,
      duration = 1,
      stagger = 0.1,
      delay = 0,
      ease = 'power3.out',
      start = 'top 85%',
    } = options;

    const ctx = gsap.context(() => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;

      gsap.from(elements, {
        y,
        opacity,
        duration,
        stagger,
        delay,
        ease,
        scrollTrigger: {
          trigger: elements[0].closest('section') || elements[0],
          start,
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, [selector]);
}
