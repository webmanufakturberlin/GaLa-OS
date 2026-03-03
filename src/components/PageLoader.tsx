import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-forest flex flex-col items-center justify-center gap-5 px-8"
        >
          {/* Favicon / Tab-Icon der Originalseite */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[55vw] h-[55vw] max-w-[260px] md:max-w-[320px]"
          >
            <img
              src="/favicon-loader.png"
              alt="Osinski GaLaBau"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Firmenname */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl font-serif text-cream text-center leading-snug"
          >
            Osinski
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="text-xs sm:text-sm font-sans text-cream/50 uppercase tracking-[0.2em] text-center"
          >
            Garten- und Landschaftsbau · seit 2004
          </motion.p>

          {/* Progress bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-24 md:w-32 h-0.5 bg-bronze/50 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
