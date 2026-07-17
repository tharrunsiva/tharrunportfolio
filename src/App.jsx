import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import img from './assets/Edited Putrajaya.jpg';
// IMPORT YOUR RESUME HERE
import resumePdf from './assets/Tharrun_resume__.pdf'; 
import img1 from './assets/chatbot.png';
import img2 from './assets/campustime.png'
import img3 from './assets/smartwaste.png'
import img4 from './assets/airline.png'
import img5 from './assets/docking.png'
import img6 from './assets/venture.png'

const App = () => {
  const typedTextRef = useRef(null);
  
  // State to manage form inputs and loading status
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // 1. Typing Animation Logic
    const textArray = ["Tharrun S", "a Full Stack Learner"];
    const typingDelay = 120;
    const erasingDelay = 80;
    const newTextDelay = 2000;
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
        typingTimeout = setTimeout(type, typingDelay + 500);
      }
    };

    typingTimeout = setTimeout(type, 1500);

    // 2. Intersection Observer for Scroll Reveal & Progress Bars
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          
          if (entry.target.id === 'skills' || entry.target.querySelector('.skill-bar')) {
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach(bar => {
              const targetWidth = bar.getAttribute('data-width');
              bar.style.width = targetWidth;
            });
          }
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) observer.observe(skillsSection);

    // 3. Highlight Dock Navigation Items on Scroll
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".dock-item");

    const handleScroll = () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      clearTimeout(typingTimeout);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to backend
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        alert(`Failed to send message: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while sending the message. Make sure the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-bs-spy="scroll" data-bs-target="#floating-dock" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" tabIndex="0">
      <div className="top-glow-bar"></div>

      <nav id="floating-dock" className="dock-nav">
        <a href="#home" className="dock-item" aria-label="Home">
          <i className="bi bi-house-door"></i>
          <span className="dock-label">Home</span>
        </a>
        <a href="#about" className="dock-item" aria-label="About">
          <i className="bi bi-person"></i>
          <span className="dock-label">About</span>
        </a>
        <a href="#skills" className="dock-item" aria-label="Skills">
          <i className="bi bi-cpu"></i>
          <span className="dock-label">Skills</span>
        </a>
        <a href="#projects" className="dock-item" aria-label="Projects">
          <i className="bi bi-grid-1x2"></i>
          <span className="dock-label">Projects</span>
        </a>
        <a href="#education" className="dock-item" aria-label="Education">
          <i className="bi bi-mortarboard"></i>
          <span className="dock-label">Education</span>
        </a>
        <a href="#contact" className="dock-item" aria-label="Contact">
          <i className="bi bi-envelope"></i>
          <span className="dock-label">Contact</span>
        </a>
      </nav>

      <section id="home" className="min-vh-100 d-flex align-items-center pt-4">
        <div className="container">
          <div className="row align-items-center g-5 flex-column-reverse flex-lg-row">
            
            <div className="col-lg-6 reveal">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-4" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.3)' }}>
                <span className="pulse-dot"></span>
                <span className="text-neon-green small fw-bold tracking-wide">AVAILABLE FOR NEW PROJECTS</span>
              </div>

              <p className="code-font text-neon-purple mb-2 fw-bold">&lt;init_portfolio&gt;</p>
              <h1 className="display-3 fw-bold mb-3 text-white">
                I'm <span id="typing-text" ref={typedTextRef} className="text-neon-blue"></span><span className="typing-cursor"></span>
              </h1>
              <h3 className="fw-light mb-4 text-highlight">MERN Stack Dev | Data Analyst</h3>
              <p className="text-white mb-5 fs-6 lh-lg">
                A MERN Stack Developer who blends powerful backend systems with clean, responsive user interfaces. I love exploring data, building interactive web experiences, and turning ideas into scalable digital products.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="#projects" className="btn btn-neon px-4 py-2">View Projects <i className="bi bi-arrow-right ms-2"></i></a>
                <a href={resumePdf} download="Tharrun_S_Resume.pdf" className="btn btn-neon btn-neon-green px-4 py-2">Download Resume <i className="bi bi-download ms-2"></i></a>
                <a href="#contact" className="btn btn-neon btn-neon-purple px-4 py-2">Hire Me</a>
              </div>
            </div>

            <div className="col-lg-6 text-center reveal">
              <div className="profile-img-container">
                <img src={img} alt="Developer Profile" className="profile-img" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="about" className="py-5 bg-darker">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <h2 className="text-neon-blue mb-2">About Me</h2>
            <div className="code-font text-white">const userProfile = {'{ status: "Active" }'}</div>
          </div>
          
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="glass-card p-4 p-md-5 reveal">
                <div className="row g-4 align-items-center">
                  <div className="col-md-7 border-end border-secondary">
                    <h4 className="mb-4 text-white fw-bold">Engineering Data & Interfaces</h4>
                    <p className="text-highlight lh-lg mb-0" style={{ color: '#e2e8f0' }}>
                      I specialize in building full-stack web applications using the MERN stack, focusing on combining strong backend architecture 
                      with clean and responsive user interfaces. I am passionate about working with databases, exploring SQL and data analysis techniques, 
                      and turning raw data into meaningful insights. Alongside my technical journey, I actively participate in Rotaract leadership initiatives, 
                      developing both my technical and organizational skills.                                
                    </p>
                  </div>
                  <div className="col-md-5">
                    <ul className="list-unstyled code-font text-highlight small lh-lg m-0 ps-3">
                      <li><strong className="text-neon-purple">Name:</strong> Tharrun S</li>
                      <li><strong className="text-neon-purple">Phone:</strong> 8220616181</li>
                      <li><strong className="text-neon-purple">Email:</strong> tharrunsiva@gmail.com</li>
                      <li><strong className="text-neon-purple">DOB:</strong> 1 Oct 2006</li>
                      <li><strong className="text-neon-purple">Role:</strong> MERN Stack Developer & DevOps Engineer</li>
                      <li><strong className="text-neon-purple">Location:</strong> Coimbatore, TN</li>
                      <li className="mt-2"><strong className="text-neon-green fs-6">● Available for Hire</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <h2 className="text-neon-purple mb-2">Technical Arsenal</h2>
            <div className="code-font text-white">sys.loadModules(['MERN', 'DataAnalytics'])</div>
          </div>

          <div className="row g-5 justify-content-center reveal">
            <div className="col-lg-5">
              <h4 className="text-white mb-4 border-bottom border-secondary pb-2"><i className="bi bi-stack text-neon-blue me-2"></i> MERN Stack & DevOps</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">MongoDB & SQL</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="90%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">Express.js & Node.js</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="85%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">React.js & Redux</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="88%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">HTML5 / CSS3 / Bootstrap</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="95%"></div></div>
              </div>
            </div>

            <div className="col-lg-5">
              <h4 className="text-white mb-4 border-bottom border-secondary pb-2"><i className="bi bi-bar-chart-fill text-neon-purple me-2"></i> Data & Design</h4>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">Python (Pandas, NumPy)</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="85%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">Data Mining & DBMS</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="80%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">UI/UX Design (Figma)</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="92%"></div></div>
              </div>
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-semibold text-highlight">Graphic Design (Logos & Editing)</span>
                </div>
                <div className="progress"><div className="progress-bar skill-bar" role="progressbar" data-width="95%"></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-5 bg-darker">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <h2 className="text-neon-blue mb-2">Featured Projects</h2>
            <div className="code-font text-muted">git checkout -b portfolio</div>
          </div>

          <div className="row g-4">
            <div className="col-md-6 col-lg-4 reveal">
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img1} alt="MERN Dashboard" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Multilingual Shopping Chatbot</h5>
                  <p className="text-highlight small mb-4 lh-base">Developed an AI-powered multilingual shopping chatbot using React, Node.js,
and a database with real-time support and personalized recommendations. Presented at the IBM Hackathon.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="#" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img2} alt="Data Mining Algo" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Campus Time Tracker</h5>
                  <p className="text-highlight small mb-4 lh-base">Developed a web-based project and time management system to create, organize, and track academic tasks, project schedules, deadlines, and progress with an intuitive dashboard.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="#" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: '0.2s' }}>
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img3} alt="Graphic Design UI" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Smart Waste Management System</h5>
                  <p className="text-highlight small mb-4 lh-base">Built a Python-based ML system to predict waste generation, optimize
collection routes, and monitor waste through interactive dashboards.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="#" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

             <div className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img4} alt="Data Mining Algo" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Airline Analytical Dashboard</h5>
                  <p className="text-highlight small mb-4 lh-base">Designed an interactive Power BI dashboard to analyze passenger trends, delays,
revenue, and KPIs for data-driven decision-making.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="#" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

             <div className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img5} alt="Data Mining Algo" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Ai Molecular Docking</h5>
                  <p className="text-highlight small mb-4 lh-base">Developed a Python-based AI application for molecular docking analysis to predict protein–ligand interactions, evaluate binding affinity, and support drug discovery and biomedical research.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="#" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="#" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

             <div className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: '0.1s' }}>
              <div className="glass-card h-100 d-flex flex-column overflow-hidden">
                <img src={img6} alt="Data Mining Algo" className="img-fluid border-bottom border-secondary" style={{ height: '200px', objectFit: 'cover' }} />
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <h5 className="text-white fw-bold">Venture Matching</h5>
                  <p className="text-highlight small mb-4 lh-base">Built a full-stack platform that intelligently connects startups with investors based on industry, funding stage, interests, and business goals, enabling efficient collaboration and networking.</p>
                  <div className="mt-auto d-flex gap-2">
                    <a href="https://github.com/supraja2706/ventormatch" className="btn btn-sm btn-neon"><i className="bi bi-github"></i> GitHub</a>
                    <a href="https://venturematches.netlify.app/" className="btn btn-sm btn-neon btn-neon-purple"><i className="bi bi-box-arrow-up-right"></i> Live</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="education" className="py-5">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <h2 className="text-neon-purple mb-2">Education & Experience</h2>
            <div className="code-font text-muted">SELECT * FROM timeline ORDER BY date DESC</div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline reveal">
                
                <div className="timeline-item glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0 text-neon-blue fw-bold">B.Sc Computer Science</h5>
                    <span className="badge bg-transparent border border-secondary text-highlight">2024 - Present</span>
                  </div>
                  <h6 className="text-white mb-3 fw-semibold">Sri Ramakrishna College of Arts and Science, Coimbatore</h6>
                  <p className="text-highlight small m-0 lh-lg">Currently in Semester V, expanding knowledge in core computer science subjects including programming, database management systems, data structures, and data mining, while strengthening problem-solving and software development skills.</p>
                </div>

                <div className="timeline-item glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0 text-neon-green fw-bold">Data Analyst Intern</h5>
                    <span className="badge bg-transparent border border-secondary text-highlight">2026 April - 2026 May</span>
                  </div>
                  <h6 className="text-white mb-3 fw-semibold">Edu Tantr, Bangalore</h6>
                  <p className="text-highlight small m-0 lh-lg">I have also worked as a Data Analyst for 2 months, gaining hands-on experience in real-time projects and developing practical skills in data handling, analysis, and visualization to extract meaningful insights from datasets.</p>
                </div>

                <div className="timeline-item glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0 text-neon-green fw-bold">MERN Stack Development & DevOps Engineering</h5>
                    <span className="badge bg-transparent border border-secondary text-highlight">2026 May - Present</span>
                  </div>
                  <h6 className="text-white mb-3 fw-semibold">Vinsup Skill Academy, Coimbatore</h6>
                  <p className="text-highlight small m-0 lh-lg">Currently Pursuing MERN Stack and DevOps training covering MongoDB, Express.js, React.js, Node.js, Git, Docker, and CI/CD practices.</p>
                </div>

                <div className="timeline-item glass-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0 text-neon-blue fw-bold">Club Service Director</h5>
                    <span className="badge bg-transparent border border-secondary text-highlight">Ongoing</span>
                  </div>
                  <h6 className="text-white mb-3 fw-semibold">Rotaract Club of Srcas</h6>
                  <p className="text-highlight small m-0 lh-lg">Actively managing data logistics, event records, and administrative rosters for over 40+ members, building foundational organizational and people skills.</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-5 bg-darker">
        <div className="container py-5">
          <div className="text-center mb-5 reveal">
            <h2 className="text-neon-green mb-2">Initialize Connection</h2>
            <div className="code-font text-muted">System.out.println("Let's talk!");</div>
          </div>

          <div className="row g-5 justify-content-center">
            <div className="col-lg-4 reveal">
              <div className="glass-card p-4 h-100 d-flex flex-column justify-content-center gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle border border-secondary text-neon-blue bg-dark">
                    <i className="bi bi-envelope-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">Email</h6>
                    <p className="text-highlight small m-0">tharrunsiva@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle border border-secondary text-neon-purple bg-dark">
                    <i className="bi bi-github fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">GitHub Repository</h6>
                    <p className="text-highlight small m-0">github.com/tharruniva</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="p-3 rounded-circle border border-secondary text-neon-green bg-dark">
                    <i className="bi bi-geo-alt-fill fs-4"></i>
                  </div>
                  <div>
                    <h6 className="text-white mb-1 fw-bold">Location</h6>
                    <p className="text-highlight small m-0">Coimbatore, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 reveal" style={{ transitionDelay: '0.2s' }}>
              <form className="glass-card p-4 p-md-5" onSubmit={handleContactSubmit}>
                <div className="mb-4">
                  <label className="form-label text-highlight small code-font fw-bold">NAME</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control custom-input py-2 text-white" 
                    placeholder="Tharrun" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-highlight small code-font fw-bold">EMAIL</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control custom-input py-2 text-white" 
                    placeholder="tharrunsiva@gmail.com" 
                    required 
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label text-highlight small code-font fw-bold">MESSAGE</label>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-control custom-input py-2 text-white" 
                    rows="4" 
                    placeholder="Hello, I would like to collaborate..." 
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-neon w-100 py-3 fw-bold fs-6" disabled={isSubmitting}>
                  {isSubmitting ? 'Transmitting...' : 'Transmit Message'} <i className="bi bi-send ms-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer py-5 text-center mt-auto">
        <div className="container reveal">
          <h3 className="text-white mb-3 fw-bold">Tharrun<span className="text-neon-blue">S.</span></h3>
          <p className="text-highlight code-font mb-4">"Design. Code. Innovate. Repeat."</p>
          
          <div className="d-flex justify-content-center gap-3 mb-4">
            <a href="https://github.com/tharrunsiva" className="social-icon"><i className="bi bi-github"></i></a>
            <a href="https://www.linkedin.com/in/tharrun-s-3313a12b6/" className="social-icon"><i className="bi bi-linkedin"></i></a>
            <a href="https://www.instagram.com/tharrun._.07_/?hl=en" className="social-icon"><i className="bi bi-instagram"></i></a>
          </div>
          
          <p className="text-muted small m-0 fw-semibold">© 2026, Crafted by Tharrun S.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;