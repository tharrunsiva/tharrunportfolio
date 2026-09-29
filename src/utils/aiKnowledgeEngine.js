import {
  personalInfo,
  hackathonsData,
  projectsData,
  skillsData,
  certificationsData,
  timelineData,
  servicesData
} from '../data/portfolioData';

/**
 * Ultra-Intelligent Client-Side NLP Knowledge Engine
 * - Typo tolerance via Levenshtein Distance & Fuzzy Matcher
 * - Family & Personal Details (Father: Sivakumar, DOB: 01 Oct 2006, Location: Coimbatore)
 * - Word Stemming & Synonym Normalization
 * - Weighted Multi-Intent Scoring
 * - 100% Zero-Latency / Zero-API Offline Execution
 */

export const defaultQuickPrompts = [
  { label: '🏆 Top Hackathon Wins', query: 'What hackathons and awards did Tharrun win?' },
  { label: '💻 Featured Projects', query: 'What production projects has Tharrun built?' },
  { label: '🛠️ Tech Stack & Skills', query: 'What technologies and skills do you specialize in?' },
  { label: '🎓 Education & College', query: 'Where did Tharrun study and what degree?' },
  { label: '🎂 Date of Birth & Family', query: 'What is Tharrun\'s date of birth and father\'s name?' },
  { label: '📄 Download Resume', query: 'How can I download Tharrun\'s resume?' },
  { label: '📞 Contact & WhatsApp', query: 'How can I contact Tharrun on WhatsApp or Phone?' }
];

// Levenshtein Distance Algorithm for typo tolerance
const levenshteinDistance = (a, b) => {
  if (!a || !b) return (a || b || '').length;
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
};

// Check if two words are fuzzy equal (allowing 1-2 typos based on length)
const isFuzzyMatch = (word, target) => {
  if (!word || !target) return false;
  if (word === target) return true;
  if (word.includes(target) || target.includes(word)) return true;
  const maxDistance = target.length > 5 ? 2 : 1;
  return levenshteinDistance(word, target) <= maxDistance;
};

