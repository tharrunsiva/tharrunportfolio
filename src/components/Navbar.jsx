import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'hackathons', 'certifications', 'education', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionEl = document.getElementById(sections[i]);
        if (sectionEl) {
          const top = sectionEl.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="top-glow-bar"></div>

      <nav id="floating-dock" className="dock-nav" aria-label="Main Navigation">
        <a 
          href="#home" 
          className={`dock-item ${activeSection === 'home' ? 'active' : ''}`} 
          aria-label="Home"
        >
          <i className="bi bi-house-door"></i>
          <span className="dock-label">Home</span>
        </a>

        <a 
          href="#about" 
          className={`dock-item ${activeSection === 'about' ? 'active' : ''}`} 
          aria-label="About"
        >
          <i className="bi bi-person"></i>
          <span className="dock-label">About</span>
        </a>

        <a 
          href="#skills" 
          className={`dock-item ${activeSection === 'skills' ? 'active' : ''}`} 
          aria-label="Skills"
        >
          <i className="bi bi-cpu"></i>
          <span className="dock-label">Skills</span>
        </a>

        <a 
          href="#projects" 
          className={`dock-item ${activeSection === 'projects' ? 'active' : ''}`} 
          aria-label="Projects"
        >
          <i className="bi bi-grid-1x2"></i>
          <span className="dock-label">Projects</span>
        </a>

        <a 
          href="#hackathons" 
          className={`dock-item ${activeSection === 'hackathons' ? 'active' : ''}`} 
          aria-label="Hackathons"
        >
          <i className="bi bi-trophy"></i>
          <span className="dock-label">Hackathons</span>
        </a>

        <a 
          href="#certifications" 
          className={`dock-item ${activeSection === 'certifications' ? 'active' : ''}`} 
          aria-label="Milestones"
        >
          <i className="bi bi-patch-check"></i>
          <span className="dock-label">Milestones</span>
        </a>

        <a 
          href="#education" 
          className={`dock-item ${activeSection === 'education' ? 'active' : ''}`} 
          aria-label="Education"
        >
          <i className="bi bi-mortarboard"></i>
          <span className="dock-label">Education</span>
        </a>

        <a 
          href="#contact" 
          className={`dock-item ${activeSection === 'contact' ? 'active' : ''}`} 
          aria-label="Contact"
        >
          <i className="bi bi-envelope"></i>
          <span className="dock-label">Contact</span>
        </a>
      </nav>
    </>
  );
};

export default Navbar;
