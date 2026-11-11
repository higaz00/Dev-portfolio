import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/about.css';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.about__label', {
        x: -40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__header',
          start: 'top 85%',
        },
      });

      gsap.from('.about__title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__header',
          start: 'top 80%',
        },
      });

      // Text blocks
      gsap.from('.about__text', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__text-block',
          start: 'top 80%',
        },
      });

      // Quote
      gsap.from('.about__quote', {
        x: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__quote',
          start: 'top 85%',
        },
      });

      // Values
      gsap.from('.about__value', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about__values',
          start: 'top 85%',
        },
      });

      // BG text parallax
      gsap.to('.about__bg-text', {
        xPercent: -10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="sobre" ref={sectionRef}>
      <div className="about__bg-text">ABOUT</div>

      {/* Decorative elements */}
      <div className="about__deco about__deco--1" />
      <div className="about__deco about__deco--2" />

      <div className="about__container">
        <div className="about__header">
          <div className="about__label">Sobre mim</div>
          <h2 className="about__title">
            Criando experiências<br />
            <span className="highlight">digitais</span> que importam
          </h2>
        </div>

        <div className="about__content">
          <div className="about__text-block">
            <p className="about__text">
              Sou <strong>Felipe Higa</strong>, desenvolvedor web apaixonado por transformar
              ideias em <span className="accent-word">experiências digitais</span>.
            </p>
            <p className="about__text">
              Meu foco é desenvolver sites que vão além da estética, combinando{' '}
              <strong>design, tecnologia e estratégia</strong> para criar experiências
              que valorizam marcas e negócios.
            </p>
            <p className="about__text">
              Cada projeto é uma oportunidade de construir algo que conecta
              pessoas a marcas de forma <span className="accent-word">memorável</span>.
            </p>
          </div>

          <div className="about__visual">
            <div className="about__quote">
              <span className="about__quote-mark">"</span>
              <p className="about__quote-text">
                Acredito que um bom site não é apenas bonito — ele é estratégico,
                funcional e capaz de transformar visitantes em clientes.
              </p>
            </div>

            <div className="about__values">
              <div className="about__value">
                <div className="about__value-icon">◆</div>
                <div className="about__value-title">Design</div>
                <div className="about__value-desc">
                  Interfaces que comunicam com clareza e elegância
                </div>
              </div>
              <div className="about__value">
                <div className="about__value-icon">⚡</div>
                <div className="about__value-title">Performance</div>
                <div className="about__value-desc">
                  Sites rápidos, otimizados e com boa experiência
                </div>
              </div>
              <div className="about__value">
                <div className="about__value-icon">◎</div>
                <div className="about__value-title">Estratégia</div>
                <div className="about__value-desc">
                  Foco em resultados e objetivos do negócio
                </div>
              </div>
              <div className="about__value">
                <div className="about__value-icon">✦</div>
                <div className="about__value-title">Qualidade</div>
                <div className="about__value-desc">
                  Código limpo, organizado e de fácil manutenção
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
