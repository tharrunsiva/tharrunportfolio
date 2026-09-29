import React, { useState, useEffect, useRef } from 'react';
import { processUserQuery, defaultQuickPrompts } from '../utils/aiKnowledgeEngine';
import { personalInfo } from '../data/portfolioData';

const speechGreetingText = "👋 Hey! I'm THAR-X, Tharrun's AI";

const topicCategories = [
  { id: 'all', label: '⚡ All Topics', icon: 'bi-grid-fill' },
  { id: 'hackathons', label: '🏆 Hackathons', query: 'Tell me about all your 7+ hackathon wins and awards', icon: 'bi-trophy-fill' },
  { id: 'projects', label: '💻 Projects', query: 'Show me your production projects and apps', icon: 'bi-code-square' },
  { id: 'bio', label: '👨 Bio & Family', query: 'What is Tharrun\'s father name, DOB and education?', icon: 'bi-person-badge-fill' },
  { id: 'skills', label: '🛠️ Tech Stack', query: 'What are your technical skills and expertise?', icon: 'bi-tools' },
  { id: 'resume', label: '📄 Resume', query: 'How can I download Tharrun\'s verified resume?', icon: 'bi-file-earmark-pdf-fill' },
  { id: 'contact', label: '📞 Contact', query: 'How can I contact Tharrun on WhatsApp or phone?', icon: 'bi-telephone-fill' }
];

const capabilityCards = [
  {
    id: 'hack',
    icon: 'bi-trophy-fill',
    badge: '7+ Sprints',
    title: 'Hackathons & Honors',
    desc: 'IBM National 4th, MKCE 3rd, Zoho Grand Finalist',
    color: '#00e5ff',
    gradient: 'linear-gradient(135deg, rgba(0, 229, 255, 0.18), rgba(15, 23, 42, 0.95))',
    query: 'Tell me about all hackathon wins and awards'
  },
  {
    id: 'proj',
    icon: 'bi-code-square',
    badge: '9+ Live Apps',
    title: 'Production Projects',
    desc: 'Vinsup CRM, Revivo AI, Venture Matching',
    color: '#c084fc',
    gradient: 'linear-gradient(135deg, rgba(192, 132, 252, 0.18), rgba(15, 23, 42, 0.95))',
    query: 'Show me your production projects and apps'
  },
  {
    id: 'edu',
    icon: 'bi-mortarboard-fill',
    badge: 'SRCAS & Bio',
    title: 'Education & Family',
    desc: 'B.Sc CS @ SRCAS • Father: Sivakumar • DOB: 01 Oct',
    color: '#00ff88',
    gradient: 'linear-gradient(135deg, rgba(0, 255, 136, 0.18), rgba(15, 23, 42, 0.95))',
    query: 'Where did Tharrun study and what is his father\'s name and DOB?'
  },
  {
    id: 'res',
    icon: 'bi-file-earmark-pdf-fill',
    badge: 'Verified PDF',
    title: 'Resume & Credentials',
    desc: 'Download verified CV & view full certifications',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(15, 23, 42, 0.95))',
    query: 'How can I download Tharrun\'s resume?'
  }
];

const RobotAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSpeechBanner, setShowSpeechBanner] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCapabilityDeck, setShowCapabilityDeck] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isVoiceSpeaking, setIsVoiceSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState(null);

  // Initial Message History
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am **THAR-X** (Tharrun's Neural AI Companion v2.5 PRO) 🤖.\n\nI have complete, instant intelligence on:\n• 👨 **Father's Name:** Sivakumar\n• 🎂 **Date of Birth:** 01 October 2006 (19 Yrs)\n• 🎓 **Education:** B.Sc Computer Science @ SRCAS Coimbatore\n• 🏆 **National Hackathons:** 7+ Wins (IBM Surat 4th Place, MKCE 3rd, Zoho Finalist)\n• 💻 **Production Projects:** Vinsup CRM, Revivo, Venture Match\n• 📄 **Verified Resume & Contact**\n\nHow can I assist your exploration today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: ['👨 Father\'s Name', '🎂 Date of Birth', '🎓 Education & College', '🏆 Top Hackathon Wins', '💻 Featured Projects', '📞 Contact & WhatsApp']
    }
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Display speech bubble once for 5.5s on page load, then permanently hide until page refresh
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpeechBanner(false);
    }, 5500);
    return () => clearTimeout(timer);
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      if (window.innerWidth > 768) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [isOpen, messages, isTyping]);

  // Speech Recognition setup (Voice-to-Text)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputValue(transcript);
          handleSendMessage(transcript);
        }
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert("Voice input is not supported in this browser. Please type your question!");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn(e);
      }
    }
  };

  // Text-to-Speech (Voice readout of answers)
  const speakText = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isVoiceSpeaking) {
      setIsVoiceSpeaking(false);
      return;
    }

    // Clean markdown symbols for natural speech
    const cleanSpeech = text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/[•◆\n\r]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[#_*~`]/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('David') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    utterance.onstart = () => setIsVoiceSpeaking(true);
    utterance.onend = () => setIsVoiceSpeaking(false);
    utterance.onerror = () => setIsVoiceSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    setShowSpeechBanner(false);
    if (!isOpen && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsVoiceSpeaking(false);
    }
  };

  const handleSendMessage = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setShowCapabilityDeck(false);

    // Natural computation delay simulation (350 - 550ms)
    const delay = Math.min(550, Math.max(320, query.length * 10));

    setTimeout(() => {
      const response = processUserQuery(query);

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: response.answer,
        actions: response.actions,
        suggestions: response.suggestions,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      // If global voice readout is enabled, auto-speak
      if (voiceEnabled) {
        speakText(response.answer);
      }
    }, delay);
  };

  const handleActionClick = (action) => {
    if (action.type === 'scroll') {
      const element = document.querySelector(action.value);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action.type === 'download' || action.type === 'link') {
      window.open(action.value, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat.id);
    if (cat.query) {
      handleSendMessage(cat.query);
    } else if (cat.id === 'all') {
      setShowCapabilityDeck(true);
    }
  };

  const handleCopyMessage = (msgId, text) => {
    const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1');
    navigator.clipboard.writeText(cleanText).then(() => {
      setCopiedMsgId(msgId);
      setTimeout(() => setCopiedMsgId(null), 2000);
    });
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setIsVoiceSpeaking(false);
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: `Chat session refreshed! 🤖 What else would you like to explore about **Tharrun Sivakumar**?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ['👨 Father\'s Name', '🎂 Date of Birth', '🏆 Hackathon Awards', '🎓 College & Degree', '💻 Projects', '📞 WhatsApp']
      }
    ]);
    setShowCapabilityDeck(true);
  };

  // Helper to format bot markdown text with rich icons & structured highlighting
  const formatBotText = (text) => {
    if (!text) return '';
    const parts = text.split('\n');
    return parts.map((line, idx) => {
      // Replace **bold** with highlighted <strong>
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-neon-cyan">$1</strong>');
      // Format bullet points with glowing cyan diamond
      if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
        formattedLine = `<span class="bullet-diamond">◆</span> ` + formattedLine.replace(/^[•\-]\s*/, '');
      }
      return (
        <React.Fragment key={idx}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {idx < parts.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="robot-assistant-root">
      
      {/* Floating Full Body Dancing Robot Mascot Trigger */}
      <div className={`robot-mascot-container ${isOpen ? 'active-open' : ''}`}>
        
        {/* Dynamic Speech Banner - Displays once on load and auto-hides */}
        {!isOpen && showSpeechBanner && (
          <div 
            className="robot-speech-banner" 
            onClick={() => {
              setShowSpeechBanner(false);
              setIsOpen(true);
            }}
            title="Click to chat with AI Assistant"
          >
            <div className="d-flex align-items-center gap-2">
              <span className="speech-pulse-dot"></span>
              <span className="speech-text">
                {speechGreetingText}
              </span>
            </div>
            <div className="speech-banner-arrow"></div>
          </div>
        )}

        {/* Full-Body Animated Cyber Robot Trigger */}
        <div 
          className="robot-mascot-interactive-trigger"
          onClick={handleToggleChat}
          title="Click to Chat with Tharrun's AI Robot!"
          role="button"
          tabIndex={0}
        >
          <div className="robot-mascot-character">
            
            {/* Holographic Radar Waves behind robot */}
            <div className="robot-mascot-hologram-pulse"></div>

            {/* SVG Full Robot Body with CSS Animations */}
            <svg
              className="robot-mascot-svg"
              viewBox="0 0 120 150"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cyberMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="50%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>
                <linearGradient id="neonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#00ff88" />
                </linearGradient>
                <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00e5ff" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <filter id="neonBlur" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Antenna */}
              <g className="robot-part-antenna">
                <line x1="60" y1="22" x2="60" y2="9" stroke="#00e5ff" strokeWidth="3" strokeLinecap="round" />
                <circle cx="60" cy="8" r="5" fill="#00e5ff" filter="url(#neonBlur)" className="robot-antenna-orb" />
              </g>

              {/* Ears / Headset Lights */}
              <rect x="25" y="32" width="6" height="16" rx="3" fill="#00e5ff" className="robot-ear-light" />
              <rect x="89" y="32" width="6" height="16" rx="3" fill="#00e5ff" className="robot-ear-light" />

              {/* Robot Head */}
              <g className="robot-part-head">
                <rect x="29" y="20" width="62" height="42" rx="16" fill="url(#cyberMetal)" stroke="#00e5ff" strokeWidth="2.5" />
                
                {/* Visor Screen */}
                <rect x="36" y="28" width="48" height="24" rx="8" fill="#030712" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" />
                
                {/* Animated Glowing Eyes */}
                <g className="robot-animated-eyes">
                  <ellipse cx="48" cy="40" rx="5" ry="6" fill="#00e5ff" filter="url(#neonBlur)" className="robot-eye-left" />
                  <ellipse cx="72" cy="40" rx="5" ry="6" fill="#00e5ff" filter="url(#neonBlur)" className="robot-eye-right" />
                  <circle cx="50" cy="38" r="1.5" fill="#ffffff" />
                  <circle cx="74" cy="38" r="1.5" fill="#ffffff" />
                </g>

                {/* Visor Smile / Scan Line */}
                <path d="M54 48 Q60 52 66 48" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" fill="none" />
              </g>

              {/* Neck Joint */}
              <rect x="52" y="61" width="16" height="6" rx="2" fill="#334155" />

              {/* Left Arm (Dancing / Bouncing) */}
              <g className="robot-arm-left">
                <path d="M33 72 C20 80 18 95 24 102" stroke="url(#cyberMetal)" strokeWidth="8" strokeLinecap="round" fill="none" />
                <circle cx="24" cy="102" r="6" fill="#00e5ff" />
              </g>

              {/* Right Arm (Waving Cheerful Hand!) */}
              <g className="robot-arm-right">
                <path d="M87 72 C102 70 108 55 102 44" stroke="url(#cyberMetal)" strokeWidth="8" strokeLinecap="round" fill="none" />
                <circle cx="102" cy="44" r="6" fill="#00e5ff" filter="url(#neonBlur)" />
              </g>

              {/* Robot Body / Torso */}
              <g className="robot-part-torso">
                <rect x="34" y="66" width="52" height="46" rx="12" fill="url(#cyberMetal)" stroke="#00e5ff" strokeWidth="2.5" />
                <line x1="42" y1="84" x2="78" y2="84" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                
                {/* Pulsing Energy Core / Arc Reactor */}
                <circle cx="60" cy="88" r="10" fill="#030712" stroke="#00e5ff" strokeWidth="2" />
                <circle cx="60" cy="88" r="6" fill="url(#neonGlow)" filter="url(#neonBlur)" className="robot-energy-core" />
                <circle cx="60" cy="88" r="2.5" fill="#ffffff" />
              </g>

              {/* Jet Thrusters & Energy Flames */}
              <g className="robot-part-thrusters">
                <rect x="42" y="111" width="14" height="8" rx="3" fill="#1e293b" stroke="#00e5ff" strokeWidth="1.5" />
                <polygon points="44,119 56,119 49,138" fill="url(#flameGrad)" className="robot-thruster-flame-left" />

                <rect x="64" y="111" width="14" height="8" rx="3" fill="#1e293b" stroke="#00e5ff" strokeWidth="1.5" />
                <polygon points="66,119 78,119 71,138" fill="url(#flameGrad)" className="robot-thruster-flame-right" />
              </g>
            </svg>

            {/* AI Floating Status Pill */}
            <div className="robot-mascot-status-pill">
              <span className="pulse-dot-sm me-1"></span>
              <span>THAR-X 🤖</span>
            </div>

          </div>
        </div>

      </div>

      {/* Cyberpunk Glassmorphism Chat Window (Ultra High-Tech Luxury Theme) */}
      <div className={`robot-chat-window ${isOpen ? 'open' : ''}`}>
        
        {/* Sci-Fi Ambient Corner HUD Accents */}
        <div className="hud-corner hud-corner-tl"></div>
        <div className="hud-corner hud-corner-tr"></div>
        <div className="hud-corner hud-corner-bl"></div>
        <div className="hud-corner hud-corner-br"></div>

        {/* Holographic Top Laser Bar */}
        <div className="holographic-top-laser"></div>

        {/* Ambient Grid Background */}
        <div className="robot-chat-ambient-grid"></div>

        {/* Chat Window Header */}
        <div className="robot-chat-header d-flex align-items-center justify-content-between p-3 position-relative z-2">
          <div className="d-flex align-items-center gap-3">
            <div className="robot-header-avatar">
              <div className="robot-avatar-inner">
                <i className="bi bi-robot text-neon-cyan fs-5"></i>
              </div>
              <div className="robot-avatar-ring-rotating"></div>
              <span className="online-indicator-dot"></span>
            </div>
            <div>
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <h6 className="cyber-brand-title text-white fw-bold m-0 fs-6">THAR-X AI</h6>
                <span className="badge-neural-ai">
                  <i className="bi bi-cpu-fill me-1 text-neon-cyan"></i>
                  v2.5 PRO
                </span>
              </div>
              <div className="d-flex align-items-center gap-2 mt-1">
                <div className={`audio-wave-bars ${isVoiceSpeaking ? 'speaking' : ''}`}>
                  <span></span><span></span><span></span><span></span><span></span>
                </div>
                <span className="text-neon-green small code-font" style={{ fontSize: '0.72rem' }}>
                  {isVoiceSpeaking ? '🔊 Synthesizing Voice...' : '⚡ Online • 0ms Neural Engine'}
                </span>
              </div>
            </div>
          </div>

          <div className="d-flex align-items-center gap-1">
            {/* Voice Readout Toggle */}
            <button
              className={`btn-chat-header-action ${voiceEnabled ? 'active-voice' : ''}`}
              onClick={() => {
                setVoiceEnabled(!voiceEnabled);
                if (isVoiceSpeaking) {
                  window.speechSynthesis.cancel();
                  setIsVoiceSpeaking(false);
                }
              }}
              title={voiceEnabled ? 'Voice Readout: ON (Click to Mute)' : 'Voice Readout: OFF (Click to Enable Speech)'}
              aria-label="Toggle Voice Readout"
            >
              <i className={`bi ${voiceEnabled ? 'bi-volume-up-fill text-neon-green' : 'bi-volume-mute'}`}></i>
            </button>

            {/* Refresh Chat */}
            <button
              className="btn-chat-header-action"
              onClick={handleClearChat}
              title="Reset Conversation"
              aria-label="Reset Conversation"
            >
              <i className="bi bi-arrow-clockwise"></i>
            </button>

            {/* Close Chat */}
            <button
              className="btn-chat-header-action btn-close-chat"
              onClick={() => setIsOpen(false)}
              title="Close Assistant"
              aria-label="Close Assistant"
            >
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>

        {/* Quick Category Filter Pills Bar */}
        <div className="robot-category-filter-strip px-3 py-2 border-bottom border-secondary border-opacity-15 position-relative z-2">
          <div className="category-pills-scroll d-flex gap-1">
            {topicCategories.map((cat) => (
              <button
                key={cat.id}
                className={`btn-category-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <i className={`bi ${cat.icon} me-1`}></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages Stream with Ambient Cyber Glow */}
        <div className="robot-chat-messages p-3 position-relative z-2">
          
          {/* Quick Capability Matrix Cards (Initial state HUD) */}
          {showCapabilityDeck && (
            <div className="capability-deck-grid mb-3">
              <div className="capability-deck-header d-flex align-items-center justify-content-between mb-2">
                <span className="badge-matrix-tag">
                  <i className="bi bi-lightning-charge-fill me-1 text-warning"></i>
                  NEURAL KNOWLEDGE CAPABILITIES
                </span>
                <span className="text-white-50 code-font" style={{ fontSize: '0.65rem' }}>
                  Tap any card
                </span>
              </div>
              
              <div className="row g-2">
                {capabilityCards.map((card) => (
                  <div key={card.id} className="col-6">
                    <div 
                      className="capability-card-pro p-2 rounded-3 cursor-pointer h-100"
                      onClick={() => handleSendMessage(card.query)}
                      style={{ 
                        '--card-color': card.color,
                        background: card.gradient,
                        borderColor: `rgba(${card.color === '#00e5ff' ? '0, 229, 255' : card.color === '#c084fc' ? '192, 132, 252' : card.color === '#00ff88' ? '0, 255, 136' : '245, 158, 11'}, 0.35)`
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="card-icon-halo" style={{ background: `rgba(${card.color === '#00e5ff' ? '0, 229, 255' : card.color === '#c084fc' ? '192, 132, 252' : card.color === '#00ff88' ? '0, 255, 136' : '245, 158, 11'}, 0.2)` }}>
                          <i className={`bi ${card.icon}`} style={{ color: card.color }}></i>
                        </div>
                        <span className="card-badge-pill" style={{ color: card.color, borderColor: card.color }}>
                          {card.badge}
                        </span>
                      </div>
                      <h6 className="fw-bold text-white mb-1" style={{ fontSize: '0.8rem' }}>{card.title}</h6>
                      <p className="text-white-50 m-0" style={{ fontSize: '0.68rem', lineHeight: '1.3' }}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Render All Messages */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              {msg.sender === 'bot' ? (
                <div className="bot-avatar-mini me-2 flex-shrink-0">
                  <i className="bi bi-cpu-fill text-neon-cyan"></i>
                  <div className="bot-avatar-pulse"></div>
                </div>
              ) : (
                <div className="user-avatar-mini ms-2 order-2 flex-shrink-0">
                  <i className="bi bi-person-fill text-white"></i>
                </div>
              )}

              <div className="message-content-wrapper">
                <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble-pro'}`}>
                  
                  {/* High-tech Bot Card Top Header Bar */}
                  {msg.sender === 'bot' && (
                    <div className="bot-bubble-meta-header d-flex align-items-center justify-content-between mb-2 pb-1">
                      <div className="d-flex align-items-center gap-1">
                        <span className="bot-core-tag code-font">
                          <i className="bi bi-shield-check me-1 text-neon-green"></i>
                          THAR-X CORE
                        </span>
                        <span className="bot-badge-model code-font">v2.5</span>
                      </div>
                      
                      {/* Micro actions: Copy & Read Aloud */}
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn-bubble-tool"
                          onClick={() => speakText(msg.text)}
                          title="Read out loud"
                          aria-label="Speak text"
                        >
                          <i className="bi bi-volume-up"></i>
                        </button>
                        <button
                          className="btn-bubble-tool"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          title="Copy message"
                          aria-label="Copy message"
                        >
                          <i className={`bi ${copiedMsgId === msg.id ? 'bi-check-lg text-neon-green' : 'bi-clipboard'}`}></i>
                        </button>
                        <span className="message-timestamp-inline">{msg.time}</span>
                      </div>
                    </div>
                  )}

                  {/* Message Body Content */}
                  <div className="message-text">
                    {msg.sender === 'bot' ? formatBotText(msg.text) : msg.text}
                  </div>

                  {/* Interactive Action Badges / Deep-Links */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="bot-actions-strip mt-3 pt-2 d-flex flex-wrap gap-2">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          className="btn-bot-action-pro"
                          onClick={() => handleActionClick(act)}
                        >
                          {act.icon && <i className={`bi ${act.icon} me-1`}></i>}
                          <span>{act.label}</span>
                          <i className="bi bi-arrow-up-right ms-1 small opacity-75"></i>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* User message timestamp */}
                  {msg.sender === 'user' && (
                    <span className="message-timestamp">{msg.time}</span>
                  )}
                </div>

                {/* Inline Dynamic Suggestion Chips */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div className="suggestions-pill-group mt-2 d-flex flex-wrap gap-1">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        className="suggestion-chip-btn-pro"
                        onClick={() => handleSendMessage(sug)}
                      >
                        <i className="bi bi-arrow-return-right me-1 text-neon-cyan"></i>
                        <span>{sug}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Real-time Thinking & Synthesizing State */}
          {isTyping && (
            <div className="chat-message-row bot-row">
              <div className="bot-avatar-mini me-2 flex-shrink-0">
                <i className="bi bi-cpu-fill text-neon-cyan"></i>
              </div>
              <div className="bot-bubble-pro typing-indicator-bubble-pro">
                <div className="scanning-laser-line"></div>
                <div className="d-flex align-items-center gap-2">
                  <i className="bi bi-gear-wide-connected text-neon-cyan spin-slow"></i>
                  <span className="small text-neon-cyan code-font fw-bold" style={{ fontSize: '0.78rem' }}>
                    Synthesizing Knowledge Base...
                  </span>
                </div>
                <div className="typing-dots-pro ms-2">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel Bar */}
        <div className="robot-quick-prompts-bar px-3 py-2 border-top border-secondary border-opacity-15 position-relative z-2">
          <div className="quick-prompts-scroll d-flex gap-1">
            {defaultQuickPrompts.map((p, idx) => (
              <button
                key={idx}
                className="btn-quick-prompt-pro"
                onClick={() => handleSendMessage(p.query)}
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Futuristic Cyber Command Input Area */}
        <form
          className="robot-chat-input-area p-2 px-3 border-top border-secondary border-opacity-25 d-flex align-items-center gap-2 position-relative z-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <div className="cyber-input-wrapper position-relative w-100">
            <span className="cyber-prompt-prefix code-font text-neon-cyan">
              &gt;_
            </span>
            <input
              ref={inputRef}
              type="text"
              className="form-control robot-input-field-pro"
              placeholder={isListening ? "Listening... Speak now 🎙️" : "Ask me anything about Tharrun..."}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            {inputValue && (
              <button
                type="button"
                className="btn-clear-input"
                onClick={() => setInputValue('')}
                title="Clear text"
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>

          {/* Voice Input Microphone Button */}
          <button
            type="button"
            className={`btn-voice-input ${isListening ? 'listening' : ''}`}
            onClick={toggleSpeechRecognition}
            title={isListening ? "Listening... Click to stop" : "Speak to AI (Voice Input)"}
            aria-label="Voice input"
          >
            <i className={`bi ${isListening ? 'bi-mic-fill text-danger' : 'bi-mic'}`}></i>
            {isListening && <span className="mic-pulse-ring"></span>}
          </button>

          {/* Send Action Button */}
          <button
            type="submit"
            className="btn-robot-send-pro"
            disabled={!inputValue.trim() || isTyping}
            aria-label="Send Message"
            title="Send Query"
          >
            <i className="bi bi-send-fill"></i>
          </button>
        </form>

        {/* Micro Footer Indicator */}
        <div className="robot-chat-footer-note py-1 px-3 text-center border-top border-secondary border-opacity-10 position-relative z-2">
          <span className="text-white-50 code-font" style={{ fontSize: '0.62rem' }}>
            🔒 100% Client-Side Neural AI • Zero External API • Instant Latency
          </span>
        </div>

      </div>

    </div>
  );
};

export default RobotAssistant;
