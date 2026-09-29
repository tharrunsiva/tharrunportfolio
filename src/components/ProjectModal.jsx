import React, { useEffect } from 'react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop-custom" onClick={onClose}>
      <div 
        className="glass-card modal-dialog-custom p-3 p-sm-4 p-md-5 position-relative" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          className="btn-modal-close" 
          onClick={onClose}
          aria-label="Close Modal"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        {/* Modal Content */}
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="modal-img-wrapper rounded-4 overflow-hidden position-relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="img-fluid w-100 modal-project-img" 
              />
              <div className="modal-img-badge">
                <span className="badge bg-dark text-neon-blue border border-neon-blue">
                  {project.categoryBadge}
                </span>
              </div>
            </div>
          </div>

          <div className="col-lg-6 d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge bg-dark text-neon-green border border-neon-green small">
                  {project.category}
                </span>
                {project.highlight && (
                  <span className="badge bg-dark text-warning border border-warning small">
                    ★ {project.highlight}
                  </span>
                )}
              </div>

              <h3 className="text-white fw-bold mb-2">{project.title}</h3>
              <p className="text-neon-blue small fw-semibold mb-3">{project.tagline}</p>
              
              <p className="text-white small lh-lg mb-4 opacity-95">
                {project.description}
              </p>

              <h6 className="text-white fw-bold mb-2 small text-uppercase">Key Features & Architecture</h6>
              <ul className="list-unstyled mb-4 d-flex flex-column gap-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="text-white small d-flex align-items-start gap-2 opacity-95">
                    <i className="bi bi-check-circle-fill text-neon-green mt-1"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <h6 className="text-white fw-bold mb-2 small text-uppercase">Technologies Utilized</h6>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {project.tech.map((t, idx) => (
                  <span key={idx} className="tech-tag small fw-semibold">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="d-flex gap-3 pt-3 border-top border-secondary border-opacity-25">
              {project.githubUrl && project.githubUrl !== '#' && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-sm btn-neon d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-github"></i>
                  <span>GitHub Repo</span>
                </a>
              )}

              {project.liveUrl && project.liveUrl !== '#' && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-sm btn-neon btn-neon-purple d-inline-flex align-items-center gap-2"
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                  <span>Live Deployment</span>
                </a>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
