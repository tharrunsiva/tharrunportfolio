import React, { useState } from 'react';
import { personalInfo, servicesData } from '../data/portfolioData';

const About = () => {
  const [activeTab, setActiveTab] = useState('bio');

  return (
    <section id="about" className="about-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-person-badge text-neon-blue"></i>
            <span className="small text-neon-blue fw-bold text-uppercase">Profile Overview</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">About Me</h2>
          <div className="code-font text-highlight small">
            const userProfile = &#123; status: "{personalInfo.status}", focus: "FullStack & Analytics" &#125;;
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="d-flex justify-content-center mb-4 reveal">
          <div className="custom-tabs-nav p-1 rounded-4 glass-card d-inline-flex flex-wrap gap-1">
            <button
              className={`tab-btn ${activeTab === 'bio' ? 'active' : ''}`}
              onClick={() => setActiveTab('bio')}
            >
              <i className="bi bi-file-earmark-person me-2"></i> Story & Focus
            </button>
            <button
              className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveTab('services')}
            >
              <i className="bi bi-lightning-charge me-2"></i> What I Deliver
            </button>
            <button
              className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <i className="bi bi-card-checklist me-2"></i> Key Details
            </button>
            <button
              className={`tab-btn ${activeTab === 'leadership' ? 'active' : ''}`}
              onClick={() => setActiveTab('leadership')}
            >
              <i className="bi bi-award me-2"></i> Leadership & Rotaract
            </button>
          </div>
        </div>

        {/* Tab Content Box */}
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="glass-card main-about-card p-4 p-md-5 reveal">
              
              {/* Tab 1: Story & Focus */}
              {activeTab === 'bio' && (
                <div className="tab-pane-fade show">
                  <div className="row g-4 align-items-center">
                    <div className="col-lg-7 border-end-lg border-secondary border-opacity-25 pe-lg-4">
                      <h4 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                        <span className="text-gradient-cyan">Engineering Data & Scalable Interfaces</span>
                      </h4>
                      <p className="text-white lh-lg mb-3 fs-6">
                        I specialize in building full-stack web applications using the <strong className="text-neon-blue">MERN stack</strong>, 
                        focusing on combining strong backend architecture with clean and responsive user interfaces. 
                        I am passionate about working with databases, exploring SQL and data analysis techniques, and 
                        turning raw data into meaningful insights.
                      </p>
                      <p className="text-white lh-lg mb-0 fs-6">
                        Alongside my technical journey, I actively participate in <strong className="text-neon-green">Rotaract leadership initiatives</strong>, 
                        developing both my technical, organizational, and empathetic communication skills. Whether designing a 
                        predictive machine learning workflow or architecting a production CRM, I strive for high performance, 
                        maintainability, and visual elegance.
                      </p>
                    </div>

                    <div className="col-lg-5 ps-lg-4">
                      <div className="about-highlight-box p-3 rounded-4">
                        <h6 className="text-neon-blue fw-bold mb-3 fs-6">Core Technical Strengths</h6>
                        <ul className="list-unstyled d-flex flex-column gap-3 m-0">
                          <li className="d-flex align-items-center gap-2 text-white">
                            <i className="bi bi-check2-circle text-neon-green fs-5"></i>
                            <span className="fw-semibold">Full-Stack MERN Architectures</span>
                          </li>
                          <li className="d-flex align-items-center gap-2 text-white">
                            <i className="bi bi-check2-circle text-neon-green fs-5"></i>
                            <span className="fw-semibold">Database Design & SQL Optimization</span>
                          </li>
                          <li className="d-flex align-items-center gap-2 text-white">
                            <i className="bi bi-check2-circle text-neon-green fs-5"></i>
                            <span className="fw-semibold">Data Analysis & Predictive ML</span>
                          </li>
                          <li className="d-flex align-items-center gap-2 text-white">
                            <i className="bi bi-check2-circle text-neon-green fs-5"></i>
                            <span className="fw-semibold">Docker & DevOps Deployment CI/CD</span>
                          </li>
                          <li className="d-flex align-items-center gap-2 text-white">
                            <i className="bi bi-check2-circle text-neon-green fs-5"></i>
                            <span className="fw-semibold">UI/UX Figma Design & Rapid Prototyping</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: What I Deliver / Services */}
              {activeTab === 'services' && (
                <div className="tab-pane-fade show">
                  <div className="row g-4">
                    {servicesData.map((srv) => (
                      <div key={srv.id} className="col-md-6">
                        <div className="p-4 rounded-4 border border-secondary border-opacity-25 h-100 bg-dark-card">
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="icon-pill-lg" style={{ color: srv.color }}>
                              <i className={`bi ${srv.icon} fs-4`}></i>
                            </div>
                            <h5 className="text-white fw-bold m-0 fs-6">{srv.title}</h5>
                          </div>
                          <p className="text-white lh-base small m-0 pt-2">
                            {srv.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Key Details Matrix */}
              {activeTab === 'details' && (
                <div className="tab-pane-fade show">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Full Name</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">{personalInfo.name}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Primary Role</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">MERN Stack Developer & Data Analyst</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Email Address</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">{personalInfo.email}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Phone / Contact</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">{personalInfo.phone}</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Education</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">B.Sc Computer Science (Semester V), SRCAS</div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item-card p-3 rounded-3 h-100">
                        <span className="info-label text-neon-purple fw-bold small text-uppercase">Location</span>
                        <div className="info-value text-white fs-6 fw-bold mt-1">{personalInfo.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Rotaract Leadership */}
              {activeTab === 'leadership' && (
                <div className="tab-pane-fade show">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="leadership-card p-4 rounded-4 border border-secondary border-opacity-25 h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="icon-pill-lg text-neon-green">
                            <i className="bi bi-broadcast fs-4"></i>
                          </div>
                          <div>
                            <h5 className="text-white fw-bold mb-1">Secretary Communication</h5>
                            <span className="badge bg-dark text-neon-green border border-neon-green">July 2026 - Present</span>
                          </div>
                        </div>
                        <h6 className="text-neon-blue small mb-2 fw-semibold">Rotaract Club of Coimbatore Changemakers</h6>
                        <p className="text-white small lh-lg m-0">
                          Directing communication strategy, press releases, social media campaigns, and official outreach for club humanitarian projects across Coimbatore.
                        </p>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="leadership-card p-4 rounded-4 border border-secondary border-opacity-25 h-100">
                        <div className="d-flex align-items-center gap-3 mb-3">
                          <div className="icon-pill-lg text-neon-blue">
                            <i className="bi bi-people-fill fs-4"></i>
                          </div>
                          <div>
                            <h5 className="text-white fw-bold mb-1">Club Service Director</h5>
                            <span className="badge bg-dark text-neon-blue border border-neon-blue">2025 - 2026</span>
                          </div>
                        </div>
                        <h6 className="text-neon-blue small mb-2 fw-semibold">Rotaract Club of SRCAS</h6>
                        <p className="text-white small lh-lg m-0">
                          Spearheaded member recruitment pipelines, managed orientation programs, and facilitated engagement metrics for 100+ active collegiate members.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Core Value Pillars Grid */}
        <div className="row g-4 mt-4 reveal">
          <div className="col-md-6 col-lg-3">
            <div className="glass-card feature-pillar-card p-4 h-100 text-center">
              <div className="pillar-icon-box text-neon-blue mb-3">
                <i className="bi bi-stack fs-2"></i>
              </div>
              <h5 className="text-white fw-bold mb-2">MERN Full-Stack</h5>
              <p className="text-white small m-0 opacity-90">
                Scalable React SPAs, robust Express REST APIs, and MongoDB architectures.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="glass-card feature-pillar-card p-4 h-100 text-center">
              <div className="pillar-icon-box text-neon-purple mb-3">
                <i className="bi bi-bar-chart-steps fs-2"></i>
              </div>
              <h5 className="text-white fw-bold mb-2">Data & Analytics</h5>
              <p className="text-white small m-0 opacity-90">
                Statistical modeling with Python, SQL querying, and Power BI dashboards.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="glass-card feature-pillar-card p-4 h-100 text-center">
              <div className="pillar-icon-box text-neon-green mb-3">
                <i className="bi bi-boxes fs-2"></i>
              </div>
              <h5 className="text-white fw-bold mb-2">DevOps & Cloud</h5>
              <p className="text-white small m-0 opacity-90">
                Docker containers, Git automation, and CI/CD deployment pipelines.
              </p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="glass-card feature-pillar-card p-4 h-100 text-center">
              <div className="pillar-icon-box text-warning mb-3">
                <i className="bi bi-vector-pen fs-2"></i>
              </div>
              <h5 className="text-white fw-bold mb-2">UI/UX & Design</h5>
              <p className="text-white small m-0 opacity-90">
                Figma wireframes, rapid interactive mockups, and sleek modern aesthetics.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
