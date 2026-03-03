import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import SectionHeading from './ui/SectionHeading';
import { ShinyButton } from './ui/shiny-button';
import { CircularGallery, type GalleryItem } from './ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    title: 'Pflasterarbeiten',
    subtitle: 'Reinickendorf',
    photo: {
      url: '/Portfolio_1.webp',
      text: 'Pflasterarbeiten in Reinickendorf',
      pos: 'center',
    },
  },
  {
    title: 'Hofgestaltung',
    subtitle: 'Marzahn',
    photo: {
      url: '/Portfolio_2.webp',
      text: 'Hofgestaltung in Marzahn',
      pos: 'center',
    },
  },
  {
    title: 'Spielplatzneubau',
    subtitle: 'Pankow',
    photo: {
      url: '/Portfolio_3.webp',
      text: 'Spielplatzneubau in Pankow',
      pos: 'center',
    },
  },
  {
    title: 'Wegebau',
    subtitle: 'Lichtenberg',
    photo: {
      url: '/Portfolio_4.webp',
      text: 'Wegebau in Lichtenberg',
      pos: 'center',
    },
  },
  {
    title: 'Bepflanzung',
    subtitle: 'Weißensee',
    photo: {
      url: '/Portfolio_5.webp',
      text: 'Bepflanzung in Weißensee',
      pos: 'center',
    },
  },
  {
    title: 'Außenanlagen',
    subtitle: 'Wedding',
    photo: {
      url: '/Portfolio_6.webp',
      text: 'Außenanlagen in Wedding',
      pos: 'center',
    },
  },
  {
    title: 'Parkplatzneubau',
    subtitle: 'Spandau',
    photo: {
      url: '/Portfolio_7.webp',
      text: 'Parkplatzneubau in Spandau',
      pos: 'center',
    },
  },
  {
    title: 'Landschaftsbau',
    subtitle: 'Hellersdorf',
    photo: {
      url: '/Portfolio_8.webp',
      text: 'Landschaftsbau in Hellersdorf',
      pos: 'center',
    },
  },
];

export default function Portfolio() {
  const navigate = useNavigate();

  return (
    <section id="portfolio" className="relative z-10 overflow-hidden bg-forest/5">
      <div className="section-container pt-24 pb-4">
        <SectionHeading title="Unsere Referenzen" subtitle="Einblicke in unsere Projekte" />
      </div>

      {/* Desktop: 3D Circular Gallery */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ margin: '-100px' }}
        transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden md:block w-full h-[75vh] min-h-[550px] max-h-[750px]"
      >
        <CircularGallery
          items={galleryData}
          radius={450}
          autoRotateSpeed={0.15}
        />
      </motion.div>

      <div className="hidden md:block text-center pb-16 pt-4">
        <p className="text-forest/70 font-sans text-sm">Ziehen zum Drehen</p>
      </div>

      {/* Mobile: Horizontal Scroll Gallery */}
      <div className="md:hidden pb-12">
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-4 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {galleryData.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex-shrink-0 snap-center w-[80vw] max-w-[320px] rounded-2xl overflow-hidden bg-cream shadow-lg"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.photo.url}
                  alt={item.photo.text}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-serif font-semibold text-cream">{item.title}</h3>
                  <p className="text-sm font-sans text-cream/80 uppercase tracking-wider">{item.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-forest/70 font-sans text-sm mt-2">Wischen zum Entdecken</p>
      </div>

      {/* Link to full portfolio page */}
      <div className="text-center pb-12 md:pb-16">
        <ShinyButton onClick={() => navigate('/portfolio')}>
          Alle Referenzen ansehen
        </ShinyButton>
      </div>
    </section>
  );
}
