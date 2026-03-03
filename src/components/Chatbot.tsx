import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = {
  id: number;
  role: 'bot' | 'user';
  text: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'bot', text: 'Willkommen bei Osinski GaLaBau! Wie kann ich Ihnen weiterhelfen?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      let botResponse = "Gerne berate ich Sie dazu detaillierter. Bitte hinterlassen Sie uns eine Nachricht über das Kontaktformular oder kontaktieren Sie uns telefonisch.";
      const lowerInput = userMessage.text.toLowerCase();

      if (lowerInput.includes('kosten') || lowerInput.includes('preis') || lowerInput.includes('teuer')) {
        botResponse = "Die Kosten hängen vom Umfang des Projekts und den Materialien ab. Wir führen Einzelaufträge bis zu 1.000.000 € aus. Nach einem Beratungsgespräch erstellen wir gerne ein Angebot.";
      } else if (lowerInput.includes('wegebau') || lowerInput.includes('pflaster') || lowerInput.includes('pflasterung')) {
        botResponse = "Wegebau und Pflasterarbeiten gehören zu unseren Kernleistungen. Mit modernster Ausrüstung führen wir Projekte für Privatpersonen, Wohnungsbaugesellschaften und Behörden durch.";
      } else if (lowerInput.includes('spielplatz') || lowerInput.includes('kinder')) {
        botResponse = "Wir planen und bauen Spielplätze inkl. Spielgeräten und Sandaustausch. Als Partner von DEGEWO, GESOBAU und anderen Berliner WBGs haben wir umfangreiche Erfahrung.";
      } else if (lowerInput.includes('baum') || lowerInput.includes('fäll') || lowerInput.includes('schnitt')) {
        botResponse = "Baumfällungen und Kronenrückschnitt führen wir professionell durch. Unsere 4 Hydraulikbagger und 7 Radlader ermöglichen auch schwierige Projekte.";
      } else if (lowerInput.includes('kontakt') || lowerInput.includes('telefon') || lowerInput.includes('anruf')) {
        botResponse = "Sie erreichen uns unter 030 - 91 20 22 51 oder per E-Mail an info@osinski-galabau.de. Bürozeiten: Montag–Freitag 7:00–17:00 Uhr.";
      } else if (lowerInput.includes('hallo') || lowerInput.includes('guten tag') || lowerInput.includes('hi')) {
        botResponse = "Hallo! Wie kann ich Ihnen rund um Garten- und Landschaftsbau weiterhelfen?";
      } else if (lowerInput.includes('team') || lowerInput.includes('mitarbeiter') || lowerInput.includes('groß')) {
        botResponse = "Unser Team umfasst 30 qualifizierte Fachkräfte mit modernster Ausrüstung: 9 Transporter, 7 Radlader, 2 LKW mit Hänger und 4 Hydraulikbagger.";
      }

      setMessages(prev => [...prev, { id: Date.now(), role: 'bot', text: botResponse }]);
    }, 1000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Chat öffnen"
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-forest text-cream rounded-full shadow-2xl flex items-center justify-center hover:bg-bronze transition-colors duration-300"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-8 z-50 w-80 md:w-96 bg-cream rounded-3xl shadow-2xl overflow-hidden border border-forest/10 flex flex-col"
          >
            <div className="bg-forest p-6 text-cream flex justify-between items-center shrink-0">
              <div>
                <h3 className="font-serif text-xl">GaLaBau-Berater</h3>
                <p className="text-xs font-sans opacity-70 uppercase tracking-wider mt-1">Osinski GaLaBau Berlin</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cream/70 hover:text-cream">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 p-6 bg-sand/30 overflow-y-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-4 rounded-2xl shadow-sm text-sm font-sans w-4/5 ${msg.role === 'bot'
                    ? 'bg-white text-forest/80 rounded-tl-none self-start'
                    : 'bg-bronze text-cream rounded-tr-none self-end'
                    }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-forest/5 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ihre Nachricht..."
                className="flex-1 bg-sand/20 border-none rounded-full px-4 py-3 text-sm font-sans focus:outline-none focus:ring-1 focus:ring-bronze"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-bronze text-cream rounded-full flex items-center justify-center hover:bg-forest transition-colors shrink-0"
              >
                <Send className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
