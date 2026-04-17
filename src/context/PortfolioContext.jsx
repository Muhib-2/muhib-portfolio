import React, { createContext, useContext } from 'react';

// ─── YOUR PERSONAL DATA ─────────────────────────────────────────────────────
// Edit anything here and it will update across the whole website instantly.

export const PORTFOLIO_DATA = {
  // Hero
  name: 'Muhib',
  role: 'Frontend Developer',
  typingPhrases: [
    'Frontend Developer',
    'React & Next.js Engineer',
    'UI/UX Enthusiast',
    'Creative Problem Solver',
  ],
  heroDescription:
    'Passionate full stack developer crafting pixel-perfect, high-performance web experiences. Turning complex ideas into beautiful, intuitive interfaces and robust backend systems with clean code and modern tools.',
  cvUrl: '/muhib-cv.pdf',

  // About
  about: {
    introHeading: 'Full Stack Developer',
    introHeadingHighlight: 'Creative Problem Solver',
    introDescription:
      "Hi! I'm Muhib, a passionate Frontend Developer with a strong eye for design and a love for clean, maintainable code. I specialize in React and Next.js and enjoy crafting experiences that are both visually stunning and technically sound.",
    yearsOfExperience: 1,
    projectsDone: 6,
    location: 'Malaysia (Available Remotely)',
    role: 'Frontend & Full Stack Developer',
    education: "Bachelor's in Computer Science",
    languages: 'English, Arabic',
    highlights: [
      'Building responsive, accessible web applications',
      'Passionate about clean code and best practices',
      'Experience with React, Tailwind, Next.js ecosystem',
      'Strong eye for design and user experience',
    ],
  },

  // Social Links
  socials: [
    { id: 'github',    label: 'GitHub',    href: 'https://github.com/Muhib-2',                                        icon: 'FaGithub'    },
    { id: 'linkedin',  label: 'LinkedIn',  href: 'https://www.linkedin.com/in/muhib-nabil',                           icon: 'FaLinkedinIn'},
    { id: 'facebook',  label: 'Facebook',  href: 'https://www.facebook.com/share/19PMDiG4Du/',                        icon: 'FaFacebookF' },
    { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/muhib24x?igsh=MWc1NGxhbmdwNW80',         icon: 'FaInstagram' },
    { id: 'whatsapp',  label: 'WhatsApp',  href: 'https://wa.me/+601128054367',                                       icon: 'FaWhatsapp'  },
  ],

  // Contact
  contact: {
    email: 'muhibnabil7@gmail.com',
    phone: '+60 11-2805 4367',
    location: 'Malaysia (Available Remotely)',
  },

  // Skills
  skillCategories: [
    {
      name: 'Frontend',
      color: '#00d4ff',
      emoji: '🎨',
      skills: [
        { name: 'React',         level: 90, icon: 'FaReact',             color: '#61dafb' },
        { name: 'Next.js',       level: 85, icon: 'SiNextdotjs',         color: '#ffffff' },
        { name: 'TypeScript',    level: 80, icon: 'SiTypescript',        color: '#3178c6' },
        { name: 'JavaScript',    level: 92, icon: 'SiJavascript',        color: '#f7df1e' },
        { name: 'HTML5',         level: 95, icon: 'FaHtml5',             color: '#e34f26' },
        { name: 'CSS3',          level: 90, icon: 'FaCss3Alt',           color: '#1572b6' },
        { name: 'Tailwind',      level: 88, icon: 'SiTailwindcss',       color: '#06b6d4' },
        { name: 'Framer Motion', level: 75, icon: 'SiFramer',            color: '#0055ff' },
      ],
    },
    {
      name: 'Backend',
      color: '#7c3aed',
      emoji: '⚙️',
      skills: [
        { name: 'Python',   level: 80, icon: 'FaPython',   color: '#3776ab' },
        { name: 'Django',   level: 75, icon: 'SiDjango',   color: '#44b78b' },
        { name: 'Node.js',  level: 70, icon: 'FaNodeJs',   color: '#339933' },
        { name: 'REST API', level: 72, icon: 'SiPostman',  color: '#ff6c37' },
      ],
    },
    {
      name: 'Tools & Cloud',
      color: '#10b981',
      emoji: '🛠️',
      skills: [
        { name: 'Git',        level: 88, icon: 'FaGithub',             color: '#f54d27' },
        { name: 'VS Code',    level: 95, icon: 'SiVisualstudiocode',   color: '#007acc' },
        { name: 'Figma',      level: 75, icon: 'FaFigma',              color: '#f24e1e' },
        { name: 'PostgreSQL', level: 65, icon: 'SiPostgresql',         color: '#336791' },
        { name: 'Vercel',     level: 85, icon: 'SiVercel',             color: '#ffffff' },
      ],
    },
  ],

  // Projects
  projects: [
    {
      id: 1,
      title: 'Muhib Portfolio',
      description:
        'A modern personal portfolio website built with React and Vite. Features a glassmorphism dark design, Framer Motion animations, and smooth scroll navigation between all sections.',
      gradientStart: '#00d4ff',
      gradientEnd: '#7c3aed',
      accentColor: '#00d4ff',
      tags: 'React, Vite, Framer Motion, Tailwind',
      githubUrl: 'https://github.com/Muhib-2/muhib-portfolio',
      liveUrl: 'https://muhib-portfolio.vercel.app',
      emoji: '🚀',
      images: ['muhib-portfolio.png', 'proex.png', 'crafthub.png'],
      isFeatured: true,
    },
    {
      id: 2,
      title: 'ProEx Consulting Corporate Website',
      description:
        'Built a modern corporate website and full-featured admin dashboard. Implemented dynamic content management for services and media, and integrated a backend for real-time CRUD operations.',
      gradientStart: '#f59e0b',
      gradientEnd: '#ef4444',
      accentColor: '#f59e0b',
      tags: 'React, Next.js, Full Stack, Dashboard',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🏢',
      isFeatured: true,
    },
    {
      id: 3,
      title: 'CraftHub Manufacturing System',
      description:
        'Developed a comprehensive manufacturing management system to streamline operations, inventory, and production workflows. Designed for scalability to support real-time business processes.',
      gradientStart: '#3b82f6',
      gradientEnd: '#2563eb',
      accentColor: '#3b82f6',
      tags: 'React, Management System, Scalability',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🏭',
      isFeatured: false,
    },
    {
      id: 4,
      title: 'Ajwah Cultural Council',
      description:
        'Created a modern, fully responsive website to showcase events, media, and community initiatives. Focused intensely on a clean UI and smooth user experience across all devices.',
      gradientStart: '#10b981',
      gradientEnd: '#059669',
      accentColor: '#10b981',
      tags: 'React, Next.js, HTML, CSS, JS',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🌐',
      isFeatured: false,
    },
    {
      id: 5,
      title: 'LanguageHub Platform',
      description:
        'A web-based platform connecting students with native-speaking teachers worldwide. Features a teacher booking system, virtual coin payments, class management, and resource sharing.',
      gradientStart: '#eab308',
      gradientEnd: '#ca8a04',
      accentColor: '#eab308',
      tags: 'HTML, CSS, JavaScript',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🗣️',
      isFeatured: false,
    },
    {
      id: 6,
      title: 'Exciting Project (In Progress)',
      description:
        'A brand new modern web application currently under active development. Stay tuned for innovative features, high performance, and modern design solutions coming very soon!',
      gradientStart: '#6b7280',
      gradientEnd: '#374151',
      accentColor: '#9ca3af',
      tags: 'React, Next.js, Work In Progress',
      githubUrl: '',
      liveUrl: '',
      emoji: '🚧',
      isFeatured: false,
    },
  ],
};

// Keep the context for compatibility (no API calls, just returns static data)
const PortfolioContext = createContext(null);
export const usePortfolioData = () => useContext(PortfolioContext) || {};
export const PortfolioProvider = ({ children }) => (
  <PortfolioContext.Provider value={{}}>
    {children}
  </PortfolioContext.Provider>
);
