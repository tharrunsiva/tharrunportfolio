import imgProfile from '../assets/Edited Putrajaya.jpg';
import resumePdf from '../assets/Tharrun_resume__.pdf';
import imgChatbot from '../assets/chatbot.png';
import imgCampusTime from '../assets/campustime.png';
import imgSmartWaste from '../assets/smartwaste.png';
import imgAirline from '../assets/airline.png';
import imgDocking from '../assets/docking.png';
import imgVenture from '../assets/venture.png';
import imgCrm from '../assets/crm.png';
import imgRevivo from '../assets/revivo.png';
import imgVoting from '../assets/voting.png';

// Real Hackathon Photos Uploaded by User
import ibmSurat1 from '../assets/ibmsurat1.jpeg';
import ibmSurat2 from '../assets/ibmsurat2.jpeg';
import ibmSurat3 from '../assets/ibmsurat3.jpeg';
import ibmSurat4 from '../assets/ibmsurat4.jpeg';

import ibmSrcas1 from '../assets/ibmsrcas1.jpeg';
import ibmSrcas2 from '../assets/ibmsrcas2.jpeg';
import ibmSrcas3 from '../assets/ibmsrcas3.jpeg';
import ibmSrcas5 from '../assets/ibmsrcas5.jpeg';
import ibmSrcas6 from '../assets/ibmsrcas6.jpeg';

import zoho1 from '../assets/zoho1.jfif';
import zoho2 from '../assets/zoho2.jfif';
import zoho3 from '../assets/zoho3.jpg';
import zoho4 from '../assets/zoho4.jpg';
import zoho5 from '../assets/zoho5.jpg';

import vivitsu1 from '../assets/vivitsu1.jfif';
import vivitsu2 from '../assets/vivitsu2.jfif';
import vivitsu3 from '../assets/vivitsu3.jfif';

export const personalInfo = {
  name: 'Tharrun Sivakumar',
  shortName: 'Tharrun S',
  tagline: 'MERN Stack Developer • DevOps Enthusiast • Data Analyst',
  roles: [
    'Tharrun S',
    'MERN Stack Developer',
    'DevOps Engineer',
    'Data Analyst'
  ],
  bio: `A passionate MERN Stack Developer and Data Analyst who bridges high-performance backend architecture with sleek, responsive, and intuitive digital interfaces. Experienced in crafting production-ready web apps, building predictive data pipelines, and orchestrating modern DevOps workflows with Docker and CI/CD.`,
  location: 'Coimbatore, Tamil Nadu, India',
  phone: '+91 8220616181',
  rawPhone: '8220616181',
  email: 'tharrunsiva@gmail.com',
  dob: '01 Oct 2006',
  status: 'Available for Opportunities',
  profileImg: imgProfile,
  resumeUrl: resumePdf,
  socialLinks: {
    github: 'https://github.com/tharrunsiva',
    linkedin: 'https://www.linkedin.com/in/tharrun/',
    instagram: 'https://www.instagram.com/tharrun._.07_/?hl=en',
    whatsapp: 'https://wa.me/918220616181'
  },
  stats: [
    { label: 'Projects Completed', value: '9+', icon: 'bi-grid-1x2-fill' },
    { label: 'Hackathons Attended', value: '7', icon: 'bi-trophy-fill' },
    { label: 'Internships & Roles', value: '4+', icon: 'bi-briefcase-fill' },
    { label: 'Rotaract Leadership', value: '2+ Yrs', icon: 'bi-award-fill' }
  ]
};

