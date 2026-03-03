import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';

export default function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[100] bg-forest flex flex-col items-center justify-center gap-4 md:gap-6 px-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-40 h-40 md:w-56 md:h-56"
          >
            <img
              src="/logo.png"
              alt="Osinski GaLaBau"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-24 md:w-32 h-0.5 bg-bronze/50 origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
