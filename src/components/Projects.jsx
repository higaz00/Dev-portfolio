import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/projects.css';
import hidroferImg from '../assets/projects/hidrofer.jpg';
import casaComPiscinaImg from '../assets/projects/casacompiscina.jpg';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: '01',
    name: 'Hidrofer',
    category: 'Website Institucional',
    description: 'Website institucional para um depósito de materiais de construção. Design profissional focado em presença digital.',
    highlights: [
      'Identidade visual comercial',
      'Apresentação dos produtos e serviços',
      'Integração com WhatsApp',
      'Estrutura para presença digital',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://hidrofer.netlify.app',
    image: hidroferImg,
    layout: 'right',
  },
  {
    id: '02',
    name: 'CasaComPiscina',
    category: 'Website Comercial',
    description: 'Website comercial para locação de casas com piscina para festas e eventos, com visual acolhedor e foco em converter visitantes em reservas.',
    highlights: [
      'Apresentação visual dos espaços',
      'Destaques de comodidades do local',
      'Chamadas para consultar datas',
      'Contato direto via WhatsApp',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://casacompiscina.netlify.app',
    image: casaComPiscinaImg,
    layout: 'left',
  },
  {
    id: '03',
    name: 'Colégio Cuba',
    category: 'Website Institucional',
    description: 'Website institucional de uma instituição de ensino com organização das informações educacionais e comunicação visual.',
    highlights: [
      'Apresentação institucional',
      'Organização de informações',
      'Comunicação visual eficiente',
      'Navegação para múltiplos conteúdos',
    ],
    tech: ['HTML', 'CSS', 'JavaScript'],
    link: 'https://www.colegiocuba.com.br/index.html',
    image: null,
    layout: 'right',
  },
];

function ProjectItem({ project, index }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Image reveal
      const imageWrap = itemRef.current.querySelector('.project-item__image-wrap');
      if (imageWrap) {
        gsap.from(imageWrap, {
          clipPath: 'inset(100% 0% 0% 0%)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Number fade
      const number = itemRef.current.querySelector('.project-item__number');
      if (number) {
        gsap.from(number, {
          xPercent: project.layout === 'right' ? 20 : -20,
          opacity: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: itemRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Info elements
      const infoElements = itemRef.current.querySelectorAll('.project-item__category, .project-item__name, .project-item__desc, .project-item__highlight, .project-item__tech, .project-item__link');
      gsap.from(infoElements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: itemRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      });
    }, itemRef.current);

    return () => ctx.revert();
  }, [project.layout]);

  const renderPlaceholderImage = () => (
    <div style={{
      width: '100%',
      height: '100%',
      background: `linear-gradient(135deg, var(--black-secondary) 0%, var(--gray-dark, #1a1a1a) 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(2rem, 4vw, 4rem)',
        color: 'var(--accent)',
        opacity: 0.15,
        letterSpacing: '-0.03em',
      }}>
        {project.name}
      </span>
      <span style={{
        fontSize: '0.75rem',
        color: 'var(--gray)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Preview em breve
      </span>
    </div>
  );

  return (
    <div
      className={`project-item project-item--${project.layout}`}
      ref={itemRef}
    >
      <div className="project-item__number">{project.id}</div>
      <div className="project-item__inner">
        {project.layout === 'right' && (
          <div className="project-item__info">
            <ProjectInfo project={project} />
          </div>
        )}

        <div className="project-item__image-wrap" data-cursor-hover>
          {project.image ? (
            <img
              className="project-item__image"
              src={project.image}
              alt={`Preview do projeto ${project.name}`}
              loading="lazy"
            />
          ) : (
            renderPlaceholderImage()
          )}
          <div className="project-item__overlay">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item__view"
            >
              Ver projeto
              <span className="project-item__view-arrow">↗</span>
            </a>
          </div>
        </div>

        {project.layout !== 'right' && (
          <div className="project-item__info">
            <ProjectInfo project={project} />
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectInfo({ project }) {
  return (
    <>
      <div className="project-item__category">{project.category}</div>
      <h3 className="project-item__name">{project.name}</h3>
      <p className="project-item__desc">{project.description}</p>
      <div className="project-item__highlights">
        {project.highlights.map((h, i) => (
          <span key={i} className="project-item__highlight">{h}</span>
        ))}
      </div>
      <div className="project-item__tech">
        {project.tech.map((t) => (
          <span key={t} className="project-item__tech-tag">{t}</span>
        ))}
      </div>
      {project.link !== '#' && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="project-item__link"
        >
          Ver projeto ao vivo <span>→</span>
        </a>
      )}
    </>
  );
}

export default function Projects() {
  const headerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="projects section" id="projetos">
      <div className="section-divider" />
      <div style={{ height: 'var(--space-lg)' }} />

      <div className="projects__header" ref={headerRef}>
        <div>
          <div className="projects__label">Portfólio</div>
          <h2 className="projects__title">
            Selected<br />Works
          </h2>
        </div>
        <div className="projects__count">
          ( {projects.length} projetos )
        </div>
      </div>

      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}
