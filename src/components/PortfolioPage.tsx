import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from './ui/SectionHeading';
import Navbar from './Navbar';
import Footer from './Footer';

const categories = [
  { id: 'pflaster', label: 'Pflasterarbeiten' },
  { id: 'hof', label: 'Hofgestaltung' },
  { id: 'bepflanzung', label: 'Bepflanzung' },
  { id: 'spielplatz', label: 'Spielplätze' },
  { id: 'winterdienst', label: 'Winterdienst' },
];

const portfolioItems: Record<string, Array<{ title: string; description: string; image: string }>> = {
  'pflaster': [
    { title: 'Pflasterarbeiten Reinickendorf', description: 'Hofpflasterung mit Natursteinpflaster für DEGEWO-Wohnanlage in Reinickendorf.', image: '/Portfolio_1.webp' },
    { title: 'Wegebau Luitpoldstraße', description: 'Wegebau und Pflasterarbeiten im Auftrag von DEGEWO – termingerecht und sauber ausgeführt.', image: '/Portfolio_2.webp' },
    { title: 'Parkplatz Wedding', description: 'Neubau eines Parkplatzes mit Formsteinpflaster und integrierter Entwässerung.', image: '/Portfolio_3.webp' },
    { title: 'Müllplatz Kreuzberg', description: 'Müllplatzerweiterung mit Metalleinfriedung und Pflasterarbeiten.', image: '/Portfolio_4.webp' },
    { title: 'Eingangsbereich Agnes-Straub-Weg', description: 'Neubau Eingangsbereich mit Natursteinpflaster und Bepflanzung.', image: '/Portfolio_5.webp' },
    { title: 'Verkehrswegebau Marzahn', description: 'Großflächiger Verkehrswegebau nach StLb. 615 im Bezirk Marzahn.', image: '/Portfolio_6.webp' },
  ],
  'hof': [
    { title: 'Hofgestaltung Renatenweg', description: 'Komplette Hofgestaltung mit Pflanzungen und Parkplatzneubau für DEGEWO.', image: '/Portfolio_7.webp' },
    { title: 'Wohnumfeld Ringwalder Str.', description: 'Wohnumfeldverbesserung für Degewo Marzahn GmbH mit Außenanlagenerneuerung.', image: '/Portfolio_8.webp' },
    { title: 'Hof Spanische Allee', description: 'Wegebau und Hofgestaltung für Spier-Projektmanagement Architekturbüro.', image: '/Portfolio_1.webp' },
    { title: 'Außenanlage Heerstraße', description: 'Um- und Neubau der Hofbereiche mit hochwertiger Pflasterung für Postheimstätte eG.', image: '/Portfolio_2.webp' },
    { title: 'Wohnhof Marzahn', description: 'Wohnumfeldverbesserung mit Wegebau und Grünanlagensanierung.', image: '/Portfolio_3.webp' },
    { title: 'Graizer Straße Berlin', description: 'Wegebau mit Unterpflanzungen und Müllplatzumbau mit Metalleinfriedung.', image: '/Portfolio_4.webp' },
  ],
  'bepflanzung': [
    { title: 'Bepflanzung Gudvangerstraße', description: 'Kronenrückschnitt und Baumfällung für Fidato Hausverwaltung.', image: '/Portfolio_5.webp' },
    { title: 'Neupflanzung Wolfener Str.', description: 'Baumpflanzungen auf dem Gewerbeareal der Gewerbesiedlungs-Gesellschaft.', image: '/Portfolio_6.webp' },
    { title: 'Baumscheiben Eichhorster Weg', description: 'Herstellung von Baumscheiben mit Kleinsteinpflaster für Seebauer & Partner.', image: '/Portfolio_7.webp' },
    { title: 'Bepflanzung Lindenstraße', description: 'Landschaftsbauarbeiten inkl. Bepflanzung für GEWOBAG Wohnungsbau.', image: '/Portfolio_8.webp' },
    { title: 'Grünanlage Amalienstraße', description: 'Wohnumfeldsanierung und Landschaftsbauarbeiten für GESOBAU.', image: '/Portfolio_1.webp' },
    { title: 'Bepflanzung Fritz-Kirsch-Zeile', description: 'Hofgestaltung mit Bepflanzung und Wegebau für KÖWOGE Wohnungsbau.', image: '/Portfolio_2.webp' },
  ],
  'spielplatz': [
    { title: 'Spielplatz Idunastraße', description: 'Spielplatzumbau inkl. Sandaustausch für GESOBAU in Pankow.', image: '/Portfolio_3.webp' },
    { title: 'Spielplatz Pankow-Weißensee', description: 'Neubau Spielplatz mit modernen Geräten und Sandaustausch für GESOBAU.', image: '/Portfolio_4.webp' },
    { title: 'Spielplatz Rügener Str.', description: 'Neubau mit Spielgeräten im Auftrag von DEGEWO Wohnungsbaugesellschaft.', image: '/Portfolio_5.webp' },
    { title: 'Spielplatz Ostpreußendamm', description: 'Spielplatzumbau mit Pflasterarbeiten für WBM Berlin.', image: '/Portfolio_6.webp' },
    { title: 'Klassenzimmer Spandau', description: 'Herrichten eines grünen Klassenzimmers inkl. Bepflanzung für Bezirksamt Spandau.', image: '/Portfolio_7.webp' },
    { title: 'Sandreinigung Spielplätze', description: 'Regelmäßige Sandreinigung und Sandaustausch in Berliner Spielplätzen für GESOBAU.', image: '/Portfolio_8.webp' },
  ],
  'winterdienst': [
    { title: 'Winterdienst RUWE Berlin', description: 'Ganzjähriger Winterdienst in ganz Berlin mit schneller Reaktionszeit.', image: '/Portfolio_1.webp' },
    { title: 'Winterdienst Gegenbauer Property', description: 'Zuverlässiger Räum- und Streudienst für Gewerbeobjekte in Berlin.', image: '/Portfolio_2.webp' },
    { title: 'Räumung Verwaltungsgebäude', description: 'Professioneller Winterdienst für Berliner Verwaltungsgebäude – Jahresvertrag.', image: '/Portfolio_3.webp' },
    { title: 'Kleininstandsetzung DEGEWO', description: 'Jahresvertrag für Kleininstandsetzungsarbeiten an Berliner Wohnobjekten.', image: '/Portfolio_4.webp' },
    { title: 'Winterdienst Wohnanlage Mitte', description: 'Zuverlässige Schneeräumung und Streuung für private Wohnanlage in Berlin Mitte.', image: '/Portfolio_5.webp' },
    { title: 'Jahresvertrag GESOBAU', description: 'Kleininstandsetzungsarbeiten and Winterdienst im Jahresvertrag für GESOBAU Berlin.', image: '/Portfolio_6.webp' },
  ],
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('pflaster');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-cream">
      <Navbar />
      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/#portfolio')}
            className="flex items-center gap-2 text-forest/60 hover:text-forest mb-8 font-sans text-sm transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </button>

          <SectionHeading title="Unsere Referenzen" subtitle="Alle Projekte im Überblick" />

          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-sans text-sm transition-all duration-300 ${activeCategory === cat.id
                  ? 'bg-forest text-cream shadow-md'
                  : 'bg-forest/10 text-forest hover:bg-forest/20'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {portfolioItems[activeCategory]?.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/40 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-serif font-semibold text-forest mb-1">{item.title}</h3>
                    <p className="text-sm font-sans text-forest/60 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
      <Footer />
    </div>
  );
}
