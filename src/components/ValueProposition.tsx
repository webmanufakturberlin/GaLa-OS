import { motion, useAnimation } from 'motion/react';
import { CheckCircle, MapPin, Leaf, ShieldCheck, UserCheck, Star } from 'lucide-react';
import { useState, useEffect, type Key, type ComponentType } from 'react';
import SectionHeading from './ui/SectionHeading';
import CountUp from './ui/CountUp';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

const iconAnimations: Record<string, { hover: object; tap?: object }> = {
  CheckCircle: {
    hover: { scale: [1, 1.3, 1.1], rotate: [0, 10, -10, 0], transition: { duration: 0.6, ease: 'easeInOut' } },
  },
  MapPin: {
    hover: { y: [0, -14, 0, -6, 0], transition: { duration: 0.7, ease: 'easeOut' } },
  },
  Leaf: {
    hover: { rotate: [0, -20, 15, -10, 5, 0], scale: [1, 1.15, 1], transition: { duration: 0.8, ease: 'easeInOut' } },
  },
  ShieldCheck: {
    hover: { x: [0, -4, 4, -3, 3, 0], transition: { duration: 0.5, ease: 'easeInOut' } },
  },
  Star: {
    hover: { rotate: 360, scale: [1, 1.2, 1], transition: { duration: 0.8, ease: 'easeInOut' } },
  },
  UserCheck: {
    hover: { x: [0, 8, 0], scale: [1, 1.15, 1], transition: { duration: 0.5, ease: 'easeOut' } },
  },
};

const entranceVariants = [
  { initial: { opacity: 0, x: -80, rotate: -5 }, whileInView: { opacity: 1, x: 0, rotate: 0 } },
  { initial: { opacity: 0, y: 60, scale: 0.8 }, whileInView: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, x: 80, rotate: 5 }, whileInView: { opacity: 1, x: 0, rotate: 0 } },
  { initial: { opacity: 0, y: -50, scale: 0.85 }, whileInView: { opacity: 1, y: 0, scale: 1 } },
  { initial: { opacity: 0, x: -60, y: 40 }, whileInView: { opacity: 1, x: 0, y: 0 } },
  { initial: { opacity: 0, scale: 0.7, rotate: -3 }, whileInView: { opacity: 1, scale: 1, rotate: 0 } },
];

const boxes = [
  {
    title: 'Kundenzufriedenheit',
    number: 98,
    suffix: '%',
    desc: 'Zuverlässige Ausführung mit höchstem Qualitätsanspruch bei jedem Projekt – für Kommunen, WBGs und Privatkunden.',
    icon: CheckCircle,
    iconName: 'CheckCircle',
    colSpan: 'md:col-span-2',
    bg: 'bg-cream border-forest/10',
    hoverBg: 'hover:bg-white',
    iconColor: 'text-forest/70',
    accentColor: 'from-forest/5 to-transparent',
  },
  {
    title: 'Jahre Berliner Erfahrung',
    number: 20,
    suffix: '+',
    desc: 'Seit 2004 realisiert Denis Osinski GmbH Garten- und Landschaftsbauprojekte in ganz Berlin mit konstantem Qualitätsanspruch.',
    icon: MapPin,
    iconName: 'MapPin',
    colSpan: 'md:col-span-1',
    bg: 'bg-[#E8DFD0] border-bronze/15',
    hoverBg: 'hover:bg-[#EDE6DA]',
    iconColor: 'text-bronze/70',
    accentColor: 'from-bronze/5 to-transparent',
  },
  {
    title: 'Qualifizierte Fachkräfte',
    number: 30,
    suffix: '',
    desc: 'Ein eingespieltes Team aus Garten-Landschaftsgärtnern, Steinsetzern und Fachleuten – für professionelle Projektumsetzung.',
    icon: Leaf,
    iconName: 'Leaf',
    colSpan: 'md:col-span-1',
    bg: 'bg-cream border-forest/10',
    hoverBg: 'hover:bg-white',
    iconColor: 'text-forest/60',
    accentColor: 'from-forest/5 to-transparent',
  },
  {
    title: 'Auftragsvolumen möglich',
    number: 1,
    suffix: ' Mio. €',
    desc: 'Einzelaufträge bis 1.000.000 € – mit modernster Ausrüstung: 9 Transporter, 7 Radlader, 2 LKW, 4 Hydraulikbagger.',
    icon: ShieldCheck,
    iconName: 'ShieldCheck',
    colSpan: 'md:col-span-1',
    bg: 'bg-[#EDE6DA] border-forest/10',
    hoverBg: 'hover:bg-[#F3EDE4]',
    iconColor: 'text-forest/60',
    accentColor: 'from-forest/5 to-transparent',
  },
  {
    title: 'Professionelle Ausrüstung',
    number: 100,
    suffix: '%',
    desc: 'Alle Fahrzeuge und Maschinen mit grüner Umweltplakette. Nachhaltige und umweltschonende Ausführung aller Projekte.',
    icon: Star,
    iconName: 'Star',
    colSpan: 'md:col-span-1',
    bg: 'bg-cream border-bronze/15',
    hoverBg: 'hover:bg-white',
    iconColor: 'text-bronze/60',
    accentColor: 'from-bronze/5 to-transparent',
  },
  {
    title: 'Persönliche Betreuung',
    number: 1,
    suffix: ' Ansprechpartner',
    desc: 'Dennis Osinski als Geschäftsführer begleitet Ihr Projekt persönlich – von der ersten Idee bis zur fertigen Außenanlage.',
    icon: UserCheck,
    iconName: 'UserCheck',
    colSpan: 'md:col-span-3',
    bg: 'bg-[#E8DFD0] border-forest/10',
    hoverBg: 'hover:bg-[#EDE6DA]',
    iconColor: 'text-forest/60',
    accentColor: 'from-forest/5 to-transparent',
  },
];

