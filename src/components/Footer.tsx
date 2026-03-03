import { motion } from 'motion/react';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-forest text-cream pt-24 pb-12 relative z-10 border-t border-cream/10">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2"
          >
            <h2 className="text-3xl font-serif mb-6">Osinski GaLaBau</h2>
            <p className="font-sans text-sm text-cream/70 leading-relaxed max-w-sm mb-8">
              Garten-, Landschafts- und Pflegeleistungen in Berlin.
              Seit 2004 Ihr zuverlässiger Partner für professionellen Garten- und Landschaftsbau.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-all duration-300 cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:bg-bronze hover:border-bronze transition-all duration-300 cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="font-sans text-xs uppercase tracking-widest text-bronze mb-6">Navigation</h3>
            <ul className="space-y-3 font-sans text-sm text-cream/80">
              <li>
                <button onClick={() => scrollTo('portfolio')} className="hover:text-bronze transition-colors cursor-pointer">
                  Referenzen
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('leistungen')} className="hover:text-bronze transition-colors cursor-pointer">
                  Leistungen
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-bronze transition-colors cursor-pointer">
                  Über uns
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('process')} className="hover:text-bronze transition-colors cursor-pointer">
                  Methodik
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-sans text-xs uppercase tracking-widest text-bronze mb-6">Kontakt</h3>
            <ul className="space-y-3 font-sans text-sm text-cream/80">
              <li>
                Triftstraße 6
                <br />
                13127 Berlin
              </li>
              <li className="pt-2">
                <a href="tel:+493091202251" className="hover:text-bronze transition-colors">
                  030 - 91 20 22 51
                </a>
              </li>
              <li>
                <a href="mailto:info@osinski-galabau.de" className="hover:text-bronze transition-colors">
                  info@osinski-galabau.de
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 font-sans text-xs text-cream/50">
          <p>&copy; 2026 Osinski Garten-, Landschafts- und Pflegeleistungen GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Datenschutz
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
