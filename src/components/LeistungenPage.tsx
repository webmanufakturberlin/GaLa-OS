import { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { ShinyButton } from './ui/shiny-button';

const serviceData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  paragraphs: string[];
}> = {
  neuanlagen: {
    title: 'Wegebau & Pflasterarbeiten',
    subtitle: 'Qualität und Präzision bei jedem Projekt',
    description:
      'Von kleinen Gartenwegen bis zu großflächigen Hofanlagen und Parkplätzen – mit modernster Ausrüstung und über 20 Jahren Erfahrung realisieren wir alle Arten von Wege- und Pflasterprojekten in Berlin.',
    features: [
      'Natursteinpflaster und Plattenbeläge',
      'Betonsteinpflaster und Kleinpflaster',
      'Parkplatz- und Zufahrtsgestaltung',
      'Eingangsbereiche und Auffahrten',
      'Müllplatzgestaltung mit Metalleinfriedung',
      'Randsteinarbeiten und Wegebau',
    ],
    image: '/Leistungen_2.webp',
    paragraphs: [
      'Wegebau und Pflasterarbeiten sind das Rückgrat jeder professionellen Außenanlage. Mit 4 Hydraulikbaggern, 7 Radladern und einem eingespielten Team aus 30 Fachkräften realisieren wir Projekte jeder Größenordnung – von Privatgärten bis hin zu großen Wohnungsbaugesellschaften wie DEGEWO, GESOBAU, HOWOGE und GEWOBAg.',
      'Wir arbeiten mit allen gängigen Materialien: Granit- und Basaltkleinsteinpflaster, Betonformstein, Natursteinplatten und Verbundsteinpflaster. Unser Fuhrpark mit grüner Umweltplakette ermöglicht auch den Einsatz im Berliner Stadtgebiet ohne Einschränkungen.',
      'Besonders stolz sind wir auf unsere termingerechte Abwicklung. Ob dringliche Kleininstandsetzungen im Rahmen von Jahresverträgen oder umfangreiche Neuanlagen – wir halten unsere Zusagen ein und hinterlassen die Baustelle sauber übergeben.',
    ],
  },
  terrassen: {
    title: 'Bepflanzung & Hofgestaltung',
    subtitle: 'Grüne Wohnoasen für Berlins Höfe',
    description:
      'Wohnhöfe, Grünflächen und Außenanlagen professionell bepflanzen und gestalten – mit fachkundiger Planung, hochwertigen Pflanzen und erfahrenen Gartenbauern.',
    features: [
      'Wohnumfeldverbesserung und Hofgestaltung',
      'Bepflanzungen und Rasenanlage',
      'Baumfällungen und Kronenrückschnitt',
      'Neuanpflanzungen und Baumscheiben',
      'Sanierung und Erneuerung von Außenanlagen',
      'Landschaftsbauarbeiten aller Größenordnungen',
    ],
    image: '/Leistungen_3.webp',
    paragraphs: [
      'Grüne Wohnhöfe steigern die Lebensqualität der Bewohner und den Wert der Immobilie. Wir planen und realisieren Bepflanzungen, die pflegeleicht und gleichzeitig ästhetisch ansprechend sind. Dabei berücksichtigen wir Standortbedingungen wie Licht, Bodenbeschaffenheit und Wasserversorgung.',
      'Baumfällungen und Kronenrückschnitt sind heikel – aber genau dafür haben wir die richtige Ausrüstung. Mit 4 Hydraulikbaggern und erfahrenem Personal führen wir auch anspruchsvolle Baumfällungen sicher und rückstandsfrei durch, auch in engen Berliner Höfen.',
      'Als Partner für große Berliner Wohnungsbaugesellschaften sind wir es gewohnt, Außenanlagen für viele Wohneinheiten gleichzeitig zu betreuen. Jahr für Jahr erneuern und sanieren wir Hofbereiche, legen Rasen an und sorgen für gepflegte Außenanlagen in ganz Berlin.',
    ],
  },
  pflege: {
    title: 'Spielplätze & Winterdienst',
    subtitle: 'Mehr Service – weniger Sorgen',
    description:
      'Professionelle Spielplatzgestaltung mit modernen Geräten und sicherem Sandaustausch sowie zuverlässige Winterdienstleistungen in ganz Berlin – für Kommunen, WBGs und Gewerbe.',
    features: [
      'Spielplatzneubau und -umbau inkl. Spielgeräten',
      'Sandaustausch und Sandreinigung',
      'Sicherheitsinspektion und Instandhaltung',
      'Verkehrswegebau StLb. 615',
      'Winterdienstleistungen ganz Berlin',
      'Kleininstandsetzungsarbeiten Jahresverträge',
    ],
    image: '/Leistungen_4.webp',
    paragraphs: [
      'Spielplätze müssen sicher und einladend sein. Wir planen, bauen und renovieren Spielplätze komplett – von der Planung über die Geräteinstallation bis zum Sandaustausch. Als langjähriger Partner von GESOBAU, DEGEWO und weiteren Berliner WBGs kennen wir die Anforderungen an Sicherheit und Langlebigkeit.',
      'Winterdienst ist Vertrauenssache. Unsere regelmäßigen Verträge mit Wohnungsbaugesellschaften und Gewerbekunden zeigen, dass wir als verlässlicher Partner geschätzt werden. Wir räumen und streuen pünktlich und zuverlässig – auch bei extremen Witterungsbedingungen.',
      'Kleininstandsetzungsarbeiten im Rahmen von Jahresverträgen sind eine unserer Stärken. Schnelle Reaktionszeiten, kompetente Ausführung und faire Abrechnung machen uns zum bevorzugten Partner für die laufende Betreuung von Außenanlagen in ganz Berlin.',
    ],
  },
};

export default function LeistungenPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = slug ? serviceData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="relative min-h-screen bg-cream">
        <Navbar />
        <div className="pt-32 pb-24 px-6 text-center">
          <h1 className="text-3xl font-serif text-forest mb-4">Seite nicht gefunden</h1>
          <button onClick={() => navigate('/')} className="text-bronze hover:underline font-sans">
            Zurück zur Startseite
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-cream">
      <Navbar />

      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-forest/70" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <p className="text-bronze font-sans text-xs uppercase tracking-widest mb-3">{service.subtitle}</p>
          <h1 className="text-4xl md:text-6xl font-serif text-cream">{service.title}</h1>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/#leistungen')}
            className="flex items-center gap-2 text-forest/60 hover:text-forest mb-10 font-sans text-sm transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </button>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl font-sans text-forest/80 leading-relaxed mb-12"
          >
            {service.description}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-forest/5 rounded-2xl p-8 md:p-10 mb-12"
          >
            <h2 className="text-2xl font-serif text-forest mb-6">Unsere Leistungen im Detail</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-bronze flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm text-forest/80">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Paragraphs */}
          {service.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="font-sans text-forest/70 leading-relaxed mb-6"
            >
              {p}
            </motion.p>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <ShinyButton onClick={() => navigate('/#contact')}>
              Jetzt Beratung anfragen
            </ShinyButton>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
