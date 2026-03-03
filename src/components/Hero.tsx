import { motion, useScroll, useTransform, useAnimation } from 'motion/react';
import { useRef, useEffect } from 'react';
import { ShinyButton } from './ui/shiny-button';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  const titleControls = useAnimation();
  const subtitleControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    const timer = setTimeout(() => {
      titleControls.start({ opacity: 1, x: 0, transition: { duration: 1.8, ease: [0.25, 0.46, 0.45, 0.94] } });
      subtitleControls.start({ opacity: 1, x: 0, transition: { duration: 1.8, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } });
      buttonControls.start({ opacity: 1, y: 0, transition: { duration: 1.2, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] } });
    }, 2400);
    return () => clearTimeout(timer);
  }, [titleControls, subtitleControls, buttonControls]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0 z-0 organic-mask" style={{ y: bgY }}>
        <img
          src="/Hero.webp"
          alt="Garten- und Landschaftsbau von Osinski GaLaBau Berlin"
          className="w-full h-full object-cover opacity-80"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-forest/40 mix-blend-multiply"></div>
      </motion.div>

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 text-center px-4 section-container mt-20 lg:mt-0"
      >
        <h1 className="text-6xl md:text-7xl lg:text-[7rem] font-serif leading-tight mb-6 drop-shadow-lg" style={{ color: '#F0E6D3' }}>
          <motion.span
            initial={{ opacity: 0, x: '-30vw' }}
            animate={titleControls}
            className="block"
          >
            Ihr Außenraum. Unsere Leidenschaft.
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0, x: '30vw' }}
          animate={subtitleControls}
          className="text-3xl md:text-4xl lg:text-5xl font-serif italic font-light mb-10 drop-shadow-lg"
          style={{ color: '#E8DFD0' }}
        >
          Garten- und Landschaftsbau in Berlin seit 2004.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={buttonControls}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:mt-20"
        >
          <ShinyButton onClick={() => scrollTo('contact')}>
            Beratung anfragen
          </ShinyButton>
          <ShinyButton onClick={() => scrollTo('portfolio')}>
            Referenzen ansehen
          </ShinyButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
