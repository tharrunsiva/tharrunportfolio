import React, { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';

const Hero = ({ onShowToast }) => {
  const typedTextRef = useRef(null);

  useEffect(() => {
    const textArray = [
      "Tharrun S",
      "MERN Stack Developer"
    ];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2200;
    let textArrayIndex = 0;
    let charIndex = 0;
    let typingTimeout;

    const type = () => {
      if (charIndex < textArray[textArrayIndex].length) {
        if (typedTextRef.current) {
          typedTextRef.current.textContent += textArray[textArrayIndex].charAt(charIndex);
        }
        charIndex++;
        typingTimeout = setTimeout(type, typingDelay);
      } else {
        typingTimeout = setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (charIndex > 0) {
        if (typedTextRef.current) {
          typedTextRef.current.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        }
        charIndex--;
        typingTimeout = setTimeout(erase, erasingDelay);
      } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        typingTimeout = setTimeout(type, typingDelay + 400);
      }
    };

    typingTimeout = setTimeout(type, 1200);

    return () => clearTimeout(typingTimeout);
  }, []);

  const handleResumeDownload = () => {
    if (onShowToast) {
      onShowToast({
        title: 'Downloading Resume',
        message: 'Tharrun_S_Resume.pdf download initiated.',
        type: 'info'
      });
    }
  };

  return (
    <section id="home" className="hero-section min-vh-100 d-flex align-items-center position-relative pt-5 pb-5">
      {/* Ambient background glows */}
      <div className="hero-glow-blob blob-1"></div>
      <div className="hero-glow-blob blob-2"></div>

      <div className="container position-relative z-1 pt-4">
        <div className="row align-items-center g-5 flex-column-reverse flex-lg-row">
          
          {/* Left Column: Intro & CTAs */}
          <div className="col-lg-7 reveal active">
            {/* Status Chip */}
            <div className="status-pill d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4">
              <span className="pulse-dot"></span>
              <span className="text-neon-green small fw-bold tracking-wide">
                AVAILABLE FOR HIRE & NEW PROJECTS
              </span>
            </div>

            {/* Code Tag */}
            <div className="code-font text-neon-purple mb-2 fw-bold d-flex align-items-center gap-2">
              <i className="bi bi-terminal-fill"></i>
              <span>&lt;init_portfolio session="active" /&gt;</span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title display-3 fw-extrabold mb-3 text-white">
              I'm{' '}
              <span id="typing-text" ref={typedTextRef} className="text-gradient-cyan"></span>
              <span className="typing-cursor"></span>
            </h1>

            {/* Role Subtitle */}
            <h3 className="hero-subtitle fw-semibold mb-4 text-white d-flex align-items-center flex-wrap gap-2">
              <span className="text-neon-blue">MERN Stack</span>
              <span className="text-secondary">•</span>
              <span className="text-neon-purple">DevOps</span>
              <span className="text-secondary">•</span>
              <span className="text-neon-green">Data Analytics</span>
            </h3>

            {/* Description */}
            <p className="hero-desc text-white mb-4 fs-6 lh-lg opacity-95">
              A Full-Stack Developer & Data Analyst who bridges high-performance backend architecture 
              with clean, modern, and responsive user experiences. Passionate about exploring data patterns, 
              building resilient digital products, and driving innovation through code.
            </p>

            {/* Quick CTAs */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <a href="#projects" className="btn btn-neon px-4 py-2 d-inline-flex align-items-center gap-2">
                <span>View Projects</span>
                <i className="bi bi-arrow-right"></i>
              </a>

              <a 
                href={personalInfo.resumeUrl} 
                download="Tharrun_S_Resume.pdf" 
                onClick={handleResumeDownload}
                className="btn btn-neon btn-neon-green px-4 py-2 d-inline-flex align-items-center gap-2"
              >
                <i className="bi bi-file-earmark-arrow-down"></i>
                <span>Download Resume</span>
              </a>

              <a href="#contact" className="btn btn-neon btn-neon-purple px-4 py-2">
                <span>Hire Me</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="row g-3 stats-strip pt-3 border-top border-secondary border-opacity-25">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="col-6 col-sm-3">
                  <div className="stat-card p-2 text-center rounded-3">
                    <div className="stat-number fw-bold text-white fs-4">{stat.value}</div>
                    <div className="stat-label small text-white fw-medium opacity-90">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Interactive Cyber Holographic Portrait */}
          <div className="col-lg-5 text-center reveal active">
            <div className="cyber-avatar-wrapper position-relative mx-auto">
              
              {/* Floating Tech Badges */}
              <div className="floating-badge badge-react">
                <i className="bi bi-lightning-charge-fill text-neon-blue"></i>
                <span>React.js</span>
              </div>

              <div className="floating-badge badge-node">
                <i className="bi bi-hdd-network-fill text-neon-green"></i>
                <span>Node & Mongo</span>
              </div>

              <div className="floating-badge badge-python">
                <i className="bi bi-filetype-py text-warning"></i>
                <span>Python & ML</span>
              </div>

              <div className="floating-badge badge-devops">
                <i className="bi bi-box-seam-fill text-neon-purple"></i>
                <span>Docker / DevOps</span>
              </div>

              {/* Portrait Container */}
              <div className="profile-img-container shadow-2xl">
                <div className="profile-inner-frame">
                  <img 
                    src={personalInfo.profileImg} 
                    alt="Tharrun Sivakumar" 
                    className="profile-img" 
                    loading="eager"
                  />
                  <div className="profile-overlay-gradient"></div>
                </div>
              </div>

              {/* Bottom Quick ID Badge */}
              <div className="avatar-caption-card glass-card px-3 py-2 mt-3 d-inline-flex align-items-center gap-2">
                <i className="bi bi-geo-alt-fill text-neon-green"></i>
                <span className="small text-white fw-bold">Coimbatore, Tamil Nadu</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
