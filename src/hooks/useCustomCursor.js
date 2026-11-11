import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * Custom cursor hook — handles the custom cursor and dot follower
 */
export function useCustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    // Check for touch device
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      });
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const addHover = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    window.addEventListener('mousemove', moveCursor);

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', addHover);
        el.removeEventListener('mouseleave', removeHover);
      });
    };
  }, []);

  return { cursorRef, dotRef };
}
