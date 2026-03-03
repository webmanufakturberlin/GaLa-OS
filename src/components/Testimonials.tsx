import { motion } from 'motion/react';
import { StaggerTestimonials, type StaggerTestimonial } from './ui/stagger-testimonials';
import SectionHeading from './ui/SectionHeading';

const testimonials: StaggerTestimonial[] = [
  {
    tempId: 0,
    testimonial: 'Osinski GaLaBau hat unsere gesamte Hofgestaltung in Reinickendorf neu gemacht – Pflasterarbeiten, Bepflanzung und Müllplatzeinfassung. Alles termingerecht und sauber ausgeführt. Sehr empfehlenswert!',
    by: 'Hausverwaltung Köcher',
    location: 'Berlin Reinickendorf',
    rating: 5,
  },
  {
    tempId: 1,
    testimonial: 'Der neue Spielplatz in unserer Anlage ist klasse geworden. Osinski hat alles professionell umgesetzt – Spielgeräte, Sandaustausch und die Einfassung. Die Kinder sind begeistert.',
    by: 'WEG Pankower Allee',
    location: 'Berlin Pankow',
    rating: 5,
  },
  {
    tempId: 2,
    testimonial: 'Wir beauftragen Osinski seit Jahren mit dem Winterdienst und Landschaftsbauarbeiten. Immer zuverlässig, pünktlich und zu fairen Preisen. Ein echter Profi!',
    by: 'Gegenbauer Property Services',
    location: 'Berlin Mitte',
    rating: 5,
  },
  {
    tempId: 3,
    testimonial: 'Die Baumfällung war schwierig, da das Grundstück sehr eng war. Das Osinski-Team hat das mit ihren Hydraulikbaggern perfekt gelöst. Schnell, sicher und ohne Schäden.',
    by: 'Familie Wronski',
    location: 'Berlin Weißensee',
    rating: 5,
  },
  {
    tempId: 4,
    testimonial: 'Parkplatzneubau und Wegebauarbeiten in Marzahn – alles in höchster Qualität und innerhalb des Budgets. Das Team ist top eingespielt und sehr professionell.',
    by: 'DEGEWO Wohnungsbau',
    location: 'Berlin Marzahn',
    rating: 4,
  },
  {
    tempId: 5,
    testimonial: 'Unser Eingangsbereich wurde komplett erneuert mit Pflastersteinen und neuer Bepflanzung. Das Ergebnis übertrifft alle Erwartungen. Klare Weiterempfehlung!',
    by: 'Postheimstätte eG',
    location: 'Berlin Spandau',
    rating: 5,
  },
  {
    tempId: 6,
    testimonial: 'Rentenweg-Projekt: Hofgestaltung mit Pflanzungen und Parkplatzneubau. Termin gehalten, Qualität einwandfrei. Osinski ist unser fester Partner für alle Außenanlagen.',
    by: 'KÖWOGE Wohnungsbau',
    location: 'Berlin Lichtenberg',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-sand/20 relative z-10">
      <div className="section-container">
        <SectionHeading title="Stimmen unserer Auftraggeber" subtitle="Erfahrungen zufriedener Kunden" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ margin: '-80px' }}
        transition={{ duration: 0.8 }}
      >
        <StaggerTestimonials testimonials={testimonials} />
      </motion.div>
    </section>
  );
}