export const hackathonsData = [
  {
    id: 'ibm-national-surat',
    title: 'IBM National Hackathon Finals',
    category: 'IBM Hackathon',
    isNational: true,
    award: '🏆 4th Place (All-India) & National Finalist',
    awardBadgeClass: 'badge-gold',
    venue: 'Auro University, Surat, Gujarat',
    duration: '12 Hours Sprint',
    projectTitle: 'Multilingual Shopping Chatbot for IBM',
    description: 'Developed an AI-powered conversational e-commerce engine enabling real-time voice and text shopping assistance across all major regional Indian languages. Secured 4th Place all across India among premier institutions.',
    keyHighlights: [
      'Engineered real-time NLP translation & intent recognition pipeline',
      'Integrated voice-driven regional language commerce interface',
      'Awarded 4th Place all-India ranking at the National Grand Finale'
    ],
    tech: ['React.js', 'Node.js', 'NLP APIs', 'Express', 'MongoDB'],
    photos: [ibmSurat1, ibmSurat2, ibmSurat3, ibmSurat4]
  },
  {
    id: 'ibm-national-srcas',
    title: 'IBM National Hackathon Grand Finals 2.0',
    category: 'IBM Hackathon',
    isNational: true,
    award: '🌟 2x National Finalist (Sole Arts & Science Team)',
    awardBadgeClass: 'badge-purple',
    venue: 'SRCAS, Coimbatore',
    duration: '8 Hours Intensive',
    projectTitle: 'AI Transportation Accident Control Platform',
    description: 'Represented as the ONLY Arts & Science college team in the nation competing among elite engineering colleges across India. Built an intelligent transportation accident prevention dashboard powered by Explainable AI (SHAP).',
    keyHighlights: [
      'Sole Arts & Science college finalists competing against nationwide engineering teams',
      'Explainable AI model integration using SHAP & Python telemetry data',
      'Interactive risk heatmapping and real-time accident alert matrix'
    ],
    tech: ['Python', 'SHAP AI', 'React.js', 'Data Analytics', 'Flask'],
    photos: [ibmSrcas1, ibmSrcas2, ibmSrcas3, ibmSrcas5, ibmSrcas6]
  },
  {
    id: 'ibm-intercollege-srcas',
    title: 'IBM Intercollege Hackathon',
    category: 'IBM Hackathon',
    isNational: false,
    award: '🥇 1st Place Winner in College & Promoted to Nationals',
    awardBadgeClass: 'badge-green',
    venue: 'SRCAS, Coimbatore',
    duration: '12 Hours',
    projectTitle: 'Smart Voting Platform with High Privacy Settings',
    description: 'Engineered a tamper-resistant digital voting portal with multi-factor voter authentication and encrypted ballot mechanisms. Captured 1st Place in the college and advanced to the IBM National Finals.',
    keyHighlights: [
      'Won 1st Place overall in the college competition',
      'Promoted directly to represent at the National IBM Hackathon',
      'Cryptographically secured voting tallies with real-time audit dashboards'
    ],
    tech: ['Django', 'Python', 'PostgreSQL', 'Chart.js', 'Security Protocols'],
    photos: [] // No photos for intercollege hackathon as requested
  },
  {
    id: 'zoho-chennai',
    title: 'Zoho Hackathon',
    category: 'Zoho Hackathon',
    isNational: true,
    award: '🚀 Grand Finalist @ Zoho HQ Campus',
    awardBadgeClass: 'badge-blue',
    venue: 'Zoho Campus, Chennai',
    duration: '24 Hours Endurance',
    projectTitle: 'AI Molecular Docking Predictor',
    description: 'Selected to the finals after rigorous ideation pitching. Created an AI computational biology platform for molecular docking analysis at the Zoho Campus, evaluating protein-ligand binding affinities for drug discovery.',
    keyHighlights: [
      'Selected among top teams to build and pitch live at Zoho HQ in Chennai',
      '24-hour sprint engineering molecular binding affinity predictor algorithms',
      'Gained high-impact industry mentorship from Zoho core engineers'
    ],
    tech: ['Python', 'Bioinformatics', 'NumPy', 'Scikit-Learn', 'FastAPI'],
    photos: [zoho1, zoho2, zoho3, zoho4, zoho5]
  },
  {
    id: 'ibm-selection-srcas',
    title: 'IBM Intercollege Hackathon Selection Test',
    category: 'IBM Hackathon',
    isNational: false,
    award: '🥇 1st Place Winner & Direct National Qualifier',
    awardBadgeClass: 'badge-green',
    venue: 'SRCAS, Coimbatore',
    duration: 'Competitive Hackathon',
    projectTitle: 'Innovative Full-Stack AI Solution',
    description: 'Delivered an agile software prototype during the qualifying round, clinching 1st Place and sealing the official nomination for the IBM National Hackathon.',
    keyHighlights: [
      '1st Place prize winner in the qualifying sprint',
      'Demonstrated rapid prototyping and system architecture prowess'
    ],
    tech: ['MERN Stack', 'REST APIs', 'Database Design'],
    photos: [] // No photos for intercollege hackathon as requested
  },
  {
    id: 'vivitsu-grit',
    title: 'Vivitsu Hackathon - GRIT',
    category: 'Open Hackathon',
    isNational: false,
    award: '💡 Platform Deployment & Jury Showcase',
    awardBadgeClass: 'badge-cyan',
    venue: 'GRIT, Hyderabad',
    duration: 'Full Hackathon',
    projectTitle: 'Venture Matching Platform',
    description: 'Built and pitched a matchmaking ecosystem connecting early-stage startups with venture capitalists and angel investors based on stage, vertical, and funding criteria.',
    keyHighlights: [
      'Heuristic algorithm for deal flow matchmaking',
      'Live presentation and prototype deployment in Hyderabad'
    ],
    tech: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    photos: [vivitsu1, vivitsu2, vivitsu3]
  },
  {
    id: 'multiverse-mkce',
    title: 'Multiverse 30-Hour Hackathon',
    category: 'Endurance Hackathon',
    isNational: false,
    award: '⚡ 30-Hour Rapid Build & IoT Telemetry',
    awardBadgeClass: 'badge-amber',
    venue: 'MKCE, Karur',
    duration: '30 Hours Non-Stop',
    projectTitle: 'Metropolitan Bus Crowd Management System',
    description: 'Endurance 30-hour hackathon project building a real-time smart bus occupancy tracking and crowd optimization platform for major urban transit networks.',
    keyHighlights: [
      '30-hour uninterrupted software engineering sprint',
      'Predictive route loading and passenger distribution dashboard'
    ],
    tech: ['React.js', 'Python', 'IoT Simulation', 'Analytics'],
    photos: [] // No photo section for Multiverse hackathon as requested
  }
];

