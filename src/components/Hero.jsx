import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const sculptureRef = useRef(null);
  const rightColRef = useRef(null);
  const backdropTextRef = useRef(null);
  const hudRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const masterTl = gsap.timeline({ delay: 1.8 });

      // 1. Monumental backdrop reveal
      masterTl.from(backdropTextRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: 'power3.out',
      }, 0);

      // 2. Left column elements stagger
      const leftElements = leftColRef.current.children;
      masterTl.from(leftElements, {
        x: -40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.08,
        ease: 'power4.out',
      }, 0.2);

      // 3. Center sculpture zoom and rotate in
      masterTl.from(sculptureRef.current, {
        scale: 0.7,
        opacity: 0,
        rotation: -10,
        duration: 1.3,
        ease: 'back.out(1.4)',
      }, 0.3);

      // 4. Right column stats stagger
      const rightElements = rightColRef.current.children;
      masterTl.from(rightElements, {
        x: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: 'power4.out',
      }, 0.4);

      // 5. Floating cursors fade in
      masterTl.from('.hero__cursor-item', {
        opacity: 0,
        scale: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'back.out(2)',
      }, 0.6);

      // 6. Bottom HUD bar slide up
      masterTl.from(hudRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, 0.8);

      // Parallax on scroll
      gsap.to(backdropTextRef.current, {
        yPercent: -20,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to(sculptureRef.current, {
        yPercent: -15,
        rotation: 4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });

      // Mouse-move 3D tilt for center sculpture
      const handleMouseMove = (e) => {
        if (!sculptureRef.current) return;
        const rect = sculptureRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - centerY) / (window.innerHeight / 2);

        gsap.to(sculptureRef.current, {
          rotateY: deltaX * 14,
          rotateX: -deltaY * 14,
          transformPerspective: 800,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 20 },
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section className="hero" ref={sectionRef} id="hero">
      {/* Background grid texture & ambient glow */}
      <div className="hero__grid-bg" />
      <div className="hero__ambient-glow" />

      {/* Wall-to-Wall Monumental Background Typography */}
      <div className="hero__backdrop-typography" ref={backdropTextRef}>
        <span className="hero__backdrop-text">PORTFÓLIO</span>
      </div>

      {/* Floating Multiplayer Cursors (Awwwards/Figma Collaboration Feel) */}
      <div className="hero__floating-cursors">
        <div className="hero__cursor-item hero__cursor-item--1">
          <svg viewBox="0 0 16 16">
            <path d="M1 1l5.5 13.5 2.5-5 5-2.5L1 1z" />
          </svg>
          <span className="hero__cursor-label">Design System</span>
        </div>

        <div className="hero__cursor-item hero__cursor-item--2">
          <svg viewBox="0 0 16 16">
            <path d="M1 1l5.5 13.5 2.5-5 5-2.5L1 1z" />
          </svg>
          <span className="hero__cursor-label">Clean Code</span>
        </div>

        <div className="hero__cursor-item hero__cursor-item--3">
          <svg viewBox="0 0 16 16">
            <path d="M1 1l5.5 13.5 2.5-5 5-2.5L1 1z" />
          </svg>
          <span className="hero__cursor-label">High Performance</span>
        </div>

        <div className="hero__cursor-item hero__cursor-item--4">
          <svg viewBox="0 0 16 16">
            <path d="M1 1l5.5 13.5 2.5-5 5-2.5L1 1z" />
          </svg>
          <span className="hero__cursor-label">React / GSAP</span>
        </div>
      </div>

      {/* Main 3-Column Editorial Grid */}
      <div className="hero__main-content">
        {/* LEFT COLUMN: Editorial Typography & Value Prop */}
        <div className="hero__left-col" ref={leftColRef}>
          <div className="hero__eyebrow">
            <span className="hero__eyebrow-line" />
            <span>Desenvolvedor Web · Experiências Digitais</span>
          </div>

          <div className="hero__greeting-container">
            <span className="hero__script-greeting">Olá, eu sou</span>
            <h1 className="hero__monumental-name">
              <span>FELIPE</span>
              <span>HIGA<span className="hero__name-dot">.</span></span>
            </h1>
          </div>

          <div className="hero__role-tagline">
            DESENVOLVEDOR WEB & CREATIVE FRONTEND
          </div>

          <p className="hero__bio-text">
            Construo websites profissionais e experiências digitais de alto impacto.
            Da arquitetura técnica ao acabamento visual, uno <strong>código limpo</strong>,
            <strong> estética editorial</strong> e <strong>performance</strong> que
            destacam marcas e negócios.
          </p>

          <div className="hero__actions-row">
            <a
              href="#projetos"
              className="hero__primary-btn"
              onClick={(e) => handleScrollTo(e, '#projetos')}
              data-cursor-hover
            >
              <span>Ver projetos</span>
              <span className="hero__primary-btn-arrow">↓</span>
            </a>

            <div className="hero__location-badge">
              <span>📍 Remoto · Atendo o Brasil e exterior</span>
            </div>
          </div>
        </div>

        {/* CENTER COLUMN: 3D Kinetic Sculpture (FH Monogram) */}
        <div className="hero__center-col">
          <div className="hero__sculpture-wrapper" ref={sculptureRef}>
            <div className="hero__sculpture-card">
              {/* Corner tech marks */}
              <div className="hero__sculpture-corner hero__sculpture-corner--tl" />
              <div className="hero__sculpture-corner hero__sculpture-corner--tr" />
              <div className="hero__sculpture-corner hero__sculpture-corner--bl" />
              <div className="hero__sculpture-corner hero__sculpture-corner--br" />

              {/* Kinetic orbital rings */}
              <div className="hero__sculpture-rings">
                <div className="hero__ring hero__ring--1" />
                <div className="hero__ring hero__ring--2" />
                <div className="hero__ring hero__ring--3" />
              </div>

              {/* Monogram */}
              <div className="hero__sculpture-monogram">
                F<span>H</span>
              </div>

              <div className="hero__sculpture-caption">
                Digital Studio · 2024
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Editorial Metrics & Manifesto */}
        <div className="hero__right-col" ref={rightColRef}>
          <div className="hero__manifesto-box">
            <div className="hero__manifesto-glyph">✦</div>
            <p className="hero__manifesto-text">
              Cada interação pensada. Cada experiência memorável.
            </p>
          </div>

          <div className="hero__stats-list">
            <div className="hero__stat-card">
              <span className="hero__stat-num">5+</span>
              <span className="hero__stat-desc">Anos criando para a web</span>
            </div>

            <div className="hero__stat-card">
              <span className="hero__stat-num">100%</span>
              <span className="hero__stat-desc">Projetos entregues com rigor</span>
            </div>

            <div className="hero__stat-card">
              <span className="hero__stat-num">24/7</span>
              <span className="hero__stat-desc">Foco em performance & UX</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM HUD DOCK */}
      <div className="hero__bottom-hud" ref={hudRef}>
        <a
          href="https://hidrofer.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="hero__hud-case-btn"
          data-cursor-hover
        >
          <span className="hero__hud-play-icon">▶</span>
          <span>Ver case em destaque: Hidrofer</span>
        </a>

        <div className="hero__hud-pills">
          <div className="hero__hud-dots">
            <span className="hero__hud-dot hero__hud-dot--1" />
            <span className="hero__hud-dot hero__hud-dot--2" />
            <span className="hero__hud-dot hero__hud-dot--3" />
          </div>
          <span className="hero__hud-pill-label">
            <strong>3 Projetos</strong> em exibição
          </span>
        </div>

        <div className="hero__hud-years">
          Projetos Selecionados / 2024–2026
        </div>
      </div>
    </section>
  );
}
