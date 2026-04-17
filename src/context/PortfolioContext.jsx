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
    yearsOfExperience: 2,
    projectsDone: 15,
    location: 'Malaysia',
    role: 'Frontend & Full Stack Developer',
    education: "Bachelor's in Computer Science",
    languages: 'English, Malay, Arabic',
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
  ],

  // Contact
  contact: {
    email: 'muhibnabil7@gmail.com',
    phone: '+60 11-2805 4367',
    location: 'Malaysia',
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
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🚀',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description:
        'A fully featured e-commerce web application with product listings, cart functionality, user authentication, and payment integration. Built with React and a Node.js backend.',
      gradientStart: '#f59e0b',
      gradientEnd: '#ef4444',
      accentColor: '#f59e0b',
      tags: 'React, Node.js, MongoDB, Stripe',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '#',
      emoji: '🛒',
      isFeatured: true,
    },
    {
      id: 3,
      title: 'Ajwah Cultural Council Website',
      description:
        'A professional multi-lingual cultural council website with RTL Arabic support, animated hero sections, a news CMS, and a modern dark teal aesthetic. Built with Next.js App Router.',
      gradientStart: '#10b981',
      gradientEnd: '#059669',
      accentColor: '#10b981',
      tags: 'Next.js, i18n, RTL, TypeScript',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '',
      emoji: '🌐',
      isFeatured: false,
    },
    {
      id: 4,
      title: 'Task Management App',
      description:
        'A full-stack task management application with drag-and-drop boards, user roles, and deadline tracking. Inspired by tools like Trello and Notion.',
      gradientStart: '#7c3aed',
      gradientEnd: '#4f46e5',
      accentColor: '#7c3aed',
      tags: 'React, Django, PostgreSQL',
      githubUrl: 'https://github.com/Muhib-2',
      liveUrl: '',
      emoji: '📋',
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
