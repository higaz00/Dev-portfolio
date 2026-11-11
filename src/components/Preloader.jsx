import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }) {
  const preloaderRef = useRef(null);
  const textRef = useRef(null);
  const counterRef = useRef(null);
  const barFillRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(preloaderRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            if (onComplete) onComplete();
          },
        });
      },
    });

    // Animate counter
    const counter = { value: 0 };
    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = `${Math.round(counter.value)}%`;
        }
      },
    }, 0);

    // Animate bar fill
    tl.to(barFillRef.current, {
      width: '100%',
      duration: 1.8,
      ease: 'power2.inOut',
    }, 0);

    // Text reveal
    tl.from(textRef.current.querySelectorAll('span'), {
      yPercent: 110,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power3.out',
    }, 0.2);

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader__text" ref={textRef}>
        <span>F</span>
        <span>E</span>
        <span>L</span>
        <span>I</span>
        <span>P</span>
        <span>E</span>
        <span style={{ width: '0.3em', display: 'inline-block' }}>&nbsp;</span>
        <span>H</span>
        <span>I</span>
        <span>G</span>
        <span>A</span>
        <span style={{ color: 'var(--accent)' }}>.</span>
      </div>
      <div className="preloader__bar">
        <div className="preloader__bar-fill" ref={barFillRef} />
      </div>
      <div className="preloader__counter" ref={counterRef}>0%</div>
    </div>
  );
}
