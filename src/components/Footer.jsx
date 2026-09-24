import React from 'react';
import { personalInfo } from '../data/portfolioData';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer py-5 position-relative">
      <div className="container reveal">
        <div className="row g-4 align-items-center justify-content-between mb-4">
          
          <div className="col-md-6 text-center text-md-start">
            <h3 className="text-white fw-bold mb-1">
              Tharrun <span className="text-gradient-cyan">S.</span>
            </h3>
            <p className="text-muted small m-0 code-font">
              "Design. Code. Innovate. Repeat." • Coimbatore, India
            </p>
          </div>

          <div className="col-md-6 text-center text-md-end">
            <div className="d-inline-flex align-items-center gap-2">
              <a 
                href={personalInfo.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="GitHub"
              >
                <i className="bi bi-github"></i>
              </a>

              <a 
                href={personalInfo.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>

              <a 
                href={personalInfo.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="social-icon-btn"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>

              <button 
                onClick={scrollToTop} 
                className="btn-back-top ms-3"
                title="Scroll to Top"
                aria-label="Back to Top"
              >
                <i className="bi bi-arrow-up-short fs-4"></i>
              </button>
            </div>
          </div>

        </div>

        <div className="footer-bottom pt-4 border-top border-secondary border-opacity-25 text-center">
          <p className="text-muted small m-0">
            © {new Date().getFullYear()} <strong className="text-white">Tharrun Sivakumar</strong>. Built with React & Modern Glassmorphism.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
