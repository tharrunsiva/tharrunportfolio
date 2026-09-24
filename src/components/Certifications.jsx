import React from 'react';
import { certificationsData } from '../data/portfolioData';

const Certifications = () => {
  return (
    <section id="certifications" className="certifications-section py-5 position-relative">
      <div className="container py-4">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-patch-check-fill text-warning"></i>
            <span className="small text-warning fw-bold text-uppercase">Accreditations & Honors</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Certifications & Milestones</h2>
          <div className="code-font text-highlight small">
            verify.credentials(['IBM_Hackathon', 'MERN_DevOps', 'Data_Analytics', 'Leadership'])
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="row g-4 reveal">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="col-md-6 col-lg-3">
              <div className="glass-card cert-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="cert-icon-pill" style={{ color: cert.color }}>
                      <i className={`bi ${cert.icon} fs-4`}></i>
                    </div>
                    <span className="badge bg-dark text-highlight border border-secondary small">
                      {cert.highlight}
                    </span>
                  </div>

                  <h5 className="text-white fw-bold mb-1 fs-6">{cert.title}</h5>
                  <h6 className="text-neon-blue small fw-semibold mb-3">{cert.issuer}</h6>
                  
                  <p className="text-highlight-light small lh-base mb-0">
                    {cert.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-top border-secondary border-opacity-25 d-flex align-items-center justify-content-between">
                  <span className="badge-tag-mini text-muted small">{cert.category}</span>
                  <i className="bi bi-shield-check text-neon-green"></i>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Certifications;
