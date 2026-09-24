import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Hackathons from './components/Hackathons';
import Certifications from './components/Certifications';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

const App = () => {
  const [toast, setToast] = useState(null);

  const showToast = (toastData) => {
    setToast(toastData);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  useEffect(() => {
    // Scroll reveal observer for elements with .reveal class
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <div className="portfolio-app-root position-relative">
      {/* Dynamic Ambient Particle Background */}
      <ParticlesBackground />

      {/* Floating Dock Navbar (Preserved and Enhanced) */}
      <Navbar />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Main Content Sections */}
      <main className="position-relative z-1">
        <Hero onShowToast={showToast} />
        <About />
        <Skills />
        <Projects />
        <Hackathons />
        <Certifications />
        <Timeline />
        <Contact onShowToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
