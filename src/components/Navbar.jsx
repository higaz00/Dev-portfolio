import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../styles/navbar.css';

const navLinks = [
  { label: 'Projetos', href: '#projetos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Contato', href: '#contato' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -30,
      opacity: 0,
      duration: 1,
      delay: 2.2,
      ease: 'power3.out',
    });
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 0 },
        duration: 1.2,
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <>
      <nav className={`navbar ${mobileOpen ? 'navbar--menu-open' : ''}`} ref={navRef}>
        <a href="#" className="navbar__logo" aria-label="Felipe Higa — Início">
          <span className="navbar__logo-mark">FH</span>
          <span className="navbar__logo-name">FELIPE HIGA</span>
        </a>

        <div className="navbar__links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar__link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar__right">
          <div className="navbar__availability">
            <span className="navbar__availability-dot" />
            Disponível
          </div>
          <a
            href="#contato"
            className="navbar__cta"
            onClick={(e) => handleNavClick(e, '#contato')}
          >
            Vamos conversar
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`navbar__menu-toggle ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar__link"
            onClick={(e) => handleNavClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contato"
          className="navbar__cta"
          onClick={(e) => handleNavClick(e, '#contato')}
          style={{ marginTop: '1rem' }}
        >
          Vamos conversar
        </a>
      </div>
    </>
  );
}
