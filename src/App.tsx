import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProposition from './components/ValueProposition';
import Leistungen from './components/Leistungen';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';
import { BackgroundEffects } from './components/BackgroundEffects';
import PageLoader from './components/PageLoader';
import SectionDivider from './components/ui/SectionDivider';
import PortfolioPage from './components/PortfolioPage';
import LeistungenPage from './components/LeistungenPage';

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [hash]);
  return null;
}

function HomePage() {
  return (
    <div className="relative min-h-screen">
      <PageLoader />
      <BackgroundEffects />
      <Navbar />
      <Hero />
      <SectionDivider color="#F9F7F2" className="-mt-[50px] md:-mt-[70px]" />
      <ValueProposition />
      <SectionDivider color="#F9F7F2" />
      <Leistungen />
      <SectionDivider color="rgba(27,48,34,0.05)" />
      <Portfolio />
      <SectionDivider color="#F9F7F2" flip />
      <Process />
      <SectionDivider color="rgba(229,222,209,0.2)" />
      <Testimonials />
      <SectionDivider color="rgba(229,222,209,0.3)" />
      <Contact />
      <SectionDivider color="#1B3022" />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/leistungen/:slug" element={<LeistungenPage />} />
      </Routes>
    </>
  );
}
