import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import muhibImg from '../assets/muhib.png';
import { HiCheckBadge } from 'react-icons/hi2';
import { Link } from 'react-scroll';
import { PORTFOLIO_DATA } from '../context/PortfolioContext';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { about } = PORTFOLIO_DATA;

  const facts = [
    { emoji: '📍', label: 'Location',  value: about.location  },
    { emoji: '💼', label: 'Role',      value: about.role      },
    { emoji: '🎓', label: 'Education', value: about.education },
    { emoji: '🌍', label: 'Languages', value: about.languages },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d1117] to-[#0a0a0f]" />
      <div className="blob w-[400px] h-[400px] bg-[#7c3aed] top-0 right-0 opacity-[0.08]" />

      <div className="container-custom relative z-10" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">
            Who I <span className="text-gradient">Am</span>
          </h2>
          <p className="section-subtitle">
            A passionate developer who transforms ideas into exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            className="relative flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="relative w-[300px] sm:w-[360px] rounded-3xl overflow-hidden neon-border shadow-card-hover">
                <img
                  src={muhibImg}
                  alt="Muhib – About"
                  className="w-full h-auto object-cover object-top"
                  style={{ minHeight: '400px', objectPosition: 'top center' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 to-transparent" />
              </div>

              {/* Floating card - Experience */}
              <motion.div
                className="absolute -bottom-6 -right-6 glass-card px-5 py-4 rounded-2xl shadow-card"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <span className="text-2xl font-bold font-display text-gradient block">{about.yearsOfExperience}+</span>
                <span className="text-xs text-slate-400">Year of Experience</span>
              </motion.div>

              {/* Floating card - Projects */}
              <motion.div
                className="absolute -top-6 -left-6 glass-card px-5 py-4 rounded-2xl shadow-card"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <span className="text-2xl font-bold font-display text-gradient block">{about.projectsDone}+</span>
                <span className="text-xs text-slate-400">Projects Done</span>
              </motion.div>

              <div className="absolute inset-[-20px] rounded-3xl border border-[#00d4ff]/10 -z-10" />
              <div className="absolute inset-[-40px] rounded-3xl border border-[#7c3aed]/10 -z-10" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-4">
              {about.introHeading}{' '}
              &amp;{' '}
              <span className="text-gradient">{about.introHeadingHighlight}</span>
            </h3>

            <p className="text-slate-400 leading-relaxed mb-6">
              {about.introDescription}
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {about.highlights.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <HiCheckBadge className="w-5 h-5 text-[#00d4ff] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Quick Facts Grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {facts.map(({ emoji, label, value }) => (
                <div key={label} className="glass-card p-3 rounded-xl flex items-center gap-3">
                  <span className="text-xl">{emoji}</span>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block">{label}</span>
                    <span className="text-sm text-slate-200 font-medium">{value}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 flex-wrap">
              <Link to="contact" smooth={true} duration={600} offset={-80}>
                <button id="about-hire-btn" className="btn-primary">Let's Work Together</button>
              </Link>
              <Link to="projects" smooth={true} duration={600} offset={-80}>
                <button id="about-projects-btn" className="btn-outline">View Projects</button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
