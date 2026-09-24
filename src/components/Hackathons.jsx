import React, { useState, useEffect } from 'react';
import { hackathonsData } from '../data/portfolioData';

const Hackathons = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Track active photo index per hackathon card: { [hackathonId]: number }
  const [cardPhotoIndices, setCardPhotoIndices] = useState({
    'ibm-national-surat': 0,
    'ibm-national-srcas': 0,
    'zoho-chennai': 0,
    'vivitsu-grit': 0
  });

  // Lightbox Modal state: { hackathonId, photoIndex, photos, title }
  const [lightbox, setLightbox] = useState(null);

  const categories = [
    'All',
    'IBM Hackathons',
    'Zoho Hackathon',
    'National Finals & Wins',
    'Endurance & Open'
  ];

  const filteredHackathons = hackathonsData.filter((hack) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'IBM Hackathons') return hack.category === 'IBM Hackathon';
    if (selectedCategory === 'Zoho Hackathon') return hack.category === 'Zoho Hackathon';
    if (selectedCategory === 'National Finals & Wins') {
      return hack.isNational || hack.award.includes('1st Place') || hack.award.includes('4th Place');
    }
    if (selectedCategory === 'Endurance & Open') {
      return hack.category === 'Endurance Hackathon' || hack.category === 'Open Hackathon';
    }
    return true;
  });

  // Handle Next Photo on Card
  const handleNextPhoto = (e, hackId, totalPhotos) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => ({
      ...prev,
      [hackId]: ((prev[hackId] || 0) + 1) % totalPhotos
    }));
  };

  // Handle Prev Photo on Card
  const handlePrevPhoto = (e, hackId, totalPhotos) => {
    e.stopPropagation();
    setCardPhotoIndices((prev) => ({
      ...prev,
      [hackId]: ((prev[hackId] || 0) - 1 + totalPhotos) % totalPhotos
    }));
  };

  // Lightbox Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') {
        setLightbox((prev) => ({
          ...prev,
          photoIndex: (prev.photoIndex + 1) % prev.photos.length
        }));
      }
      if (e.key === 'ArrowLeft') {
        setLightbox((prev) => ({
          ...prev,
          photoIndex: (prev.photoIndex - 1 + prev.photos.length) % prev.photos.length
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox]);

  const handleLightboxNext = (e) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % prev.photos.length
    }));
  };

  const handleLightboxPrev = (e) => {
    e.stopPropagation();
    if (!lightbox) return;
    setLightbox((prev) => ({
      ...prev,
      photoIndex: (prev.photoIndex - 1 + prev.photos.length) % prev.photos.length
    }));
  };

  return (
    <section id="hackathons" className="hackathons-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-trophy-fill text-warning"></i>
            <span className="small text-warning fw-bold text-uppercase">Competitive Coding & Innovation</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Hackathons Attended</h2>
          <p className="code-font text-white small opacity-90 max-w-700 mx-auto">
            7 Intensive Sprints • National Grand Finals in Surat & Coimbatore • Zoho HQ Finalist in Chennai • 1st Place Wins
          </p>
        </div>

        {/* Filter Categories */}
        <div className="d-flex justify-content-center mb-5 reveal">
          <div className="custom-tabs-nav p-1 rounded-4 glass-card d-inline-flex flex-wrap gap-1">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'All' ? `All Hackathons (${hackathonsData.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Hackathons Grid */}
        <div className="row g-4 reveal">
          {filteredHackathons.map((hack) => {
            const hasPhotos = hack.photos && hack.photos.length > 0;
            const currentPhotoIdx = cardPhotoIndices[hack.id] || 0;
            const activePhoto = hasPhotos ? hack.photos[currentPhotoIdx] : null;

            return (
              <div key={hack.id} className="col-lg-6">
                <div className="glass-card hackathon-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between position-relative overflow-hidden">
                  
                  {/* Top Badge Strip */}
                  <div>
                    <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
                      <span className={`award-badge ${hack.awardBadgeClass || 'badge-gold'}`}>
                        {hack.award}
                      </span>
                      <span className="badge bg-dark text-white border border-secondary border-opacity-50 small px-2 py-1">
                        <i className="bi bi-stopwatch me-1 text-warning"></i>
                        {hack.duration}
                      </span>
                    </div>

                    {/* Title & Venue */}
                    <h3 className="text-white fw-bold fs-4 mb-1">{hack.title}</h3>
                    <div className="d-flex align-items-center gap-2 text-neon-blue small mb-3 fw-semibold">
                      <i className="bi bi-geo-alt-fill text-danger"></i>
                      <span>{hack.venue}</span>
                    </div>

                    {/* Project Highlight Box */}
                    <div className="hack-project-box p-3 rounded-3 mb-3">
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <span className="text-neon-green small fw-bold text-uppercase code-font">
                          Project Engineered:
                        </span>
                      </div>
                      <h5 className="text-white fw-bold fs-6 mb-2">{hack.projectTitle}</h5>
                      <p className="text-white small lh-base mb-0 opacity-95">
                        {hack.description}
                      </p>
                    </div>

                    {/* Key Takeaways */}
                    <ul className="list-unstyled mb-4 d-flex flex-column gap-2">
                      {hack.keyHighlights.map((hl, hIdx) => (
                        <li key={hIdx} className="text-white small d-flex align-items-start gap-2 opacity-95">
                          <i className="bi bi-check2-circle text-neon-cyan mt-1"></i>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Badges */}
                    <div className="d-flex flex-wrap gap-1 mb-4">
                      {hack.tech.map((t, tIdx) => (
                        <span key={tIdx} className="tech-badge-mini">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Photo Carousel on Selected Hackathons */}
                  {hasPhotos && (
                    <div className="hack-photo-carousel-wrapper pt-3 border-top border-secondary border-opacity-25">
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="text-white small fw-bold d-flex align-items-center gap-2">
                          <i className="bi bi-images text-neon-green"></i>
                          <span>Event Photos ({currentPhotoIdx + 1} / {hack.photos.length})</span>
                        </div>
                        
                        {/* Move Forward / Backward Navigation Buttons */}
                        {hack.photos.length > 1 && (
                          <div className="d-flex align-items-center gap-1">
                            <button
                              className="btn-photo-nav"
                              onClick={(e) => handlePrevPhoto(e, hack.id, hack.photos.length)}
                              title="Previous Photo"
                              aria-label="Previous Photo"
                            >
                              <i className="bi bi-chevron-left"></i>
                            </button>

                            <button
                              className="btn-photo-nav"
                              onClick={(e) => handleNextPhoto(e, hack.id, hack.photos.length)}
                              title="Next Photo"
                              aria-label="Next Photo"
                            >
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Main Featured Interactive Photo Card */}
                      <div 
                        className="hack-featured-photo-box position-relative rounded-3 overflow-hidden cursor-pointer mb-2"
                        onClick={() => setLightbox({
                          hackathonId: hack.id,
                          photoIndex: currentPhotoIdx,
                          photos: hack.photos,
                          title: `${hack.title} - ${hack.projectTitle}`
                        })}
                      >
                        <img 
                          src={activePhoto} 
                          alt={`${hack.title} showcase ${currentPhotoIdx + 1}`} 
                          className="img-fluid w-100 hack-featured-img"
                        />
                        
                        {/* Hover Overlay */}
                        <div className="photo-overlay d-flex align-items-center justify-content-center">
                          <div className="btn btn-sm btn-dark text-white border border-neon-blue d-inline-flex align-items-center gap-1">
                            <i className="bi bi-arrows-fullscreen text-neon-blue"></i>
                            <span>Click to Enlarge</span>
                          </div>
                        </div>

                        {/* Direct on-image next/prev buttons */}
                        {hack.photos.length > 1 && (
                          <>
                            <button
                              className="btn-photo-float-nav float-left"
                              onClick={(e) => handlePrevPhoto(e, hack.id, hack.photos.length)}
                              aria-label="Previous photo"
                            >
                              <i className="bi bi-chevron-left"></i>
                            </button>
                            <button
                              className="btn-photo-float-nav float-right"
                              onClick={(e) => handleNextPhoto(e, hack.id, hack.photos.length)}
                              aria-label="Next photo"
                            >
                              <i className="bi bi-chevron-right"></i>
                            </button>
                          </>
                        )}
                      </div>

                      {/* Thumbnails Row */}
                      {hack.photos.length > 1 && (
                        <div className="d-flex gap-2 flex-wrap">
                          {hack.photos.map((photo, pIdx) => (
                            <div
                              key={pIdx}
                              className={`hack-photo-thumb rounded-2 overflow-hidden cursor-pointer ${pIdx === currentPhotoIdx ? 'active-thumb' : ''}`}
                              onClick={() => setCardPhotoIndices((prev) => ({ ...prev, [hack.id]: pIdx }))}
                            >
                              <img src={photo} alt="thumbnail" className="img-fluid" />
                            </div>
                          ))}
                        </div>
                      )}

                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal with Full Next/Prev Navigation */}
      {lightbox && (
        <div 
          className="modal-backdrop-custom d-flex align-items-center justify-content-center p-3"
          onClick={() => setLightbox(null)}
        >
          <div 
            className="glass-card p-3 position-relative text-center overflow-hidden" 
            style={{ maxWidth: '850px', width: '100%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="btn-modal-close" 
              onClick={() => setLightbox(null)}
              aria-label="Close Lightbox"
            >
              <i className="bi bi-x-lg"></i>
            </button>

            {/* Lightbox Next & Prev Floating Arrows */}
            {lightbox.photos.length > 1 && (
              <>
                <button 
                  className="btn-lightbox-nav btn-lightbox-prev" 
                  onClick={handleLightboxPrev}
                  aria-label="Previous image"
                >
                  <i className="bi bi-chevron-left fs-4"></i>
                </button>

                <button 
                  className="btn-lightbox-nav btn-lightbox-next" 
                  onClick={handleLightboxNext}
                  aria-label="Next image"
                >
                  <i className="bi bi-chevron-right fs-4"></i>
                </button>
              </>
            )}

            {/* Display Current Photo */}
            <img 
              src={lightbox.photos[lightbox.photoIndex]} 
              alt={lightbox.title} 
              className="img-fluid rounded-3 mb-2"
              style={{ maxHeight: '72vh', width: '100%', objectFit: 'contain' }}
            />

            {/* Title & Photo Indicator */}
            <div className="d-flex align-items-center justify-content-between px-2 pt-2 border-top border-secondary border-opacity-25">
              <h6 className="text-white fw-bold small m-0 text-truncate pe-2">{lightbox.title}</h6>
              <span className="badge bg-dark text-neon-green border border-neon-green small">
                {lightbox.photoIndex + 1} / {lightbox.photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hackathons;