export const servicesData = [
  {
    id: 1,
    title: 'Full-Stack MERN Development',
    icon: 'bi-layers-half',
    color: 'var(--accent-cyan)',
    desc: 'Architecting scalable single-page applications with React.js, Express APIs, secure Node.js microservices, and MongoDB schema design.'
  },
  {
    id: 2,
    title: 'Data Analytics & Power BI',
    icon: 'bi-graph-up-arrow',
    color: 'var(--accent-purple)',
    desc: 'Transforming raw datasets into executive visual dashboards, predictive machine learning models, and actionable business insights using Python and SQL.'
  },
  {
    id: 3,
    title: 'DevOps & Containerization',
    icon: 'bi-boxes',
    color: 'var(--accent-green)',
    desc: 'Deploying reliable containerized applications with Docker, automated CI/CD pipelines, version control management, and cloud hosting.'
  },
  {
    id: 4,
    title: 'UI/UX & Interactive Design',
    icon: 'bi-palette-fill',
    color: 'var(--accent-amber)',
    desc: 'Designing user-first wireframes in Figma, crafting pixel-perfect responsive layouts, and engineering fluid animations.'
  }
];

export const certificationsData = [
  {
    id: 1,
    title: 'IBM Hackathon 4th Place & 2x National Finalist',
    issuer: 'IBM Academic Hackathon Initiative',
    category: 'AI & Conversational Commerce',
    icon: 'bi-trophy-fill',
    color: 'var(--accent-cyan)',
    highlight: 'All-India 4th Place',
    desc: 'Recognized nationwide for developing the Multilingual Shopping Chatbot (Surat) and AI Transportation Safety Platform (SRCAS).'
  },
  {
    id: 2,
    title: 'Zoho Hackathon Finalist',
    issuer: 'Zoho Corporation, Chennai Campus',
    category: 'Biomedical AI & Full Stack',
    icon: 'bi-cpu-fill',
    color: 'var(--accent-blue)',
    highlight: 'Zoho HQ Finalist',
    desc: 'Selected to pitch and engineer the AI Molecular Docking Predictor live at the Zoho Chennai Headquarters.'
  },
  {
    id: 3,
    title: 'MERN Stack & DevOps Certification',
    issuer: 'Vinsup Skill Academy',
    category: 'Full Stack Engineering',
    icon: 'bi-award-fill',
    color: 'var(--accent-purple)',
    highlight: 'Advanced Training',
    desc: 'Comprehensive practical training covering React, Node.js, Express, MongoDB, Docker containerization, and Git pipelines.'
  },
  {
    id: 4,
    title: 'Data Analyst Internship Credential',
    issuer: 'Edu Tantr, Bangalore',
    category: 'Data Science & BI',
    icon: 'bi-bar-chart-fill',
    color: '#f43f5e',
    highlight: 'Industry Experience',
    desc: 'Hands-on production dataset analysis, statistical modeling, and interactive visualization using Python and Power BI.'
  }
];

