import React, { useState, useEffect, useRef } from 'react';
import Hero3D from './components/Hero3D';
import VeoSection from './components/VeoSection';

const TREATMENTS = [
  { 
    id: "f1", 
    title: "Facial Classic", 
    cat: "Facial", 
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800", 
    desc: "Reinigung, Peeling und Maske für ein frisches Hautgefühl.", 
    price: "Ab €69" 
  },
  { 
    id: "a1", 
    title: "Hydro-Care", 
    cat: "Apparative", 
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800", 
    desc: "Tieferenreinigung und Hydratisierung für den ultimativen Glow.", 
    price: "€149" 
  },
  { 
    id: "a2", 
    title: "Microneedling", 
    cat: "Apparative", 
    img: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=800", 
    desc: "Anregung der Kollagenbildung für straffe und verfeinerte Haut.", 
    price: "€189" 
  },
  { 
    id: "p1", 
    title: "Permanent Lippen", 
    cat: "Permanent", 
    img: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800", 
    desc: "Natürliche Farbpigmentierung für perfekt definierte Lippen.", 
    price: "Ab €350" 
  },
  { 
    id: "b1", 
    title: "Body Forming", 
    cat: "Body", 
    img: "https://images.unsplash.com/photo-1519824141121-99745c23ef3e?auto=format&fit=crop&q=80&w=800", 
    desc: "Gezielte Konturierung und Hautstraffung an Problemzonen.", 
    price: "Ab €120" 
  },
  { 
    id: "n1", 
    title: "Shellac Maniküre", 
    cat: "Nails & Waxing", 
    img: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800", 
    desc: "Langanhaltender Glanz und perfekte Farbe für Ihre Nägel.", 
    price: "Ab €45" 
  },
  { 
    id: "w1", 
    title: "Ganzkörper Waxing", 
    cat: "Nails & Waxing", 
    img: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=800", 
    desc: "Schonende und gründliche Haarentfernung für seidige Haut.", 
    price: "Ab €85" 
  },
  { 
    id: "p2", 
    title: "Powder Brows", 
    cat: "Permanent", 
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800", 
    desc: "Puderige Schattierung für volle und symmetrische Brauen.", 
    price: "Ab €380" 
  }
];

const PACKAGES = [
  { name: "Wedding Glow", price: "€249", items: ["Hydro-Care Treatment", "Augenbrauen Styling", "Wimpernlifting"] },
  { name: "Anti-Aging Kur", price: "€499", items: ["3x Microneedling", "Spezial-Serum Set", "Nachsorge-Beratung"] },
  { name: "Full Body Care", price: "€189", items: ["Body Peeling", "Ganzkörper Massage", "Express Facial"] }
];

const TESTIMONIALS = [
  { name: "Anja S.", text: "Das beste Microneedling in Frankfurt! Meine Haut hat sich noch nie so gut angefühlt. Sehr professionell.", rating: 5 },
  { name: "Melina K.", text: "Beauty Mosaic ist meine monatliche Wellness-Oase. Die Hydro-Care Behandlung ist ein Muss!", rating: 5 },
  { name: "Thomas R.", text: "Habe mich als Mann sehr wohl gefühlt. Sehr diskret und fachlich top Beratung.", rating: 5 }
];

const FAQS = [
  { q: "Wie lange dauert eine Microneedling Behandlung?", a: "In der Regel planen wir ca. 90 Minuten ein, inklusive Vorbereitung und beruhigender Nachpflege." },
  { q: "Wann sind die Ergebnisse beim Hydro-Care sichtbar?", a: "Ein sofortiger Glow ist direkt nach der ersten Behandlung sichtbar. Für Langzeiteffekte empfehlen wir eine monatliche Kur." },
  { q: "Gibt es Parkplätze?", a: "Ja, wir haben reservierte Kundenparkplätze direkt im Hof unseres Studios." },
  { q: "Verkaufen Sie auch Gutscheine?", a: "Absolut! Sie können Gutscheine vor Ort erwerben oder bequem per Post bestellen." }
];

