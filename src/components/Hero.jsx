import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from 'react';
import { HiArrowDownTray, HiEnvelope } from 'react-icons/hi2';
import { FaGithub, FaLinkedinIn, FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import muhibImg from '../assets/muhib.png';
import { PORTFOLIO_DATA } from '../context/PortfolioContext';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const iconMap = {
  FaGithub,
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
};

const typingSequence = PORTFOLIO_DATA.typingPhrases.flatMap(p => [p, 2000]);

// Counter namespace — unique to this portfolio
const COUNTER_NS = 'muhib-nabil-portfolio';
const COUNTER_KEY = 'visitors';

function useVisitorCount() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    // Only count once per browser session so page refreshes don't spam the counter
    const alreadyCounted = sessionStorage.getItem('visit_counted');

    const fetchAndIncrement = async () => {
      try {
        const endpoint = alreadyCounted
          ? `https://api.counterapi.dev/v1/${COUNTER_NS}/${COUNTER_KEY}`
          : `https://api.counterapi.dev/v1/${COUNTER_NS}/${COUNTER_KEY}/up`;

        const res = await fetch(endpoint);
        const data = await res.json();
        setCount(data.count ?? data.value ?? null);

        if (!alreadyCounted) sessionStorage.setItem('visit_counted', 'true');
      } catch {
        // Silently fail — don't break the page if the counter API is down
      }
    };

    fetchAndIncrement();
  }, []);

  return count;
}

export default function Hero() {
  const visitorCount = useVisitorCount();

  const stats = [
    { value: `${PORTFOLIO_DATA.about.yearsOfExperience}+`, label: 'Years Experience' },
    { value: `${PORTFOLIO_DATA.about.projectsDone}+`,      label: 'Projects Completed' },
    { value: '5+',                                          label: 'Technologies' },
    { value: '100%',                                        label: 'Dedication' },
    { value: visitorCount !== null ? visitorCount.toLocaleString() : '...', label: '👁️ Portfolio Views' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background layer */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 dot-grid opacity-40" />
        <div className="blob w-[500px] h-[500px] bg-[#00d4ff] top-[-100px] right-[-100px]" />
        <div className="blob w-[600px] h-[600px] bg-[#7c3aed] bottom-[-150px] left-[-150px]" />
        <div className="blob w-[300px] h-[300px] bg-[#00d4ff] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
      </div>

      <div className="container-custom relative z-10 pt-24 pb-16 md:pt-32">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <span className="section-badge">👋 Welcome to my portfolio</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold font-display leading-tight mb-4"
            >
              Hello, I'm{' '}
              <span className="text-gradient block sm:inline">{PORTFOLIO_DATA.name}</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-display font-semibold text-slate-300 mb-6 h-10"
            >
              I'm a{' '}
              <TypeAnimation
                sequence={typingSequence}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="text-gradient"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8"
            >
              {PORTFOLIO_DATA.heroDescription}
            </motion.p>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3 justify-center lg:justify-start mb-8"
            >
              {PORTFOLIO_DATA.socials.map(({ id, label, href, icon }) => {
                const Icon = iconMap[icon];
                return (
                  <a
                    key={id}
                    id={`hero-social-${id}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl glass-card text-slate-400
                      hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:shadow-[0_0_15px_rgba(0,212,255,0.2)]
                      transition-all duration-300 group"
                  >
                    {Icon && <Icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />}
                  </a>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <Link to="contact" smooth={true} duration={600} offset={-80}>
                <button id="hero-hire-me" className="btn-primary">
                  <HiEnvelope className="w-4 h-4" />
                  Hire Me
                </button>
              </Link>
              <a href={PORTFOLIO_DATA.cvUrl} download id="hero-download-cv" className="btn-outline">
                <HiArrowDownTray className="w-4 h-4" />
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex-shrink-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="relative animate-float">
              <div className="absolute inset-[-16px] rounded-full bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 blur-xl animate-pulse-slow" />
              <div className="profile-ring" style={{ width: 280, height: 280 }}>
                <img
                  src={muhibImg}
                  alt="Muhib – Full Stack Developer"
                  className="w-full h-full rounded-full object-cover object-top"
                  style={{ width: '272px', height: '272px' }}
                />
              </div>
              <div className="absolute inset-[-8px] rounded-full border border-[#00d4ff]/20 animate-spin-slow" />
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2
                  bg-[#111118] border border-white/[0.08] rounded-full px-4 py-2 shadow-card whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">Available for work</span>
              </motion.div>

              {/* Orbiting skill badges */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none hidden sm:flex">
                <motion.div
                  className="relative w-[380px] h-[380px] rounded-full border border-white/[0.05]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 bg-[#111118]/80 backdrop-blur-md border-[#61dafb]/20"
                    >
                      <span className="text-base">⚛️</span>
                      <span className="text-xs text-slate-200 font-semibold tracking-wide">React</span>
                    </motion.div>
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 bg-[#111118]/80 backdrop-blur-md border-[#06b6d4]/20"
                    >
                      <span className="text-base">🎨</span>
                      <span className="text-xs text-slate-200 font-semibold tracking-wide">Tailwind</span>
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 bg-[#111118]/80 backdrop-blur-md border-white/20"
                    >
                      <span className="text-base">⚡</span>
                      <span className="text-xs text-slate-200 font-semibold tracking-wide">Next.js</span>
                    </motion.div>
                  </div>
                  <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                      className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 bg-[#111118]/80 backdrop-blur-md border-[#3178c6]/20"
                    >
                      <span className="text-base">📘</span>
                      <span className="text-xs text-slate-200 font-semibold tracking-wide">TypeScript</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <motion.div
          className="mt-4 md:mt-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* ── Premium Spinning Laser Border Stats Bar ── */}
          <div className="relative rounded-2xl p-[2px]" style={{ isolation: 'isolate' }}>

            {/* Layer 1: ambient blurred glow behind card */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-60"
              style={{
                background: 'conic-gradient(from 0deg, #00d4ff, #7c3aed, #00d4ff, transparent, transparent)',
                filter: 'blur(14px)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            />

            {/* Layer 2: sharp spinning laser border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, #00d4ff 40deg, #7c3aed 80deg, transparent 120deg)',
              }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Card content — dark fill sits on top, leaving only the 2px laser border visible */}
            <div
              className="relative rounded-[14px] overflow-hidden backdrop-blur-sm"
              style={{ background: '#0d1117', zIndex: 1 }}
            >
              <div className="grid grid-cols-2 lg:grid-cols-5 divide-x divide-y lg:divide-y-0 divide-white/[0.06]">
                {stats.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    className="flex flex-col items-center justify-center py-6 px-4 gap-1
                      hover:bg-white/[0.03] transition-colors duration-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <span className="text-3xl md:text-4xl font-bold font-display text-gradient">
                      {value}
                    </span>
                    <span className="text-xs md:text-sm text-slate-400 text-center">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-slate-500">Scroll down</span>
        <div className="w-5 h-9 border border-white/20 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1 h-2 bg-[#00d4ff] rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