export const skillsData = [
  {
    category: 'MERN & Full Stack',
    icon: 'bi-layers-half',
    skills: [
      { name: 'React.js', level: 90, icon: 'bi-code-slash', desc: 'Hooks, Redux, Context API, Vite, Router' },
      { name: 'Node.js & Express.js', level: 88, icon: 'bi-hdd-network', desc: 'REST APIs, Middleware, Auth, Microservices' },
      { name: 'MongoDB & Mongoose', level: 92, icon: 'bi-database-fill-gear', desc: 'Schema Design, Aggregations, Indexing' },
      { name: 'HTML5 / CSS3 / JavaScript', level: 95, icon: 'bi-filetype-html', desc: 'Modern ES6+, Responsive Design, Flexbox/Grid' },
      { name: 'Bootstrap & Modern CSS', level: 92, icon: 'bi-palette', desc: 'Component Design, Rapid Prototyping' }
    ]
  },
  {
    category: 'Data Analytics & ML',
    icon: 'bi-graph-up-arrow',
    skills: [
      { name: 'Python (Pandas, NumPy)', level: 86, icon: 'bi-filetype-py', desc: 'Data Wrangling, Analytics, Model Training' },
      { name: 'SQL & Relational DBMS', level: 88, icon: 'bi-database', desc: 'Complex Queries, Joins, Normalization' },
      { name: 'Power BI & Dashboards', level: 85, icon: 'bi-bar-chart-line', desc: 'Data Modeling, DAX, Interactive Reports' },
      { name: 'Data Mining & AI Algorithms', level: 82, icon: 'bi-cpu', desc: 'Clustering, Classification, Regression' }
    ]
  },
  {
    category: 'DevOps, Tools & UI/UX',
    icon: 'bi-gear-wide-connected',
    skills: [
      { name: 'Docker & Containerization', level: 80, icon: 'bi-box-seam', desc: 'Container Builds, Compose, Deployment' },
      { name: 'Git & GitHub Workflows', level: 92, icon: 'bi-git', desc: 'Branching, CI/CD Actions, PR Reviews' },
      { name: 'UI/UX Design (Figma)', level: 90, icon: 'bi-vector-pen', desc: 'Wireframing, Prototyping, Design Systems' },
      { name: 'Graphic Design & Media', level: 94, icon: 'bi-image', desc: 'Brand Identity, Posters, Vector Graphics' }
    ]
  }
];

