import React, { useState } from 'react';
import { skillsData } from '../data/portfolioData';

const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'MERN & Full Stack', 'Data Analytics & ML', 'DevOps, Tools & UI/UX'];

  // Flattened skills with category annotation
  const allSkills = skillsData.flatMap(cat => 
    cat.skills.map(s => ({ ...s, category: cat.category }))
  );

  const filteredSkills = allSkills.filter(skill => {
    const matchesCat = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const techBadges = [
    { name: 'React.js', color: 'text-neon-blue' },
    { name: 'Node.js', color: 'text-neon-green' },
    { name: 'Express.js', color: 'text-white' },
    { name: 'MongoDB', color: 'text-neon-green' },
    { name: 'Python', color: 'text-warning' },
    { name: 'Pandas & NumPy', color: 'text-warning' },
    { name: 'SQL & DBMS', color: 'text-neon-blue' },
    { name: 'Power BI', color: 'text-warning' },
    { name: 'Docker', color: 'text-neon-blue' },
    { name: 'Git & GitHub', color: 'text-neon-purple' },
    { name: 'Figma UI/UX', color: 'text-neon-purple' },
    { name: 'REST APIs', color: 'text-neon-green' },
    { name: 'JavaScript ES6+', color: 'text-warning' },
    { name: 'Bootstrap 5', color: 'text-neon-purple' },
    { name: 'Linux OS', color: 'text-white' },
    { name: 'Data Mining', color: 'text-neon-blue' }
  ];

  return (
    <section id="skills" className="skills-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-cpu text-neon-purple"></i>
            <span className="small text-neon-purple fw-bold text-uppercase">Tech Matrix</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Technical Arsenal</h2>
          <div className="code-font text-white small opacity-90">
            sys.loadModules(['MERN', 'DataAnalytics', 'DevOps', 'UI/UX'])
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="row g-3 justify-content-between align-items-center mb-4 reveal">
          <div className="col-lg-8">
            <div className="category-filter-group d-flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="search-input-wrapper position-relative">
              <i className="bi bi-search search-icon text-white"></i>
              <input
                type="text"
                className="form-control skill-search-input py-2 ps-5 text-white"
                placeholder="Search skill (e.g. React, Python)..."
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

        {/* Skills Grid */}
        <div className="row g-4 reveal">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="glass-card skill-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <div className="skill-icon-pill">
                        <i className={`bi ${skill.icon} text-neon-blue`}></i>
                      </div>
                      <h6 className="text-white fw-bold m-0 fs-6">{skill.name}</h6>
                    </div>
                    <span className="badge-level code-font text-neon-green fw-bold small">
                      {skill.level}%
                    </span>
                  </div>

                  <p className="text-white small mb-3 opacity-90">{skill.desc}</p>
                </div>

                <div className="skill-bar-container mt-2">
                  <div className="progress custom-progress">
                    <div
                      className="progress-bar skill-bar-fill"
                      role="progressbar"
                      style={{ width: `${skill.level}%` }}
                      aria-valuenow={skill.level}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredSkills.length === 0 && (
            <div className="col-12 text-center py-5">
              <p className="text-white">No skills matched your search query "{searchQuery}".</p>
            </div>
          )}
        </div>

        {/* Interactive Tech Badge Cloud */}
        <div className="tech-cloud-box glass-card p-4 p-md-5 mt-5 text-center reveal">
          <h5 className="text-white fw-bold mb-3 d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-stars text-neon-blue"></i>
            <span>Mastered Technologies & Frameworks</span>
          </h5>
          <p className="text-white small mb-4 opacity-90">A snapshot of the daily drivers and platforms powering my solutions:</p>
          
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {techBadges.map((tech, idx) => (
              <div key={idx} className="tech-badge-item glass-tag px-3 py-2 rounded-pill d-inline-flex align-items-center gap-2">
                <span className={`badge-dot ${tech.color}`}>●</span>
                <span className="text-white small fw-bold">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Skills;
