import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
}

interface ServiceModalProps {
  service: ServiceData | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] bg-forest/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-cream rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/30 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-cream/20 backdrop-blur-sm border border-cream/30 flex items-center justify-center cursor-pointer hover:bg-cream/40 transition-colors"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
              <div className="absolute bottom-6 left-8">
                <p className="text-bronze font-sans text-xs uppercase tracking-widest mb-2">{service.subtitle}</p>
                <h3 className="text-4xl md:text-5xl font-serif text-cream">{service.title}</h3>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <p className="text-forest/80 font-sans leading-relaxed text-lg mb-8">
                {service.description}
              </p>

              <h4 className="text-xl font-serif text-forest mb-4">Unsere Leistungen umfassen</h4>
              <ul className="space-y-3 mb-10">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-bronze mt-1 flex-shrink-0" />
                    <span className="text-forest/80 font-sans text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }, 300);
                }}
                className="btn-premium px-8 py-4 bg-forest text-cream font-sans text-sm uppercase tracking-wider rounded-full border border-forest cursor-pointer"
              >
                Beratung anfragen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
