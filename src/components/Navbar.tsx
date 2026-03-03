import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Über uns', target: 'about' },
  { label: 'Leistungen', target: 'leistungen' },
  { label: 'Portfolio', target: 'portfolio' },
  { label: 'Methodik', target: 'process' },
  { label: 'Kontakt', target: 'contact' },
];

const sectionIds = navItems.map((i) => i.target);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const activeSection = useScrollSpy(sectionIds);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/#' + id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full
          px-2 py-2 hidden md:flex items-center gap-1
          backdrop-blur-xl border transition-all duration-300
          ${scrolled
            ? 'bg-forest/80 border-cream/20 shadow-2xl'
            : 'bg-forest/40 border-cream/10 shadow-lg'
          }`}
      >
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => scrollTo(item.target)}
            className={`relative px-5 py-2.5 rounded-full font-sans text-sm tracking-wide
              transition-colors duration-200 cursor-pointer min-h-[44px]
              ${activeSection === item.target
                ? 'text-cream'
                : 'text-cream/70 hover:text-cream'
              }`}
          >
            {activeSection === item.target && (
              <motion.div
                layoutId="navbar-active"
                className="absolute inset-0 bg-bronze/30 rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        ))}
      </motion.nav>

      {/* Mobile Hamburger */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Menü schließen' : 'Menü öffnen'}
        className={`fixed top-4 right-4 z-50 md:hidden w-12 h-12 rounded-full
          backdrop-blur-xl border flex items-center justify-center cursor-pointer
          transition-all duration-300
          ${scrolled || mobileOpen
            ? 'bg-forest/80 border-cream/20'
            : 'bg-forest/40 border-cream/10'
          }`}
      >
        {mobileOpen ? (
          <X className="w-5 h-5 text-cream" />
        ) : (
          <Menu className="w-5 h-5 text-cream" />
        )}
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-forest/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.target}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollTo(item.target)}
                className={`text-2xl font-serif cursor-pointer
                  ${activeSection === item.target ? 'text-bronze' : 'text-cream/80 hover:text-cream'}
                  transition-colors duration-200`}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