const TreatmentCard: React.FC<{ treatment: any; index: number }> = ({ treatment, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`group relative bg-white rounded-[2rem] p-4 border border-stone-100 shadow-sm transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl hover:border-gold/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] mb-5">
        <img src={treatment.img} alt={treatment.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-gold font-bold text-[10px] tracking-widest">{treatment.price}</span>
        </div>
      </div>
      <div className="px-2 pb-2 space-y-2">
        <span className="text-gold font-bold text-[8px] uppercase tracking-[0.4em]">{treatment.cat}</span>
        <h3 className="text-xl font-serif text-stone-900 group-hover:text-gold transition-colors">{treatment.title}</h3>
        <p className="text-stone-400 text-[10px] font-light leading-relaxed h-8 overflow-hidden line-clamp-2">{treatment.desc}</p>
        <div className="pt-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
           <a href="#booking" className="shimmer-btn px-5 py-2 bg-stone-900 text-white text-[8px] font-bold uppercase tracking-widest rounded-full hover:bg-gold transition-all">
             Buchen
           </a>
           <div className="w-7 h-7 rounded-full border border-stone-100 flex items-center justify-center text-stone-300 hover:text-gold transition-all">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
           </div>
        </div>
      </div>
    </div>
  );
};

const FAQItem: React.FC<{ faq: any }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`accordion-item border-b border-stone-200 py-6 transition-all ${isOpen ? 'active bg-stone-50/50' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left px-4"
      >
        <span className="font-serif text-lg md:text-xl text-stone-800">{faq.q}</span>
        <span className={`text-gold transition-transform duration-500 ${isOpen ? 'rotate-135' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </span>
      </button>
      <div className="accordion-content">
        <p className="p-4 text-stone-500 text-xs md:text-sm leading-relaxed font-light">{faq.a}</p>
      </div>
    </div>
  );
};

const SectionReveal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={`reveal-section ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCat, setActiveCat] = useState('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Facial', 'Apparative', 'Permanent', 'Body', 'Nails & Waxing'];
  const filteredTreatments = activeCat === 'All' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.cat === activeCat);

  return (
    <div className="min-h-screen bg-stone-50 overflow-x-hidden">
      {/* Sticky Conversion Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[100] md:hidden bg-white/95 border-t border-stone-200 p-4 flex gap-4">
        <a href="tel:+496912345678" className="flex-1 flex items-center justify-center py-4 bg-stone-100 text-stone-900 rounded-full font-bold uppercase tracking-widest text-[9px] border border-stone-200">Anrufen</a>
        <a href="#booking" className="flex-1 flex items-center justify-center py-4 bg-gold text-white rounded-full font-bold uppercase tracking-widest text-[9px] animate-gold-pulse shadow-xl">Jetzt Buchen</a>
      </div>

      <a 
        href="#booking" 
        className="hidden md:flex fixed bottom-10 right-10 z-[100] px-8 py-5 bg-gold text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl animate-gold-pulse shimmer-btn items-center gap-3 transition-transform hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Termin buchen
      </a>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-[110] glass-nav border-b border-stone-100 transition-all duration-500 ${scrollY > 50 ? 'h-16 shadow-md' : 'h-24'}`}>
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex flex-col -space-y-1">
                <span className="text-xl md:text-2xl font-serif font-black tracking-tighter text-stone-900">BEAUTY MOSAIC</span>
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.6em] text-gold font-bold">Kosmetikstudio Frankfurt</span>
             </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8 text-[9px] font-black text-stone-600 uppercase tracking-[0.25em]">
            <a href="#home" className="nav-link">Home</a>
            <a href="#about" className="nav-link">Über Uns</a>
            <a href="#services" className="nav-link">Behandlungen</a>
            <a href="#prices" className="nav-link">Preise</a>
            <a href="#results" className="nav-link">Galerie</a>
            <a href="#contact" className="nav-link">Kontakt</a>
            <a href="#booking" className="shimmer-btn px-6 py-3 bg-stone-900 text-white rounded-full hover:bg-gold transition-all shadow-lg border border-transparent hover:border-gold">Online Buchen</a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-stone-900">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-stone-50 z-[120] transition-all duration-700 flex flex-col p-8 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
           <div className="flex justify-between items-center mb-16">
              <span className="text-xl font-serif font-black text-stone-900">BEAUTY MOSAIC</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
           </div>
           <ul className="space-y-10 text-2xl font-serif text-stone-900">
              {['Home', 'Über Uns', 'Behandlungen', 'Preise', 'Galerie', 'Kontakt'].map(item => (
                <li key={item}><a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className="block">{item}</a></li>
              ))}
              <li className="pt-8">
                 <a href="#booking" className="w-full inline-block py-5 bg-gold text-white text-center rounded-full text-xs font-black uppercase tracking-widest shadow-xl">Termin buchen</a>
              </li>
           </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-screen flex items-center overflow-hidden">
        <Hero3D />
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519415510236-855911993da4?auto=format&fit=crop&q=80&w=1920" 
            alt="Mosaic Studio Interior" 
            className="w-full h-full object-cover transition-transform duration-[3000ms] scale-110"
            style={{ transform: `scale(1.1) translateY(${scrollY * 0.1}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50/98 via-stone-50/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20">
          <div className="max-w-4xl space-y-10">
             <div className="inline-flex items-center gap-4 reveal-section visible">
                <span className="w-10 h-px bg-gold"></span>
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[9px]">Modern Skincare in Frankfurt</span>
             </div>
             <h1 className="text-6xl md:text-8xl lg:text-[120px] font-serif text-stone-900 leading-[0.85] -ml-1 tracking-tighter">
                Individuelle <br/><span className="italic text-gold">Haut-Ästhetik</span>
             </h1>
             <p className="text-stone-500 max-w-md font-light text-base md:text-xl leading-relaxed border-l-2 border-gold/30 pl-8">
               Wir veredeln Ihre natürliche Schönheit mit apparativer Hightech-Kosmetik und meisterhafter Präzision im Herzen von Frankfurt.
             </p>
             <div className="flex flex-wrap gap-6 pt-6">
                <a href="#services" className="shimmer-btn px-10 md:px-14 py-5 md:py-6 bg-stone-900 text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] rounded-full shadow-2xl hover:bg-gold transition-all">
                  Unsere Services
                </a>
                <a href="#booking" className="px-10 md:px-14 py-5 md:py-6 border-2 border-stone-200 text-stone-900 font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] rounded-full hover:border-gold hover:text-gold transition-all">
                  Termin buchen
                </a>
             </div>
          </div>
        </div>
      </header>

      {/* Value Proposition */}
      <section className="py-24 bg-white border-b border-stone-100">
         <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
               {[
                 { label: "High-Tech Tools", sub: "Hydro-Care & Needling" },
                 { label: "Meisterbetrieb", sub: "Zertifizierte Experten" },
                 { label: "Med. Kosmetik", sub: "Sichtbare Ergebnisse" },
                 { label: "Exklusiv", sub: "VIP Lounge Ambiente" }
               ].map((item, i) => (
                 <div key={i} className="space-y-3 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mx-auto text-gold group-hover:bg-gold group-hover:text-white transition-all duration-500">
                       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900">{item.label}</h4>
                    <p className="text-[9px] font-bold text-stone-400 tracking-widest uppercase">{item.sub}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* About Us */}
      <section id="about-us" className="py-32 px-8 bg-stone-50 overflow-hidden">
        <SectionReveal>
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
            <div className="relative">
               <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
                  <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200" alt="Team Beauty Mosaic" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
               </div>
               <div className="absolute -bottom-10 -right-10 w-64 p-8 bg-white rounded-3xl shadow-xl space-y-4 border border-stone-50">
                  <span className="text-gold font-bold text-[9px] uppercase tracking-widest">Inhabergeführt</span>
                  <h4 className="text-2xl font-serif text-stone-900 leading-none">Meisterhafte Expertise</h4>
                  <p className="text-stone-400 text-[10px] leading-relaxed">Wir betrachten Ihre Schönheit als Mosaik – jedes Detail zählt für das perfekte Ganze.</p>
               </div>
            </div>
            <div className="space-y-10 lg:pl-12">
               <div className="space-y-6">
                  <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Willkommen bei Beauty Mosaic</span>
                  <h2 className="text-6xl md:text-7xl font-serif text-stone-900 leading-[0.9]">Ihre Haut ist unser <br/><span className="italic text-gold">Meisterwerk</span></h2>
               </div>
               <p className="text-stone-500 text-lg font-light leading-relaxed max-w-lg">
                 Seit 2014 setzen wir in Frankfurt Maßstäbe für ästhetische Hautbehandlungen. Unser Ziel ist nicht die Veränderung, sondern die Perfektionierung Ihrer individuellen Gesichtszüge.
               </p>
               <div className="grid grid-cols-2 gap-12 pt-4">
                  <div className="space-y-2 border-l border-gold/30 pl-6">
                     <h5 className="text-4xl font-serif text-stone-900">10k+</h5>
                     <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">Erfolgreiche Behandlungen</p>
                  </div>
                  <div className="space-y-2 border-l border-gold/30 pl-6">
                     <h5 className="text-4xl font-serif text-stone-900">5.0</h5>
                     <p className="text-[9px] uppercase tracking-widest font-black text-stone-400">Kundenzufriedenheit</p>
                  </div>
               </div>
               <div className="pt-8">
                  <button className="group flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-stone-900 hover:text-gold transition-all">
                    Mehr erfahren <span className="w-16 h-px bg-gold group-hover:w-24 transition-all"></span>
                  </button>
               </div>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Services Subpages / Category Filter */}
      <section id="services" className="py-32 px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 mb-24">
            <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Unser Behandlungsmenü</span>
            <h2 className="text-6xl md:text-7xl font-serif text-stone-900 tracking-tighter">Exklusive <span className="italic text-gold">Services</span></h2>
            
            <div className="flex flex-wrap justify-center gap-2 pt-10">
               {categories.map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCat(cat)}
                   className={`px-6 py-3 text-[9px] font-black uppercase tracking-[0.25em] rounded-full transition-all duration-500 border ${activeCat === cat ? 'bg-stone-900 text-white border-stone-900 shadow-xl' : 'text-stone-400 border-stone-100 hover:border-gold hover:text-stone-900'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTreatments.map((t, idx) => (
              <TreatmentCard key={t.id} treatment={t} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Prices & Packages */}
      <section id="prices" className="py-32 px-8 bg-stone-50">
        <SectionReveal>
          <div className="max-w-7xl mx-auto">
             <div className="text-center space-y-4 mb-20">
               <h2 className="text-5xl font-serif text-stone-900 tracking-tight">Vorteils-Pakete</h2>
               <p className="text-stone-400 font-light text-sm">Gönnen Sie sich das Komplett-Erlebnis zum Spezialpreis.</p>
             </div>
             <div className="grid md:grid-cols-3 gap-10">
                {PACKAGES.map((pkg, i) => (
                  <div key={i} className="bg-white p-12 rounded-[3rem] border border-stone-100 shadow-sm space-y-8 flex flex-col items-center text-center transition-all hover:shadow-2xl hover:border-gold/20">
                     <h4 className="text-2xl font-serif text-stone-900">{pkg.name}</h4>
                     <div className="text-4xl font-serif text-gold">{pkg.price}</div>
                     <ul className="space-y-4 text-[10px] text-stone-500 font-light tracking-widest uppercase">
                        {pkg.items.map((item, j) => <li key={j} className="flex items-center gap-2"><span className="w-1 h-1 bg-gold rounded-full"></span>{item}</li>)}
                     </ul>
                     <div className="pt-6 w-full">
                        <button className="w-full py-4 border-2 border-stone-100 rounded-full text-[9px] font-black uppercase tracking-[0.3em] hover:bg-stone-900 hover:text-white transition-all">Details ansehen</button>
                     </div>
                  </div>
                ))}
             </div>
             <div className="mt-20 p-8 bg-stone-900 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8 text-white">
                <div className="space-y-2 text-center md:text-left">
                   <h5 className="text-2xl font-serif">Aktuelles Spezialangebot</h5>
                   <p className="text-gold text-[10px] uppercase font-bold tracking-widest">Gültig bis zum Ende des Monats</p>
                </div>
                <p className="text-stone-400 text-sm font-light max-w-sm text-center md:text-left">10% Rabatt auf alle Hydro-Care Erstbehandlungen für Neukunden.</p>
                <a href="#booking" className="px-10 py-4 bg-gold text-white rounded-full text-[10px] font-black uppercase tracking-widest shimmer-btn">Jetzt Sichern</a>
             </div>
          </div>
        </SectionReveal>
      </section>

      {/* Gallery / Before-After Slider (Integrated) */}
      <section id="results" className="py-32 px-8 bg-white border-y border-stone-100">
         <SectionReveal>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-12">
                  <div className="space-y-6">
                     <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Galerie & Ergebnisse</span>
                     <h2 className="text-6xl md:text-7xl font-serif text-stone-900 leading-none">Sichtbare <br/><span className="italic text-gold">Perfektion</span></h2>
                  </div>
                  <p className="text-stone-500 text-lg font-light leading-relaxed max-w-md">
                     Überzeugen Sie sich von unseren realen Patientenergebnissen. Wir setzen auf ehrliche Dokumentation und subtile Veredelung.
                  </p>
                  <div className="flex gap-4">
                     {['Facial', 'Microblading', 'Body'].map(tab => (
                       <button key={tab} className="px-8 py-3 rounded-full border border-stone-100 text-[9px] font-black uppercase tracking-widest text-stone-400 hover:text-gold hover:border-gold transition-all">{tab}</button>
                     ))}
                  </div>
               </div>
               <div className="relative group">
                  {/* Slider integration placeholder/logic remains the same from Previous but themed */}
                  <div className="relative w-full aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-stone-50 group">
                    <img src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200" alt="After" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent flex flex-col justify-end p-12">
                       <span className="text-gold font-bold text-[9px] uppercase tracking-widest mb-2">Nach einer Hydro-Care Kur</span>
                       <h4 className="text-3xl font-serif text-white">Sichtbarer Glow-Effekt</h4>
                    </div>
                  </div>
               </div>
            </div>
         </SectionReveal>
      </section>

      {/* AI Veo Cinematic Preview */}
      <VeoSection />

      {/* Testimonials */}
      <section className="py-32 bg-stone-900 text-white px-8">
         <div className="max-w-7xl mx-auto text-center space-y-20">
            <h2 className="text-5xl md:text-6xl font-serif tracking-tight">Kundenstimmen & <span className="text-gold italic">Bewertungen</span></h2>
            <div className="grid md:grid-cols-3 gap-12">
               {TESTIMONIALS.map((t, i) => (
                 <div key={i} className="p-10 bg-white/5 rounded-[2.5rem] border border-white/10 backdrop-blur-md space-y-6 hover:bg-white/10 transition-all cursor-default group">
                    <div className="flex justify-center gap-1 text-gold">
                       {[...Array(t.rating)].map((_, j) => <svg key={j} className="w-4 h-4 fill-current group-hover:scale-125 transition-transform" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                    </div>
                    <p className="italic font-light text-stone-300 text-base leading-relaxed">"{t.text}"</p>
                    <div className="font-serif text-gold text-xl">— {t.name}</div>
                 </div>
               ))}
            </div>
            <div className="pt-10">
               <a href="https://google.com/reviews" target="_blank" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50 hover:text-gold transition-colors">Alle Google Rezensionen lesen</a>
            </div>
         </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-white px-8">
        <div className="max-w-4xl mx-auto space-y-20">
           <div className="text-center space-y-4">
              <h2 className="text-5xl font-serif text-stone-900">FAQ</h2>
              <p className="text-stone-400 font-light text-sm">Häufige Fragen zu unseren Behandlungen.</p>
           </div>
           <div className="space-y-4">
              {FAQS.map((f, i) => <FAQItem key={i} faq={f} />)}
           </div>
        </div>
      </section>

      {/* Contact & Directions */}
      <section id="contact" className="py-32 px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-24">
          <div className="lg:col-span-5 space-y-20">
            <div className="space-y-8">
              <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Besuchen Sie uns</span>
              <h2 className="text-6xl md:text-7xl font-serif text-stone-900 leading-none">Kontakt & <br/><span className="italic text-gold">Anfahrt</span></h2>
            </div>
            
            <div className="space-y-12">
               <div className="flex gap-8 group cursor-default">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-100 bg-white flex items-center justify-center text-gold group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-stone-400">Anschrift</h4>
                    <p className="text-2xl font-serif text-stone-800">Eschersheimer Landstr. 12, 60322 Frankfurt</p>
                  </div>
               </div>
               <div className="flex gap-8 group cursor-default">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-100 bg-white flex items-center justify-center text-gold group-hover:bg-stone-900 group-hover:text-white transition-all shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-stone-400">Email & Telefon</h4>
                    <p className="text-2xl font-serif text-stone-800 underline decoration-gold/30">069 / 123 456 78</p>
                    <p className="text-sm font-light text-stone-500">info@beauty-mosaic.de</p>
                  </div>
               </div>
            </div>

            <div className="flex gap-6">
               {['Instagram', 'WhatsApp', 'Facebook'].map(s => (
                 <a key={s} href="#" className="px-8 py-4 border-2 border-stone-100 rounded-full hover:border-gold hover:text-gold transition-all text-[10px] font-black uppercase tracking-widest bg-white shadow-sm">{s}</a>
               ))}
            </div>
          </div>

          <div className="lg:col-span-7 h-[650px] rounded-[3rem] overflow-hidden shadow-2xl border-[16px] border-white group">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2558.5539506649896!2d8.67504447723999!3d50.11333791230113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd094f0609b551%3A0x673c9459207e0c03c!2sEschersheimer%20Landstra%C3%9Fe%2012%2C%2060322%20Frankfurt%20am%20Main!5e0!3m2!1sen!2sde!4v1709400000000!5m2!1sen!2sde"
               className="w-full h-full border-0 group-hover:scale-105 transition-transform duration-[4000ms]"
               allowFullScreen
               loading="lazy"
               title="Mosaic Studio Frankfurt Location"
             ></iframe>
          </div>
        </div>
      </section>

      {/* Online Booking Placeholder Section */}
      <section id="booking" className="py-40 bg-white px-8">
         <div className="max-w-4xl mx-auto bg-stone-50 rounded-[4rem] p-12 md:p-24 text-center space-y-12 border border-stone-100">
            <div className="space-y-6">
               <h2 className="text-5xl md:text-7xl font-serif text-stone-900 tracking-tight">Zeit für <span className="text-gold italic">Sich selbst</span></h2>
               <p className="text-stone-400 font-light text-lg">Wählen Sie Ihren Wunschtermin bequem online aus. Keine Wartezeit.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
               <button className="px-14 py-6 bg-stone-900 text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-full shadow-2xl hover:bg-gold transition-all shimmer-btn">Jetzt Buchen</button>
               <button className="px-14 py-6 border-2 border-stone-200 text-stone-900 font-black text-[11px] uppercase tracking-[0.4em] rounded-full hover:border-gold hover:text-gold transition-all bg-white">Gutschein kaufen</button>
            </div>
            <p className="text-[10px] uppercase font-bold text-stone-300 tracking-[0.3em]">Oder rufen Sie uns an: 069 / 123 456 78</p>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-500 py-32 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-24">
          <div className="col-span-2 space-y-12">
             <span className="text-4xl font-serif font-black text-white tracking-tighter">BEAUTY MOSAIC</span>
             <p className="max-w-sm text-lg font-light leading-relaxed text-stone-400">
               Ihr Frankfurter Studio für exklusive Hautästhetik. Präzision trifft Wohlbefinden.
             </p>
             <div className="flex gap-12">
                <div className="space-y-2">
                   <div className="text-white text-3xl font-serif">A+</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-gold">Hygiene Rating</div>
                </div>
                <div className="space-y-2">
                   <div className="text-white text-3xl font-serif">9y+</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-gold">Studio Jubiläum</div>
                </div>
             </div>
          </div>
          <div className="space-y-10">
             <h4 className="text-white text-[11px] font-black uppercase tracking-widest border-b border-gold/20 pb-4">Menu</h4>
             <ul className="space-y-6 text-[10px] tracking-widest uppercase font-bold">
               <li><a href="#about-us" className="hover:text-gold transition-colors">Über Uns</a></li>
               <li><a href="#services" className="hover:text-gold transition-colors">Services</a></li>
               <li><a href="#prices" className="hover:text-gold transition-colors">Preise & Pakete</a></li>
               <li><a href="#results" className="hover:text-gold transition-colors">Ergebnisse</a></li>
             </ul>
          </div>
          <div className="space-y-10">
             <h4 className="text-white text-[11px] font-black uppercase tracking-widest border-b border-gold/20 pb-4">Öffnungszeiten</h4>
             <ul className="space-y-6 text-[10px] tracking-widest uppercase font-bold">
               <li className="flex justify-between"><span>Mo - Fr</span> <span className="text-white">10 - 19 Uhr</span></li>
               <li className="flex justify-between"><span>Sa</span> <span className="text-white">10 - 15 Uhr</span></li>
               <li className="flex justify-between"><span>So</span> <span className="text-white">Geschlossen</span></li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em]">
           <span>&copy; {new Date().getFullYear()} Kosmetikstudio Beauty Mosaic Frankfurt</span>
           <div className="flex gap-12">
             <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
             <a href="#" className="hover:text-white transition-colors">Impressum</a>
             <a href="#" className="text-gold">Site by Lux Digital</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;