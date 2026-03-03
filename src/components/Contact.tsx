import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Shield, Award, Leaf, Star, CheckCircle, MessageCircle } from 'lucide-react';
import SectionHeading from './ui/SectionHeading';
import MagneticButton from './ui/MagneticButton';

const badges = [
  { icon: CheckCircle, label: 'GaLaBau Fachbetrieb' },
  { icon: Shield, label: 'DSGVO konform' },
  { icon: Leaf, label: 'Nachhaltig' },
  { icon: Award, label: 'Qualitätsgarantie' },
  { icon: Star, label: 'Seit 2004 in Berlin' },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-sand/30 relative z-10">
      <div className="section-container">
        <SectionHeading title="Lassen Sie uns sprechen" subtitle="Ihr Projekt beginnt hier" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-forest/80 font-sans leading-relaxed mb-10">
              Ob Wegebau, Hofgestaltung, Bepflanzung oder Spielplatz – wir beraten Sie gerne
              persönlich. Rufen Sie uns an oder schreiben Sie uns eine Nachricht.
              Mit 30 Fachkräften und modernster Ausrüstung sind wir für jedes Projekt gerüstet.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm text-forest">Adresse</h3>
                  <p className="text-forest/70 font-sans text-sm">Triftstraße 6, 13127 Berlin</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm text-forest">Telefon</h3>
                  <a href="tel:+4930912022 51" className="text-forest/70 font-sans text-sm hover:text-bronze transition-colors">
                    030 - 91 20 22 51
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm text-forest">E-Mail</h3>
                  <a href="mailto:info@osinski-galabau.de" className="text-forest/70 font-sans text-sm hover:text-bronze transition-colors">
                    info@osinski-galabau.de
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-sm text-forest">WhatsApp</h3>
                  <a href="https://wa.me/4930912022 51" target="_blank" rel="noopener noreferrer" className="text-forest/70 font-sans text-sm hover:text-[#25D366] transition-colors">
                    Nachricht senden
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name" className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-3 rounded-xl bg-cream border border-forest/10 font-sans text-sm text-forest placeholder-forest/40 focus:border-bronze focus:outline-none transition-colors"
                placeholder="Ihr Name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-2">
                E-Mail *
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-3 rounded-xl bg-cream border border-forest/10 font-sans text-sm text-forest placeholder-forest/40 focus:border-bronze focus:outline-none transition-colors"
                placeholder="ihre@email.de"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-2">
                Telefon (optional)
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full px-4 py-3 rounded-xl bg-cream border border-forest/10 font-sans text-sm text-forest placeholder-forest/40 focus:border-bronze focus:outline-none transition-colors"
                placeholder="030 ..."
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-2">
                Nachricht *
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-cream border border-forest/10 font-sans text-sm text-forest placeholder-forest/40 focus:border-bronze focus:outline-none transition-colors resize-none"
                placeholder="Erzählen Sie uns von Ihrem Projekt..."
              />
            </div>

            <MagneticButton className="btn-premium px-8 py-4 bg-forest text-cream font-sans text-sm uppercase tracking-wider rounded-full border border-forest w-full md:w-auto">
              Nachricht senden
            </MagneticButton>
          </motion.form>
        </div>

        {/* Certificates & Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-20 pt-12 border-t border-forest/10"
        >
          <p className="text-center font-sans text-xs uppercase tracking-widest text-forest/50 mb-8">
            Qualität & Vertrauen
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {badges.map((badge) => (
              <div key={badge.label} className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-cream border border-forest/10 flex items-center justify-center">
                  <badge.icon className="w-6 h-6 text-bronze/70" strokeWidth={1.5} />
                </div>
                <span className="font-sans text-xs text-forest/60">{badge.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
