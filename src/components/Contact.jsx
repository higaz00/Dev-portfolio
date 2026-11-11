import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import '../styles/contact.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const email = 'felipe.higaz00@gmail.com';

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Status pill
      gsap.from('.contact__status-pill', {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.contact__container',
          start: 'top 85%',
        },
      });

      // Headline
      gsap.from('.contact__headline', {
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.contact__headline',
          start: 'top 85%',
        },
      });

      // Subtitle
      gsap.from('.contact__subtitle', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.contact__subtitle',
          start: 'top 90%',
        },
      });

      // CTA button
      gsap.from('.contact__cta', {
        scale: 0.85,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: '.contact__actions',
          start: 'top 90%',
        },
      });

      // Social links
      gsap.fromTo(
        '.contact__social-link',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.contact__social',
            start: 'top 95%',
          },
        }
      );

      // Back to top button
      gsap.fromTo(
        '.contact__back-to-top',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '.contact__back-to-top-wrap',
            start: 'top 98%',
          },
        }
      );

      // Background text parallax
      gsap.to('.contact__bg-text', {
        xPercent: 5,
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBackToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.4,
      ease: 'power4.inOut',
    });
  };

  return (
    <section className="contact section" id="contato" ref={sectionRef}>
      <div className="section-divider" />
      <div className="contact__bg-text">CONTATO</div>

      <div className="contact__container">
        {/* Availability Status Badge */}
        <div className="contact__status-pill">
          <span className="contact__status-dot" />
          <span>Disponível para novos projetos</span>
        </div>

        {/* Headline with interactive hover effect on accent word */}
        <h2 className="contact__headline">
          <span className="contact__headline-top">Vamos criar algo</span>
          <span className="contact__headline-accent" data-cursor-hover>
            extraordinário?
          </span>
        </h2>

        <p className="contact__subtitle">
          Tem um projeto em mente? Estou disponível para conversar sobre novas
          oportunidades e transformar ideias em experiências digitais.
        </p>

        {/* Action Group */}
        <div className="contact__actions">
          <a
            href="https://wa.me/5511976695749"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__cta"
            data-cursor-hover
          >
            <span>Iniciar conversa</span>
            <span className="contact__cta-icon">→</span>
          </a>

          <button
            type="button"
            className="contact__email-pill"
            onClick={handleCopyEmail}
            data-cursor-hover
            aria-label="Copiar endereço de e-mail"
          >
            <span>✉ {email}</span>
            <span className="contact__email-pill-copy">
              {copied ? '✓ Copiado!' : 'Copiar'}
            </span>
          </button>
        </div>

        {/* Social links */}
        <div className="contact__social">
          <a
            href="https://wa.me/5511976695749"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
            data-cursor-hover
          >
            ✦ WhatsApp
          </a>
          <a
            href="mailto:felipe.higaz00@gmail.com"
            className="contact__social-link"
            data-cursor-hover
          >
            ✦ E-mail
          </a>
          <a
            href="https://www.instagram.com/higa.devrush"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
            data-cursor-hover
          >
            ✦ Instagram
          </a>
          <a
            href="https://www.linkedin.com/in/felipe-poyatos-higa-0590a139b"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
            data-cursor-hover
          >
            ✦ LinkedIn
          </a>
        </div>

        {/* Botão de Voltar ao Início */}
        <div className="contact__back-to-top-wrap">
          <button
            type="button"
            className="contact__back-to-top"
            onClick={handleBackToTop}
            aria-label="Voltar para o início"
            data-cursor-hover
          >
            <span className="contact__back-to-top-arrow">↑</span>
            <span>Voltar ao início</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="contact__footer">
          <div className="contact__footer-left">
            © 2024 Felipe Higa. Todos os direitos reservados.
          </div>
          <div className="contact__footer-right">
            <span>São Paulo, Brasil · Remoto</span>
            <button
              type="button"
              className="contact__footer-link"
              onClick={handleBackToTop}
              style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', color: 'var(--accent)' }}
            >
              Topo ↑
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