function GlowCard({
  box,
  index,
  isMobile,
}: {
  key?: Key;
  box: (typeof boxes)[number];
  index: number;
  isMobile: boolean;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const iconControls = useAnimation();
  const desktopEntrance = entranceVariants[index] || entranceVariants[0];
  const mobileEntrance = { initial: { opacity: 0, y: 30, rotate: 0, scale: 1, x: 0 }, whileInView: { opacity: 1, y: 0, rotate: 0, scale: 1, x: 0 } };
  const entrance = isMobile ? mobileEntrance : desktopEntrance;

  const Icon = box.icon;

  return (
    <div className={box.colSpan}>
      <motion.div
        initial={entrance.initial}
        whileInView={entrance.whileInView}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          const anim = iconAnimations[box.iconName];
          if (anim) iconControls.start(anim.hover as any);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          iconControls.start({ scale: 1, rotate: 0, x: 0, y: 0, transition: { duration: 0.3 } });
        }}
        className={`relative p-6 md:p-10 rounded-3xl ${box.bg} ${box.hoverBg} text-forest border-2 transition-shadow duration-500 w-full h-full flex flex-col justify-between overflow-hidden cursor-default`}
        whileHover={{ y: -8 }}
        style={{
          boxShadow: isHovered
            ? '0 12px 40px rgba(146, 108, 68, 0.15), 0 0 0 1px rgba(146, 108, 68, 0.2)'
            : '0 2px 12px rgba(27, 48, 34, 0.04)',
        }}
      >
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(146,108,68,0.08), transparent 60%)`,
            }}
          />
        )}

        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isHovered ? 'from-bronze via-bronze/60 to-bronze' : 'from-transparent to-transparent'} transition-all duration-500 rounded-t-3xl`} />

        <motion.div
          animate={iconControls}
          className="relative z-10"
        >
          <Icon
            className={`w-8 h-8 md:w-10 md:h-10 mb-4 md:mb-8 ${isHovered ? 'text-bronze' : box.iconColor} transition-colors duration-400`}
            strokeWidth={1.5}
          />
        </motion.div>

        <div className="relative z-10">
          <h3 className="text-xl md:text-3xl font-serif mb-3 md:mb-4 leading-snug text-forest">
            {box.number > 0 && <CountUp end={box.number} suffix={box.suffix} />}
            {box.number > 0 ? ' ' : ''}
            {box.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed text-forest/70">{box.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function ValueProposition() {
  const isMobile = useIsMobile();

  return (
    <section id="about" className="py-16 md:py-24 w-full px-6 md:px-12 lg:px-16 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeading title="Was uns ausmacht" subtitle="Erfahrung trifft Professionalität" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {boxes.map((box, i) => (
            <GlowCard key={i} box={box} index={i} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}
