import React, { useState } from 'react';
import { timelineData } from '../data/portfolioData';

const Timeline = () => {
  const [filterType, setFilterType] = useState('all');

  const filterOptions = [
    { label: 'All Journey', value: 'all' },
    { label: 'Work & Training', value: 'work' },
    { label: 'Education', value: 'education' },
    { label: 'Leadership', value: 'leadership' }
  ];

  const filteredItems = timelineData.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <section id="education" className="timeline-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-clock-history text-neon-green"></i>
            <span className="small text-neon-green fw-bold text-uppercase">Trajectory</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Education & Experience</h2>
          <div className="code-font text-white small opacity-90">
            SELECT * FROM timeline ORDER BY start_date DESC;
          </div>
        </div>

        {/* Filter Chips */}
        <div className="d-flex justify-content-center mb-5 reveal">
          <div className="custom-tabs-nav p-1 rounded-4 glass-card d-inline-flex flex-wrap gap-1">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                className={`tab-btn ${filterType === opt.value ? 'active' : ''}`}
                onClick={() => setFilterType(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="custom-timeline reveal">
              {filteredItems.map((item) => (
                <div key={item.id} className="timeline-block mb-4">
                  <div className="timeline-marker" style={{ borderColor: item.color }}>
                    <i className={`bi ${item.icon}`} style={{ color: item.color }}></i>
                  </div>

                  <div className="glass-card timeline-content-card p-4">
                    {/* Header Row - Fully Responsive & Aligned */}
                    <div className="timeline-header d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
                      <div className="timeline-title-group">
                        <h5 className="text-white fw-bold mb-1 d-flex flex-wrap align-items-center gap-2">
                          <span>{item.title}</span>
                          {item.period.includes('Present') && (
                            <span className="badge-active-pulse">Active</span>
                          )}
                        </h5>
                        <h6 className="text-neon-blue fw-bold small mb-1 d-inline-flex align-items-center gap-1">
                          <i className="bi bi-building"></i>
                          <span>{item.organization}</span>
                        </h6>
                      </div>

                      <div className="timeline-meta-group d-flex flex-wrap align-items-center gap-2">
                        <span className="period-badge px-3 py-1 rounded-pill small fw-bold text-white d-inline-flex align-items-center gap-1">
                          <i className="bi bi-calendar3 text-neon-green"></i>
                          <span>{item.period}</span>
                        </span>
                        <span className="location-badge px-3 py-1 rounded-pill small text-white opacity-95 d-inline-flex align-items-center gap-1">
                          <i className="bi bi-geo-alt-fill text-danger"></i>
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    {item.summary && (
                      <p className="text-white small mb-3 lh-base opacity-95">
                        {item.summary}
                      </p>
                    )}

                    {/* Bullets */}
                    <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
                      {item.bullets.map((b, idx) => (
                        <li key={idx} className="text-white small d-flex align-items-start gap-2 opacity-95">
                          <i className="bi bi-arrow-right-short text-neon-green fs-5 mt-n1"></i>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Timeline;
