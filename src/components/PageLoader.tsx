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
          className="fixed inset-0 z-[100] bg-forest flex flex-col items-center justify-center gap-1 px-8"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-[70vw] max-w-[260px] md:max-w-[320px]"
          >
            <img
              src="/logo.png"
              alt="Osinski GaLaBau"
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="-mt-1 text-xs sm:text-sm font-sans text-cream/50 uppercase tracking-[0.2em] text-center"
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