export const projectsData = [
  {
    id: 'crm',
    title: 'Vinsup Skill Academy - CRM',
    tagline: 'Enterprise Employee Workflow & Payroll Automation Suite',
    category: 'Full Stack',
    categoryBadge: 'MERN Stack',
    image: imgCrm,
    description: 'An end-to-end full-stack Enterprise CRM system built to streamline training academy operations. Automates employee management, attendance, and automated digital ID card and salary payslip generation with PDF export.',
    features: [
      'Automated digital ID card & payslip generation engine',
      'Role-based Access Control (Admin, Trainer, Staff)',
      'Employee attendance & workload analytics tracking',
      'MongoDB database with secured RESTful endpoints'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap 5', 'REST API'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: 'https://crm-frontend-tawny-five.vercel.app',
    featured: true,
    highlight: 'Production CRM'
  },
  {
    id: 'revivo',
    title: 'Revivo - AI Donation & Lease Hub',
    tagline: 'Smart Circular Economy & Peer-to-Peer Sharing Platform',
    category: 'AI & Full Stack',
    categoryBadge: 'AI + MERN',
    image: imgRevivo,
    description: 'An AI-powered sustainable platform enabling users to donate, borrow, and lease items. Integrates intelligent item categorization, real-time donor-recipient chat, and location-based item matching.',
    features: [
      'Smart item image classification and automated tagging',
      'Real-time messaging between donors and recipients',
      'Geographic proximity filtering for item pickups',
      'Impact tracker measuring sustainability & items saved'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'AI API'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: true,
    highlight: 'AI Powered'
  },
  {
    id: 'venture-matching',
    title: 'Venture Matching',
    tagline: 'Intelligent Startup-to-Investor Connection Platform (Vivitsu Hackathon)',
    category: 'Full Stack',
    categoryBadge: 'Vivitsu Hackathon',
    image: imgVenture,
    description: 'A matchmaking ecosystem bridging promising startups with venture capitalists and angel investors based on funding stage, sector affinity, ticket size, and strategic objectives. Developed at Vivitsu Hackathon, Hyderabad.',
    features: [
      'Intelligent heuristic matching algorithm for deal flow',
      'Pitch deck and financials showcase with secure viewing',
      'Direct investor inquiry and scheduling pipeline',
      'Real-time startup milestone tracker'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind/CSS'],
    githubUrl: 'https://github.com/supraja2706/ventormatch',
    liveUrl: 'https://venturematches.netlify.app/',
    featured: true,
    highlight: 'Vivitsu Hackathon'
  },
  {
    id: 'smart-voting',
    title: 'Smart Voting Portal',
    tagline: 'Cryptographically Secure Digital Election Platform (IBM Hackathon Winner)',
    category: 'Systems & Security',
    categoryBadge: 'IBM 1st Place Winner',
    image: imgVoting,
    description: 'A robust and tamper-resistant digital voting platform engineered with Django, featuring multi-factor voter authentication, encrypted ballot transmission, and live real-time election result dashboards. Won 1st Place in IBM Intercollege Hackathon.',
    features: [
      'Multi-factor voter verification system',
      'Encrypted ballot storage preventing double voting',
      'Real-time vote tallies with interactive visual charts',
      'Audit logs and administrative oversight console'
    ],
    tech: ['Django', 'Python', 'SQLite / PostgreSQL', 'Bootstrap 5', 'Chart.js'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: false,
    highlight: 'IBM 1st Place'
  },
  {
    id: 'multilingual-chatbot',
    title: 'Multilingual Shopping Chatbot',
    tagline: 'AI Conversational Assistant (IBM National 4th Place)',
    category: 'AI & Full Stack',
    categoryBadge: 'IBM National 4th Place',
    image: imgChatbot,
    description: 'An AI-powered multilingual conversational e-commerce assistant engineered to guide non-English speaking shoppers with personalized recommendations and voice/text assistance. Won 4th Place all-India at the IBM National Hackathon Finals in Surat, Gujarat.',
    features: [
      'Multi-language NLP intent recognition & real-time translation',
      'Context-aware personalized product recommendation engine',
      'Voice input & synthesized voice feedback assistance',
      'Interactive cart management within the chat UI'
    ],
    tech: ['React.js', 'Node.js', 'NLP APIs', 'Express', 'MongoDB'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: true,
    highlight: 'IBM National 4th Place'
  },
  {
    id: 'molecular-docking',
    title: 'AI Molecular Docking Predictor',
    tagline: 'Biomedical AI for Drug Discovery (Zoho Hackathon Finalist)',
    category: 'AI & Machine Learning',
    categoryBadge: 'Zoho Campus Finalist',
    image: imgDocking,
    description: 'A scientific AI tool engineered for computational biology to evaluate protein-ligand binding affinities, accelerating preliminary virtual screening in drug discovery. Pitched and built at Zoho Campus, Chennai (24-Hour Hackathon).',
    features: [
      'Molecular structure parsing and energy minimization',
      'Binding affinity score prediction using trained ML models',
      'Interactive 3D chemical structure interaction summary',
      'Batch candidate screening pipeline'
    ],
    tech: ['Python', 'RDKit / BioPython', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: false,
    highlight: 'Zoho Finalist'
  },
  {
    id: 'campus-time-tracker',
    title: 'Campus Time Tracker',
    tagline: 'Academic Task & Schedule Optimization Dashboard',
    category: 'Full Stack',
    categoryBadge: 'Web App',
    image: imgCampusTime,
    description: 'A productivity and schedule management portal built for university students to organize coursework, track project milestones, manage team deadlines, and visualize weekly study analytics.',
    features: [
      'Kanban task management with drag-and-drop workflow',
      'Intelligent deadline alert notifications',
      'Weekly productivity heatmaps and study metrics',
      'Collaborative team assignment boards'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Bootstrap'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: false,
    highlight: 'Productivity Suite'
  },
  {
    id: 'smart-waste',
    title: 'Smart Waste Management System',
    tagline: 'AI/ML Predictive Bin Routing & IoT Dashboard',
    category: 'AI & Machine Learning',
    categoryBadge: 'Machine Learning',
    image: imgSmartWaste,
    description: 'An IoT and Machine Learning solution predicting urban waste container fill levels, optimizing municipal truck collection routes, and visualizing city cleanliness KPIs via interactive dashboards.',
    features: [
      'Predictive machine learning model for fill-level forecasting',
      'Shortest-path truck routing optimization algorithm',
      'Live IoT bin sensor telemetry simulation',
      'Carbon emission reduction insights report'
    ],
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'Flask/Streamlit', 'Folium'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: false,
    highlight: 'IoT & ML'
  },
  {
    id: 'airline-analytics',
    title: 'Airline Analytical Dashboard',
    tagline: 'Business Intelligence & Aviation KPI Intelligence Suite',
    category: 'Data Analytics',
    categoryBadge: 'Power BI & Analytics',
    image: imgAirline,
    description: 'An executive analytics dashboard developed in Power BI and Python to uncover flight delay patterns, route profitability, customer satisfaction metrics, and seasonal demand fluctuations.',
    features: [
      'Interactive drill-through visualizations across 100K+ flights',
      'Delay causality decomposition and prediction metrics',
      'Route profitability and load factor heatmaps',
      'Automated DAX formulas for dynamic KPI benchmarking'
    ],
    tech: ['Power BI', 'Python', 'Pandas', 'DAX', 'SQL Data Modeling'],
    githubUrl: 'https://github.com/tharrunsiva',
    liveUrl: '#',
    featured: false,
    highlight: 'BI Dashboard'
  }
];

export const timelineData = [
  {
    id: 1,
    title: 'B.Sc Computer Science',
    organization: 'Sri Ramakrishna College of Arts and Science (SRCAS)',
    location: 'Coimbatore, Tamil Nadu',
    period: '2024 - Present (Semester V)',
    type: 'education',
    icon: 'bi-mortarboard-fill',
    color: 'var(--accent-cyan)',
    summary: 'Pursuing foundational and advanced computer science disciplines with high academic dedication.',
    bullets: [
      'Core focus on Database Management Systems (DBMS), Data Mining, Data Structures & Algorithms, and Full-Stack Web Technologies.',
      'Active developer and participant in technical symposiums, hackathons, and software clubs.',
      'Building practical projects combining software engineering and analytical problem-solving.'
    ]
  },
  {
    id: 2,
    title: 'MERN Stack Development & DevOps Engineering',
    organization: 'Vinsup Skill Academy',
    location: 'Coimbatore, Tamil Nadu',
    period: 'May 2026 - Present',
    type: 'work',
    icon: 'bi-code-square',
    color: 'var(--accent-purple)',
    summary: 'Immersive industrial training and hands-on software development across the entire MERN stack and DevOps toolchains.',
    bullets: [
      'Architecting real-world web applications using React.js, Node.js, Express, and MongoDB.',
      'Developed and deployed the Academy Enterprise CRM system for employee management and payslip automation.',
      'Mastering containerization with Docker, CI/CD automation pipelines, Git workflows, and Linux environments.'
    ]
  },
  {
    id: 3,
    title: 'Secretary Communication',
    organization: 'Rotaract Club of Coimbatore Changemakers',
    location: 'Coimbatore, Tamil Nadu',
    period: 'July 2026 - Present',
    type: 'leadership',
    icon: 'bi-broadcast',
    color: 'var(--accent-green)',
    summary: 'Directing communication strategy, official correspondence, and brand outreach for district-level community initiatives.',
    bullets: [
      'Leading club public relations, event promotions, newsletter creation, and media communications.',
      'Coordinating cross-functional team initiatives to drive community impact and humanitarian projects.',
      'Cultivating leadership, executive communication, and high-impact stakeholder management.'
    ]
  },
  {
    id: 4,
    title: 'Data Analyst Intern',
    organization: 'Edu Tantr',
    location: 'Bangalore, Karnataka',
    period: 'April 2026 - May 2026 (2 Months)',
    type: 'work',
    icon: 'bi-bar-chart-fill',
    color: '#f43f5e',
    summary: 'Delivered quantitative analysis and interactive visual reporting on live production datasets.',
    bullets: [
      'Cleaned, transformed, and modeled large multi-dimensional datasets using Python (Pandas/NumPy) and SQL.',
      'Designed executive visual dashboards and KPI summaries to uncover operational bottlenecks.',
      'Extracted actionable insights that enhanced decision-making accuracy for client stakeholders.'
    ]
  },
  {
    id: 5,
    title: 'Club Service Director',
    organization: 'Rotaract Club of SRCAS',
    location: 'Coimbatore, Tamil Nadu',
    period: 'July 2025 - May 2026',
    type: 'leadership',
    icon: 'bi-people-fill',
    color: 'var(--accent-cyan)',
    summary: 'Led member engagement, onboarding pipelines, and organizational dynamics for the college Rotaract chapter.',
    bullets: [
      'Spearheaded club recruitment drives, onboarding over 100+ enthusiastic collegiate members.',
      'Organized large-scale service projects, community workshops, and leadership seminars.',
      'Recognized for exceptional commitment to youth empowerment and team cohesion.'
    ]
  }
];
