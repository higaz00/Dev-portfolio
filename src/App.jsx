import { useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useCustomCursor } from './hooks/useCustomCursor';

import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { cursorRef, dotRef } = useCustomCursor();

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    // Refresh ScrollTrigger after content is revealed
    setTimeout(() => ScrollTrigger.refresh(), 100);
  }, []);

  // Re-attach cursor hover listeners when loading state changes
  useEffect(() => {
    if (loading) return;

    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const addHover = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    // Give DOM time to render
    const timer = setTimeout(() => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [loading, cursorRef]);

  return (
    <>
      {/* Custom cursor */}
      <div className="custom-cursor" ref={cursorRef} />
      <div className="cursor-dot" ref={dotRef} />

      {/* Preloader */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Main content */}
      <main>
        <Navbar />
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