// Clean and stem words
const cleanAndTokenize = (text) => {
  const normalized = (text || '')
    .toLowerCase()
    .replace(/[^\w\s]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = normalized.split(' ').filter(Boolean);

  return words.map((w) => {
    if (w.endsWith('ing')) return w.slice(0, -3);
    if (w.endsWith('ed')) return w.slice(0, -2);
    if (w.endsWith('ies')) return w.slice(0, -3) + 'y';
    if (w.endsWith('es')) return w.slice(0, -2);
    if (w.endsWith('s') && w.length > 3) return w.slice(0, -1);
    return w;
  });
};

/**
 * Main Question Answer Router
 */
export const processUserQuery = (userQuery) => {
  const rawQuery = (userQuery || '').toLowerCase().trim();
  const tokens = cleanAndTokenize(userQuery);

  if (!rawQuery || rawQuery.length < 1) {
    return {
      answer: `Hello! I am **THAR-X** (Tharrun's AI Companion) 🤖. Ask me anything about his **Education (SRCAS)**, **Date of Birth & Family**, **Hackathon Wins (IBM, Zoho, MKCE)**, **Projects**, **Skills**, or **Contact Details**!`,
      suggestions: ['🏆 Hackathons', '🎓 Education', '💻 Projects', '🎂 Date of Birth']
    };
  }

  // -------------------------------------------------------------
  // 1. FATHER / MOTHER / PARENTS / FAMILY / FULL NAME
  // -------------------------------------------------------------
  if (
    /(\bfather\b|\bdad\b|\bappa\b|\bpapa\b|\bsivakumar\b|\bparent\b|\bfamily\b|\bmother\b|\bmom\b|\binitial\b|\bfull name\b|\bwhat does s stand for\b)/i.test(rawQuery) ||
    tokens.some((t) => ['father', 'dad', 'parent', 'family', 'mother', 'mom', 'sivakumar', 'initial'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `👨‍👩‍👦 **Family & Personal Identity:**\n\n• **Full Name:** **Tharrun Sivakumar**\n• **Father's Name:** **Sivakumar** (The initial **'S'** in *Tharrun S.* represents his father, Sivakumar)\n• **Family Base:** Coimbatore, Tamil Nadu, India\n• **Values:** Strongly driven by hard work, technology leadership, and continuous innovation.`,
      actions: [
        { label: '👤 View About Profile', type: 'scroll', value: '#about', icon: 'bi-person-fill' },
        { label: '📄 Download Resume', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-pdf-fill' }
      ],
      suggestions: ['🎂 Date of Birth', '🎓 Education & College', '🏆 Top Hackathon Wins']
    };
  }

  // -------------------------------------------------------------
  // 2. DATE OF BIRTH / AGE / BIRTHDAY / DOB
  // -------------------------------------------------------------
  if (
    /(\bdob\b|\bdate of birth\b|\bbirth\s*day\b|\bbday\b|\bbirth\s*date\b|\bborn\b|\bage\b|\bhow old\b|\byear of birth\b)/i.test(rawQuery) ||
    tokens.some((t) => ['dob', 'birthday', 'bday', 'birth', 'born'].includes(t))
  ) {
    return {
      answer: `🎂 **Date of Birth & Age:**\n\n• **Date of Birth:** **${personalInfo.dob}** (01 October 2006)\n• **Age:** 19 Years Old\n• **Birthplace & Current City:** Coimbatore, Tamil Nadu, India\n• **Status:** ${personalInfo.status}`,
      actions: [
        { label: '👤 Read About Me', type: 'scroll', value: '#about', icon: 'bi-person-fill' },
        { label: '📄 Download Resume', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-pdf-fill' }
      ],
      suggestions: ['👨 Father\'s Name', '🎓 Education & College', '🏆 Hackathon Wins']
    };
  }

  // -------------------------------------------------------------
  // 3. EDUCATION / COLLEGE / DEGREE / STUDIES ("where did tharrun study", "which college", "studied", "studying")
  // -------------------------------------------------------------
  if (
    /(\bstud\w*|\bcollege\b|\bdegree\b|\beducat\w*|\buniversit\w*|\bsrcas\b|\bramakrishna\b|\bbsc\b|\bschool\b|\bgraduat\w*|\bacadem\w*|\bsemester\b|\bcgpa\b|\bmarks\b)/i.test(rawQuery) ||
    tokens.some((t) => ['study', 'studi', 'college', 'degree', 'educat', 'srcas', 'bsc', 'school', 'academ'].some(k => isFuzzyMatch(t, k)))
  ) {
    const edu = timelineData.find((t) => t.type === 'education') || timelineData[0];
    return {
      answer: `🎓 **Education & Academic Background:**\n\n• **Degree:** **${edu.title}**\n• **Institution:** **${edu.organization}**\n• **Location:** ${edu.location}\n• **Timeline:** ${edu.period}\n\n**Key Focus Areas:**\n• Database Management Systems (DBMS), Data Structures & Algorithms, Data Mining, and Full-Stack Web Development.\n• **Major Distinction:** Represented SRCAS as the **sole Arts & Science college team in India** to qualify for the IBM National Hackathon Grand Finals 2.0!`,
      actions: [
        { label: '🎓 View Education Timeline', type: 'scroll', value: '#education', icon: 'bi-mortarboard-fill' },
        { label: '📄 View Resume (PDF)', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-pdf-fill' }
      ],
      suggestions: ['🏆 Hackathon Awards', '💼 Work Experience', '🛠️ Technical Skills']
    };
  }

  // -------------------------------------------------------------
  // 4. LOCATION / WHERE DOES HE LIVE / CITY / ADDRESS
  // -------------------------------------------------------------
  if (
    /(\bwhere\s+(does|do|is|r)\s+(tharrun|he|you)\s+(live|stay|from|located)\b|\blocation\b|\bcity\b|\baddress\b|\bnative\b|\bstate\b|\bcoimbatore\b)/i.test(rawQuery) ||
    tokens.some((t) => ['locat', 'live', 'stay', 'citi', 'coimbatore', 'address'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `📍 **Location & Base:**\n\nTharrun is based in **${personalInfo.location}**.\n\nHe is open for on-site positions in Coimbatore / Bangalore / Chennai, as well as **remote and hybrid opportunities** worldwide.`,
      actions: [
        { label: '📞 Contact Tharrun', type: 'scroll', value: '#contact', icon: 'bi-geo-alt-fill' },
        { label: '💬 WhatsApp Chat', type: 'link', value: personalInfo.socialLinks.whatsapp, icon: 'bi-whatsapp' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 5. RESUME / CV / DOWNLOAD
  // -------------------------------------------------------------
  if (
    /(\bresume\b|\bcv\b|\bcurriculum\b|\bbiodata\b|\bdownload resume\b|\bprofile pdf\b)/i.test(rawQuery) ||
    tokens.some((t) => ['resum', 'cv', 'biodata', 'curriculum'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `📄 **Tharrun's Official Resume:**\n\nYou can download the verified resume containing his complete technical stack, national hackathon honors, and internship credentials below:`,
      actions: [
        { label: '📄 Download Resume (PDF)', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-earmark-pdf-fill' },
        { label: '📞 Contact Tharrun', type: 'scroll', value: '#contact', icon: 'bi-telephone-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 6. CONTACT / PHONE / WHATSAPP / EMAIL / HIRE
  // -------------------------------------------------------------
  if (
    /(\bwhatsapp\b|\bphone\b|\bmobile\b|\bcall\b|\bcontact\b|\bemail\b|\bmail\b|\bhire\b|\breach\b|\bconnect\b|\bmessage\b|\bnumber\b)/i.test(rawQuery) ||
    tokens.some((t) => ['whatsapp', 'phone', 'mobil', 'contact', 'email', 'hire', 'call', 'number', 'reach'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `📞 **Get in Touch with Tharrun:**\n\n• 📱 **Phone / WhatsApp:** **+91 ${personalInfo.phone}**\n• ✉️ **Email:** **${personalInfo.email}**\n• 📍 **Location:** ${personalInfo.location}\n• ⚡ **Availability:** ${personalInfo.status}`,
      actions: [
        { label: '💬 Open WhatsApp Chat', type: 'link', value: personalInfo.socialLinks.whatsapp, icon: 'bi-whatsapp' },
        { label: '✉️ Send Email', type: 'link', value: `mailto:${personalInfo.email}`, icon: 'bi-envelope-at-fill' },
        { label: '📞 Call Directly', type: 'link', value: `tel:${personalInfo.rawPhone}`, icon: 'bi-telephone-outbound-fill' },
        { label: 'Contact Section', type: 'scroll', value: '#contact', icon: 'bi-chat-dots-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 7. GREETINGS
  // -------------------------------------------------------------
  if (
    /^(hi|hello|hey|namaste|vanakkam|hola|sup|yo|good morning|good evening|good afternoon)(\s+.*)?$/i.test(rawQuery) &&
    tokens.length <= 4
  ) {
    return {
      answer: `Hey there! 👋 I am **THAR-X** (Tharrun's AI Dancing Companion) 🤖. How can I help you today? Ask me anything about his **Hackathons**, **Projects**, **Skills**, **College**, or **Personal Details**!`,
      actions: [
        { label: '🏆 View Hackathons', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' },
        { label: '💻 View Projects', type: 'scroll', value: '#projects', icon: 'bi-grid-fill' }
      ],
      suggestions: ['🏆 Top Hackathon Wins', '🎓 Education & College', '🎂 Date of Birth & Family']
    };
  }

  // -------------------------------------------------------------
  // 8. WHO IS THARRUN / BIO / INTRODUCE
  // -------------------------------------------------------------
  if (
    /(\bwho is tharrun\b|\bwho is he\b|\btell me about tharrun\b|\babout tharrun\b|\bintroduce\b|\bbio\b|\bbackground\b|\bprofile\b|\bsummary\b|\bwho are you\b)/i.test(rawQuery) ||
    (tokens.includes('who') && tokens.some(t => isFuzzyMatch(t, 'tharrun') || isFuzzyMatch(t, 'he')))
  ) {
    return {
      answer: `👨‍💻 **About Tharrun Sivakumar:**\n\n${personalInfo.bio}\n\n• **Roles:** MERN Stack Developer • Data Analyst • DevOps Enthusiast\n• **Father's Name:** Sivakumar\n• **Date of Birth:** 01 Oct 2006 (19 Yrs)\n• **Hackathons:** 7+ Competitive Sprints with 4th place All-India & 1st Place Wins\n• **Leadership:** Rotaract Secretary Communication & Club Service Director`,
      actions: [
        { label: '👤 Read Full About Section', type: 'scroll', value: '#about', icon: 'bi-person-badge-fill' },
        { label: '📄 Download Resume', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-pdf-fill' }
      ],
      suggestions: ['🏆 Hackathon Wins', '💻 Featured Projects', '⚡ Technical Skills']
    };
  }

  // -------------------------------------------------------------
  // 9. HOBBIES / INTERESTS / FREE TIME
  // -------------------------------------------------------------
  if (
    /(\bhobb\w*|\binterest\w*|\bfree time\b|\bpassion\w*|\bfavorite\b|\bleisure\b)/i.test(rawQuery) ||
    tokens.some((t) => ['hobbi', 'hobby', 'interest', 'passion'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `🌟 **Hobbies & Passions:**\n\n• 💻 **Competitive Hackathons:** Scribing rapid code architectures and solving real-world challenges.\n• 🤖 **Exploring AI/ML:** Experimenting with Large Language Models and Explainable AI (SHAP).\n• 🎨 **UI/UX & Graphic Design:** Crafting visual prototypes in Figma and modern glassmorphism web systems.\n• 🤝 **Community Leadership:** Active in collegiate Rotaract initiatives for community impact and youth empowerment.`,
      actions: [
        { label: '🏆 View Hackathons', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' },
        { label: '💻 View Projects', type: 'scroll', value: '#projects', icon: 'bi-grid-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 10. SPECIFIC HACKATHONS RECOGNITION (Fuzzy & Exact)
  // -------------------------------------------------------------
  
  // MKCE Karur Multiverse Hackathon (3rd Place)
  if (
    /(\bmkce\b|\bkarur\b|\bmultiverse\b|\b30\s*hour\w*\b|\bbus crowd\b|\btransit\b|\b3rd place\b)/i.test(rawQuery) ||
    tokens.some((t) => ['mkce', 'karur', 'multivers', 'transit'].some(k => isFuzzyMatch(t, k)))
  ) {
    const hack = hackathonsData.find((h) => h.id === 'multiverse-mkce');
    return {
      answer: `🥉 **${hack.title} (MKCE, Karur)**\n\n• **Award:** **${hack.award}**\n• **Duration:** ${hack.duration}\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}\n\n**Key Achievements:**\n• Won 3rd Place after 30 continuous hours of rapid engineering.\n• Built IoT bus telemetry and real-time crowd distribution algorithms.`,
      actions: [
        { label: '🏆 View MKCE Photos & Details', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // IBM Surat National Finals (4th Place All-India)
  if (
    /(\bsurat\b|\bauro\b|\bgujarat\b|\bmultilingual\b|\bshopping chatbot\b|\b4th place\b|\ball india\b)/i.test(rawQuery) ||
    tokens.some((t) => ['surat', 'auro', 'gujarat', 'multilingu', 'chatbot'].some(k => isFuzzyMatch(t, k)))
  ) {
    const hack = hackathonsData.find((h) => h.id === 'ibm-national-surat');
    return {
      answer: `🏆 **${hack.title} (Surat, Gujarat)**\n\n• **Award:** **${hack.award}**\n• **Venue:** ${hack.venue} (${hack.duration})\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}\n\n**Tech:** ${hack.tech.join(', ')}`,
      actions: [
        { label: '🏆 View Surat Hackathon Photos', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // IBM Selection 2.0 (1st Place Winner)
  if (
    /(\bselection\b|\bselection winner\b|\b2\.0\b|\b2 0\b|\bqualifier\b|\bsrcasselection\b)/i.test(rawQuery) &&
    /(\bibm\b|\bwin\w*\b|\b1st\b|\bfirst\b|\bhack\w*\b)/i.test(rawQuery)
  ) {
    const hack = hackathonsData.find((h) => h.id === 'ibm-selection-srcas');
    return {
      answer: `🥇 **${hack.title}**\n\n• **Award:** **${hack.award}**\n• **Venue:** ${hack.venue}\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}\n\nWon 1st Place to qualify as the premier collegiate team advancing directly to the IBM National Grand Finals 2.0!`,
      actions: [
        { label: '🏆 View Selection Winner Photos', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // IBM Grand Finals 2.0 (Sole Arts & Science Team)
  if (
    /(\bgrand finals\b|\baccident control\b|\bsole arts\b|\bshap ai\b|\btransportation accident\b)/i.test(rawQuery) ||
    (tokens.includes('ibm') && (tokens.includes('final') || tokens.includes('finals') || tokens.includes('srcas')))
  ) {
    const hack = hackathonsData.find((h) => h.id === 'ibm-national-srcas');
    return {
      answer: `🌟 **${hack.title}**\n\n• **Award:** **${hack.award}**\n• **Venue:** ${hack.venue}\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}\n\n**Distinction:** Competed as the *ONLY Arts & Science college team in India* among elite nationwide engineering universities!`,
      actions: [
        { label: '🏆 View Grand Finals 2.0 Photos', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // Zoho Hackathon Chennai HQ
  if (
    /(\bzoho\b|\bchennai\b|\bmolecular docking\b|\bdrug discovery\b|\bzoho campus\b|\bzoho hq\b)/i.test(rawQuery) ||
    tokens.some((t) => ['zoho', 'chennai', 'docking', 'molecular'].some(k => isFuzzyMatch(t, k)))
  ) {
    const hack = hackathonsData.find((h) => h.id === 'zoho-chennai');
    return {
      answer: `🚀 **${hack.title} (Zoho HQ Campus, Chennai)**\n\n• **Award:** **${hack.award}**\n• **Duration:** ${hack.duration}\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}\n\n**Tech:** ${hack.tech.join(', ')}`,
      actions: [
        { label: '🏆 View Zoho Hackathon Photos', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // Vivitsu Hackathon GRIT Hyderabad
  if (
    /(\bvivitsu\b|\bgrit\b|\bhyderabad\b|\bventure matching\b)/i.test(rawQuery) ||
    tokens.some((t) => ['vivitsu', 'grit', 'hyderabad', 'ventur'].some(k => isFuzzyMatch(t, k)))
  ) {
    const hack = hackathonsData.find((h) => h.id === 'vivitsu-grit');
    return {
      answer: `💡 **${hack.title} (GRIT, Hyderabad)**\n\n• **Award:** **${hack.award}**\n• **Project:** **${hack.projectTitle}**\n\n${hack.description}`,
      actions: [
        { label: '🚀 Open Live Venture Matching', type: 'link', value: 'https://venturematches.netlify.app/', icon: 'bi-box-arrow-up-right' },
        { label: '🏆 View Hackathons', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // All Hackathons Overview
  if (
    /(\bhack\w*|\bawards?\b|\bcompetit\w*|\bcontest\b|\btroph\w*|\bwins?\b|\bwon\b|\bachieve\w*)/i.test(rawQuery) ||
    tokens.some((t) => ['hackathon', 'hack', 'award', 'trophi', 'win', 'contest', 'competit'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `🏆 **Tharrun's 7+ Hackathons & Wins:**\n\n1. 🏆 **IBM National Hackathon Finals (Surat, Gujarat)**: 4th Place all-India ranking for Multilingual Shopping Chatbot.\n2. 🌟 **IBM National Grand Finals 2.0 (SRCAS)**: 2x National Finalist (Sole Arts & Science team in India).\n3. 🥇 **IBM Hackathon 2.0 Selection**: 1st Place Winner & Finals Qualifier.\n4. 🚀 **Zoho Hackathon (Chennai HQ Campus)**: Grand Finalist for AI Molecular Docking.\n5. 🥉 **Multiverse 30-Hour Hackathon (MKCE, Karur)**: 3rd Place Winner for Bus Crowd Management.\n6. 🥇 **IBM Intercollege Hackathon (SRCAS)**: 1st Place Winner for Smart Voting Portal.\n7. 💡 **Vivitsu Hackathon (GRIT, Hyderabad)**: Venture Matching platform deployment.`,
      actions: [
        { label: '🏆 View All Hackathons with Photos', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 11. SPECIFIC PROJECTS & APPS
  // -------------------------------------------------------------
  
  // CRM
  if (/(\bcrm\b|\bvinsup crm\b|\bpayslip\b|\bemployee management\b|\bid card\b)/i.test(rawQuery) || tokens.some(t => isFuzzyMatch(t, 'crm') || isFuzzyMatch(t, 'payslip'))) {
    const p = projectsData.find((proj) => proj.id === 'crm');
    return {
      answer: `💼 **${p.title}**\n\n${p.tagline}\n\n${p.description}\n\n**Tech:** ${p.tech.join(', ')}\n**Status:** In active production use!`,
      actions: [
        { label: '🚀 Open Live CRM', type: 'link', value: p.liveUrl, icon: 'bi-box-arrow-up-right' },
        { label: '📂 View Project Details', type: 'scroll', value: '#projects', icon: 'bi-grid-fill' }
      ]
    };
  }

  // Revivo
  if (/(\brevivo\b|\bdonation\b|\blease\b|\bcircular economy\b)/i.test(rawQuery) || tokens.some(t => isFuzzyMatch(t, 'revivo'))) {
    const p = projectsData.find((proj) => proj.id === 'revivo');
    return {
      answer: `♻️ **${p.title}**\n\n${p.tagline}\n\n${p.description}\n\n**Tech:** ${p.tech.join(', ')}`,
      actions: [
        { label: '📂 View in Projects', type: 'scroll', value: '#projects', icon: 'bi-grid-fill' }
      ]
    };
  }

  // Smart Waste
  if (/(\bsmart waste\b|\bwaste\b|\bgarbage\b|\bbin routing\b|\biot waste\b)/i.test(rawQuery) || tokens.some(t => isFuzzyMatch(t, 'waste'))) {
    const p = projectsData.find((proj) => proj.id === 'smart-waste');
    return {
      answer: `🚛 **${p.title}**\n\n${p.tagline}\n\n${p.description}\n\n**Tech:** ${p.tech.join(', ')}`,
      actions: [{ label: '📂 View Projects', type: 'scroll', value: '#projects', icon: 'bi-grid-fill' }]
    };
  }

  // Airline Analytics
  if (/(\bairline\b|\bflight\b|\baviation\b|\bpower bi\b|\bdashboards?\b)/i.test(rawQuery) || tokens.some(t => isFuzzyMatch(t, 'airline'))) {
    const p = projectsData.find((proj) => proj.id === 'airline-analytics');
    return {
      answer: `✈️ **${p.title}**\n\n${p.tagline}\n\n${p.description}\n\n**Tech:** ${p.tech.join(', ')}`,
      actions: [{ label: '📂 View Analytics Project', type: 'scroll', value: '#projects', icon: 'bi-bar-chart-fill' }]
    };
  }

  // All Projects
  if (
    /(\bprojects?\b|\bapps?\b|\bwebsites?\b|\bportfolio\b|\bbuilt\b|\bdevelop\w*|\bworks?\b)/i.test(rawQuery) ||
    tokens.some((t) => ['project', 'app', 'applic', 'system', 'build', 'creat'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `💻 **Tharrun's 9+ Engineered Projects:**\n\n• **Vinsup CRM Suite**: Enterprise staff workflow & automated PDF payslip generation.\n• **Revivo AI Hub**: Circular economy item donation & lease platform.\n• **Venture Matching**: Heuristic startup-to-investor matching engine (Vivitsu Hackathon).\n• **Smart Voting Portal**: Cryptographically secured election portal with MFA (IBM Winner).\n• **Multilingual Chatbot**: Regional voice & text commerce assistant (IBM Surat 4th Place).\n• **AI Molecular Docking Predictor**: Biomedical drug discovery tool (Zoho Finalist).\n• **Smart Waste IoT**: Machine learning predictive bin collection routing.\n• **Airline Analytics**: Executive KPI Power BI flight dashboard.`,
      actions: [
        { label: '📂 Explore Projects Showcase', type: 'scroll', value: '#projects', icon: 'bi-grid-1x2-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 12. SKILLS & TECH STACK
  // -------------------------------------------------------------
  if (
    /(\bskills?\b|\btech\b|\btechnolog\w*|\bstack\b|\blanguages?\b|\bmern\b|\breact\b|\bnode\b|\bexpress\b|\bmongo\b|\bpython\b|\bdocker\b|\bdevops\b|\bsql\b|\bfigma\b|\btools?\b)/i.test(rawQuery) ||
    tokens.some((t) => ['skill', 'stack', 'technolog', 'mern', 'react', 'node', 'mongo', 'python', 'docker', 'devop'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `🛠️ **Technical Arsenal & Expertise:**\n\n• **MERN Full-Stack:** React.js (90%), Node.js (88%), Express.js, MongoDB (92%), RESTful APIs, WebSockets.\n• **Data Analytics & ML:** Python (86% - Pandas, NumPy, Scikit-Learn, SHAP), SQL (88%), Power BI (85% - DAX).\n• **DevOps & Cloud:** Docker & Containerization (80%), CI/CD Pipelines, Git/GitHub (92%), Linux.\n• **UI/UX & Design:** Figma (90%), Modern Glassmorphic CSS, Responsive Layouts.`,
      actions: [
        { label: '🛠️ View Complete Skills Matrix', type: 'scroll', value: '#skills', icon: 'bi-tools' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 13. WORK EXPERIENCE & LEADERSHIP
  // -------------------------------------------------------------
  if (
    /(\bexperien\w*|\bintern\w*|\bjob\b|\bcareer\b|\bwork\w*|\bvinsup\b|\bedu tantr\b|\brotaract\b|\bleadership\b|\bsecretary\b|\bdirector\b)/i.test(rawQuery) ||
    tokens.some((t) => ['experi', 'intern', 'job', 'rotaract', 'vinsup', 'tantr', 'leader'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `💼 **Professional Journey & Leadership Roles:**\n\n1. 💻 **MERN Stack & DevOps Engineer** — Vinsup Skill Academy (May 2026 - Present)\n2. 📊 **Data Analyst Intern** — Edu Tantr, Bangalore (April 2026 - May 2026)\n3. 📢 **Secretary Communication** — Rotaract Club of Coimbatore Changemakers (July 2026 - Present)\n4. 🤝 **Club Service Director** — Rotaract Club of SRCAS (July 2025 - May 2026)`,
      actions: [
        { label: '💼 View Experience Timeline', type: 'scroll', value: '#education', icon: 'bi-clock-history' }
      ]
    };
  }

  // -------------------------------------------------------------
  // 14. CERTIFICATIONS
  // -------------------------------------------------------------
  if (
    /(\bcertificat\w*|\bcredential\w*|\blicens\w*|\baccreditat\w*)/i.test(rawQuery) ||
    tokens.some((t) => ['certif', 'certifi', 'credential', 'licens'].some(k => isFuzzyMatch(t, k)))
  ) {
    return {
      answer: `📜 **Key Certifications:**\n\n1. 🏆 **IBM Hackathon 4th Place & 2x National Finalist** — IBM Academic Initiative\n2. 🚀 **Zoho Hackathon Finalist** — Zoho Corporation Chennai HQ\n3. 💻 **MERN Stack & DevOps Certified** — Vinsup Skill Academy\n4. 📊 **Data Analyst Credential** — Edu Tantr, Bangalore`,
      actions: [
        { label: '📜 View Milestones & Certifications', type: 'scroll', value: '#milestones', icon: 'bi-patch-check-fill' }
      ]
    };
  }

  // -------------------------------------------------------------
  // INTELLIGENT SMART FALLBACK
  // -------------------------------------------------------------
  return {
    answer: `I am here to help with any information about **Tharrun Sivakumar**! Here are key details:\n\n• 👨 **Father's Name:** Sivakumar\n• 🎓 **Education:** B.Sc Computer Science at SRCAS Coimbatore\n• 🎂 **Date of Birth:** 01 October 2006 (19 Yrs Old)\n• 🏆 **Hackathons:** 4th Place All-India IBM Surat, Zoho HQ Finalist, 3rd Place MKCE Karur\n• 💻 **Projects:** Vinsup CRM, Revivo AI, Venture Matching, Smart Voting\n• 📞 **Contact:** +91 ${personalInfo.phone} or ${personalInfo.email}\n\n*Have a specific question not listed? Reach Tharrun directly below!*`,
    actions: [
      { label: '💬 WhatsApp Tharrun', type: 'link', value: personalInfo.socialLinks.whatsapp, icon: 'bi-whatsapp' },
      { label: '🎓 Education', type: 'scroll', value: '#education', icon: 'bi-mortarboard-fill' },
      { label: '🏆 Hackathons', type: 'scroll', value: '#hackathons', icon: 'bi-trophy-fill' },
      { label: '📄 Resume', type: 'download', value: personalInfo.resumeUrl, icon: 'bi-file-pdf-fill' }
    ],
    suggestions: ['👨 Father\'s Name', '🎓 Education & College', '🎂 Date of Birth', '🏆 Top Hackathon Wins']
  };
};
