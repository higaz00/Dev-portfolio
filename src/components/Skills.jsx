import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/skills.css';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    name: 'HTML5',
    icon: '‹/›',
    desc: 'Estrutura semântica e acessível. Base sólida para qualquer projeto web.',
    bgText: 'HTML',
  },
  {
    name: 'CSS3',
    icon: '✦',
    desc: 'Layouts responsivos, animações e design systems. Do conceito à interface.',
    bgText: 'CSS',
  },
  {
    name: 'JavaScript',
    icon: '{ }',
    desc: 'Interatividade, lógica e experiências dinâmicas. A linguagem da web moderna.',
    bgText: 'JS',
  },
  {
    name: 'React',
    icon: '⚛',
    desc: 'Componentes reutilizáveis e interfaces reativas. Projetos escaláveis.',
    bgText: 'JSX',
  },
];

const marqueeItems = ['HTML5', 'CSS3', 'JavaScript', 'React', 'GSAP', 'Responsive', 'UI/UX'];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.from('.skills__label', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__header',
          start: 'top 85%',
        },
      });

      gsap.from('.skills__title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__header',
          start: 'top 80%',
        },
      });

      // Cards stagger
      gsap.from('.skill-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills__grid',
          start: 'top 85%',
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills section" id="habilidades" ref={sectionRef}>
      <div className="section-divider" />
      <div style={{ height: 'var(--space-lg)' }} />

      <div className="skills__container">
        <div className="skills__header">
          <div className="skills__label">Tecnologias</div>
          <h2 className="skills__title">
            Ferramentas &<br />
            Habilidades
          </h2>
        </div>
      </div>

      {/* Marquee */}
      <div className="skills__marquee">
        <div className="skills__marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i}>
              <span className="skills__marquee-item">{item}</span>
              {i < marqueeItems.length * 2 - 1 && (
                <span className="skills__marquee-sep"> · </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="skills__container">
        <div className="skills__grid">
          {skills.map((skill) => (
            <div key={skill.name} className="skill-card" data-cursor-hover>
              <div className="skill-card__icon">{skill.icon}</div>
              <h3 className="skill-card__name">{skill.name}</h3>
              <p className="skill-card__desc">{skill.desc}</p>
              <div className="skill-card__bg-text">{skill.bgText}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
