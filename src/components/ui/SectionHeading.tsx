import { motion } from 'motion/react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light }: SectionHeadingProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`text-5xl md:text-6xl lg:text-7xl font-serif mb-4 ${light ? 'text-cream' : 'text-forest'}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`font-sans uppercase tracking-widest text-sm ${light ? 'text-cream/70' : 'text-forest/70'}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
