import { motion } from 'motion/react';
import { useState, type Key } from 'react';
import { MessageSquare, Monitor, Hammer, Sprout } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';

const steps = [
  {
    title: 'Beratungsgespräch',
    desc: 'Wir hören zu, verstehen Ihre Wünsche und besichtigen Ihr Grundstück vor Ort.',
    icon: MessageSquare,
    img: '/Methodik_1.webp',
    detail: 'Gemeinsam erkunden wir die Möglichkeiten Ihres Gartens und besprechen Ihre Vorstellungen, Ihr Budget und den Zeitrahmen.',
  },
  {
    title: 'Planung & Konzept',
    desc: 'Wir erstellen einen durchdachten Plan, der Ihre Wünsche und die Gegebenheiten vor Ort optimal vereint.',
    icon: Monitor,
    img: '/Methodik_2.webp',
    detail: 'Auf Basis unserer Beratung erarbeiten wir ein individuelles Konzept mit Materialvorschlägen, Pflanzplanung und Kostenschätzung.',
  },
  {
    title: 'Fachgerechte Umsetzung',
    desc: 'Unser erfahrenes Team setzt den Plan mit handwerklicher Präzision und hochwertigen Materialien um.',
    icon: Hammer,
    img: '/Methodik_3.webp',
    detail: 'Termingerechte Ausführung durch unser eingespieltes Team – von Erdarbeiten über Pflasterung bis zur Bepflanzung.',
  },
  {
    title: 'Pflege & Betreuung',
    desc: 'Auf Wunsch übernehmen wir die laufende Pflege, damit Ihr Garten dauerhaft in Bestform bleibt.',
    icon: Sprout,
    img: '/Methodik_4.webp',
    detail: 'Regelmäßige Gartenpflege, Bewässerungswartung und saisonale Bepflanzung – wir sind langfristig für Sie da.',
  },
];

function StepCard({ step, index, isActive, onActivate }: {
  key?: Key;
  step: typeof steps[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onActivate}
      className="group cursor-pointer"
      style={{ transform: 'translateZ(0)', willChange: 'transform' }}
    >
      <div className={`relative rounded-2xl overflow-hidden transition-colors transition-shadow duration-500 ${isActive
        ? 'bg-forest shadow-[0_8px_40px_rgba(146,108,68,0.2)] scale-[1.02]'
        : 'bg-cream shadow-md hover:shadow-lg hover:scale-[1.01]'
        }`}>
        <div className={`overflow-hidden transition-[height] duration-500 ${isActive ? 'h-48' : 'h-0'}`}>
          <img
            src={step.img}
            alt={step.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isActive
              ? 'bg-bronze text-cream shadow-[0_0_20px_rgba(146,108,68,0.4)]'
              : 'bg-forest/10 text-forest'
              }`}>
              <span className="text-sm font-sans font-bold">{String(index + 1).padStart(2, '0')}</span>
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-bronze"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>
            <Icon className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-bronze' : 'text-forest/40'
              }`} strokeWidth={1.5} />
          </div>

          <h3 className={`text-xl font-serif font-semibold mb-2 transition-colors duration-300 ${isActive ? 'text-cream' : 'text-forest'
            }`}>
            {step.title}
          </h3>

          <p className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${isActive ? 'text-cream/80' : 'text-forest/60'
            }`}>
            {step.desc}
          </p>

          <motion.div
            initial={false}
            animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <p className="font-sans text-sm leading-relaxed text-cream/70 mt-3 pt-3 border-t border-cream/20">
              {step.detail}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const linePercent = (activeStep / (steps.length - 1)) * 100;

  return (
    <section id="process" className="relative z-10 py-16 md:py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto w-full">
        <SectionHeading title="So arbeiten wir" subtitle="Von der Idee zum fertigen Garten" />

        {/* Desktop: Horizontal timeline */}
        <div className="hidden lg:block relative mt-16">
          {/* Progress line */}
          <div className="absolute top-6 left-[6%] right-[6%] h-[2px] bg-forest/10 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-bronze via-bronze to-bronze/40 rounded-full origin-left"
              animate={{ scaleX: linePercent / 100 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {/* Step markers on the line */}
          <div className="flex justify-between mb-12 relative">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`relative w-12 h-12 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-all duration-500 z-10 cursor-pointer ${i <= activeStep
                  ? 'bg-bronze text-cream shadow-[0_0_15px_rgba(146,108,68,0.3)]'
                  : 'bg-cream text-forest/40 border-2 border-forest/10 hover:border-bronze/40'
                  }`}
              >
                {String(i + 1).padStart(2, '0')}
                {i === activeStep && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-bronze/50"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.8, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <StepCard
                key={i}
                step={step}
                index={i}
                isActive={i === activeStep}
                onActivate={() => setActiveStep(i)}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical timeline */}
        <div className="lg:hidden relative mt-4">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-forest/10">
            <motion.div
              className="w-full bg-gradient-to-b from-bronze to-bronze/30 rounded-full origin-top"
              animate={{ height: `${linePercent}%` }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div className="space-y-3 pl-16">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isActive = i === activeStep;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="relative"
                  onClick={() => setActiveStep(i)}
                >
                  {/* Circle marker on the line */}
                  <div className={`absolute -left-[52px] top-6 w-10 h-10 rounded-full flex items-center justify-center font-sans text-xs font-bold transition-all duration-400 z-10 cursor-pointer ${i <= activeStep
                    ? 'bg-bronze text-cream shadow-[0_0_12px_rgba(146,108,68,0.3)]'
                    : 'bg-cream text-forest/40 border-2 border-forest/10'
                    }`}>
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl overflow-hidden transition-colors transition-shadow duration-500 cursor-pointer ${isActive
                      ? 'bg-forest shadow-lg'
                      : 'bg-cream shadow-md'
                      }`}
                    style={{ transform: 'translateZ(0)', willChange: 'transform' }}
                  >
                    {/* Image */}
                    <div className={`overflow-hidden transition-[height] duration-500 ${isActive ? 'h-28' : 'h-0'}`}>
                      <img
                        src={step.img}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-bronze' : 'text-forest/40'}`} strokeWidth={1.5} />
                        <h3 className={`text-lg font-serif font-semibold ${isActive ? 'text-cream' : 'text-forest'}`}>
                          {step.title}
                        </h3>
                      </div>
                      {isActive && (
                        <p className="font-sans text-sm leading-relaxed text-cream/80">
                          {step.desc}
                        </p>
                      )}
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="font-sans text-sm leading-relaxed text-cream/70 mt-3 pt-3 border-t border-cream/20"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
