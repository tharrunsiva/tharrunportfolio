import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

const Contact = ({ onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    if (onShowToast) {
      onShowToast({
        title: 'Copied!',
        message: `${text} copied to clipboard.`,
        type: 'success'
      });
    }
    setTimeout(() => setCopiedField(''), 2000);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        if (onShowToast) {
          onShowToast({
            title: 'Message Transmitted!',
            message: 'Thank you! Your message was sent successfully.',
            type: 'success'
          });
        }
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Server error');
      }
    } catch (error) {
      console.warn('Backend endpoint unavailable, providing email client fallback:', error);
      
      // Fallback to mailto so the user never loses their drafted message
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');

      if (onShowToast) {
        onShowToast({
          title: 'Opening Email Client',
          message: 'Direct transmission failed; opened your default email app as fallback.',
          type: 'info'
        });
      }
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section py-5 position-relative">
      <div className="container py-5">
        
        {/* Section Header */}
        <div className="text-center mb-5 reveal">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 glass-tag">
            <i className="bi bi-chat-square-dots text-neon-green"></i>
            <span className="small text-neon-green fw-bold text-uppercase">Direct Dispatch</span>
          </div>
          <h2 className="section-title display-5 fw-bold text-white mb-2">Initialize Connection</h2>
          <div className="code-font text-white small opacity-90">
            System.out.println("Let's build something remarkable!");
          </div>
        </div>

        <div className="row g-5 justify-content-center">
          
          {/* Contact Details Card */}
          <div className="col-lg-5 reveal">
            <div className="glass-card contact-info-card p-4 p-md-5 h-100 d-flex flex-column justify-content-between gap-4">
              <div>
                <h4 className="text-white fw-bold mb-3">Let's Connect & Collaborate</h4>
                <p className="text-white small lh-lg mb-4 opacity-95">
                  Whether you have an upcoming full-stack opportunity, need a data analytics pipeline, or 
                  would like to collaborate on an open-source innovation, feel free to reach out directly.
                </p>

                <div className="contact-list d-flex flex-column gap-3">
                  
                  {/* Email */}
                  <div className="contact-item d-flex align-items-center justify-content-between p-3 rounded-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box text-neon-blue">
                        <i className="bi bi-envelope-at-fill fs-5"></i>
                      </div>
                      <div>
                        <div className="text-white fw-medium small opacity-80">Email Dispatch</div>
                        <a href={`mailto:${personalInfo.email}`} className="text-white text-decoration-none fw-bold small">
                          {personalInfo.email}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(personalInfo.email, 'email')}
                      className="btn btn-sm btn-glass-mini"
                      title="Copy Email"
                    >
                      <i className={`bi ${copiedField === 'email' ? 'bi-check2 text-neon-green' : 'bi-clipboard'}`}></i>
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="contact-item d-flex align-items-center justify-content-between p-3 rounded-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box text-neon-purple">
                        <i className="bi bi-telephone-fill fs-5"></i>
                      </div>
                      <div>
                        <div className="text-white fw-medium small opacity-80">Phone & Direct Call</div>
                        <a href={`tel:${personalInfo.phone}`} className="text-white text-decoration-none fw-bold small">
                          {personalInfo.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy(personalInfo.phone, 'phone')}
                      className="btn btn-sm btn-glass-mini"
                      title="Copy Phone"
                    >
                      <i className={`bi ${copiedField === 'phone' ? 'bi-check2 text-neon-green' : 'bi-clipboard'}`}></i>
                    </button>
                  </div>

                  {/* WhatsApp Direct */}
                  <div className="contact-item d-flex align-items-center justify-content-between p-3 rounded-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box text-neon-green">
                        <i className="bi bi-whatsapp fs-5"></i>
                      </div>
                      <div>
                        <div className="text-white fw-medium small opacity-80">WhatsApp Messenger</div>
                        <a 
                          href={personalInfo.socialLinks.whatsapp} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-neon-green text-decoration-none fw-bold small d-inline-flex align-items-center gap-1"
                        >
                          <span>Chat on WhatsApp</span>
                          <i className="bi bi-box-arrow-up-right small"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="contact-item d-flex align-items-center p-3 rounded-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box text-warning">
                        <i className="bi bi-geo-alt-fill fs-5"></i>
                      </div>
                      <div>
                        <div className="text-white fw-medium small opacity-80">Base Location</div>
                        <div className="text-white fw-bold small">{personalInfo.location}</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="pt-3 border-top border-secondary border-opacity-25">
                <div className="text-white small mb-2 fw-semibold">Connect on Socials:</div>
                <div className="d-flex gap-2">
                  <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                    <i className="bi bi-github"></i>
                  </a>
                  <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href={personalInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-pill-btn">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Form Card */}
          <div className="col-lg-7 reveal">
            <form className="glass-card contact-form-card p-4 p-md-5" onSubmit={handleFormSubmit}>
              <h4 className="text-white fw-bold mb-4">Send a Direct Message</h4>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-white small code-font fw-bold">
                      YOUR NAME <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control custom-input py-2 text-white"
                      placeholder="e.g. John Doe"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label className="form-label text-white small code-font fw-bold">
                      YOUR EMAIL <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control custom-input py-2 text-white"
                      placeholder="e.g. john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mb-3">
                    <label className="form-label text-white small code-font fw-bold">
                      SUBJECT / TOPIC
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="form-control custom-input py-2 text-white"
                      placeholder="Project Opportunity / Full-Stack Collaboration"
                    />
                  </div>
                </div>

                <div className="col-12">
                  <div className="form-group mb-4">
                    <label className="form-label text-white small code-font fw-bold">
                      MESSAGE CONTENT <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="form-control custom-input py-2 text-white"
                      rows="5"
                      placeholder="Hello Tharrun, I came across your portfolio and would like to discuss..."
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-neon w-100 py-3 fw-bold fs-6 d-inline-flex align-items-center justify-content-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Transmitting Message...</span>
                  </>
                ) : (
                  <>
                    <span>Transmit Message</span>
                    <i className="bi bi-send-fill"></i>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
