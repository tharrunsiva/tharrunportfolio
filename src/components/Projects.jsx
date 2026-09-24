import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Full Stack',
    'AI & Machine Learning',
    'AI & Full Stack',
    'Data Analytics',
    'Systems & Security'
  ];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      project.category === selectedCategory ||
      (selectedCategory === 'Full Stack' && project.category.includes('Full Stack')) ||
      (selectedCategory === 'AI & Machine Learning' && project.category.includes('AI'));

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tech.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="projects-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-grid-1x2 text-neon-blue"></i>
            <span className="small text-neon-blue fw-bold text-uppercase">Portfolio Works</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Featured Projects</h2>
          <div className="code-font text-white small opacity-90">
            git checkout -b feature/production-showcase
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="row g-3 justify-content-between align-items-center mb-5 reveal">
          <div className="col-lg-8">
            <div className="category-filter-group d-flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'All' ? `All (${projectsData.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="search-input-wrapper position-relative">
              <i className="bi bi-search search-icon text-white"></i>
              <input
                type="text"
                className="form-control project-search-input py-2 ps-5 text-white"
                placeholder="Search projects by tech/name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="btn-clear-search"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="row g-4 reveal">
          {filteredProjects.map((project) => (
            <div key={project.id} className="col-md-6 col-lg-4">
              <div className="glass-card project-card h-100 d-flex flex-column overflow-hidden">
                
                {/* Image & Badges */}
                <div className="project-img-wrapper position-relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="img-fluid w-100 project-thumbnail"
                    loading="lazy"
                  />
                  <div className="project-badge-top">
                    <span className="badge bg-dark text-neon-blue border border-neon-blue small">
                      {project.categoryBadge}
                    </span>
                  </div>
                  {project.highlight && (
                    <div className="project-badge-highlight">
                      <span className="badge bg-dark text-warning border border-warning small">
                        ★ {project.highlight}
                      </span>
                    </div>
                  )}
                  {/* Quick View Overlay Button */}
                  <div className="project-overlay d-flex align-items-center justify-content-center">
                    <button
                      className="btn btn-sm btn-neon"
                      onClick={() => setSelectedProject(project)}
                    >
                      <i className="bi bi-eye me-1"></i> Quick View
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold mb-2 project-card-title">{project.title}</h5>
                  <p className="text-white small mb-3 flex-grow-1 lh-base opacity-90">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="d-flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="tech-badge-mini">
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="tech-badge-mini text-neon-blue fw-bold">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto d-flex align-items-center justify-content-between gap-2 pt-2 border-top border-secondary border-opacity-25">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="btn btn-sm btn-outline-info text-neon-blue border-0 p-0 text-decoration-none d-inline-flex align-items-center gap-1 fw-semibold"
                    >
                      <span>Deep Dive</span>
                      <i className="bi bi-chevron-right small"></i>
                    </button>

                    <div className="d-flex gap-2">
                      {project.githubUrl && project.githubUrl !== '#' && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-neon py-1 px-2"
                          title="View GitHub Repository"
                        >
                          <i className="bi bi-github"></i>
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== '#' ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-neon btn-neon-purple py-1 px-3 d-inline-flex align-items-center gap-1"
                        >
                          <i className="bi bi-box-arrow-up-right"></i>
                          <span>Live</span>
                        </a>
                      ) : (
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="btn btn-sm btn-outline-secondary py-1 px-2 text-white"
                          title="View Details"
                        >
                          <i className="bi bi-info-circle"></i>
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-white">No projects found matching "{searchQuery}".</p>
            </div>
          )}
        </div>

      </div>

      {/* Deep Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

export default Projects;
