
import React, { useState, useEffect, useRef } from 'react';
import Hero3D from './components/Hero3D';
import VeoSection from './components/VeoSection';

const TREATMENTS = [
  { 
    id: "1", 
    title: "Facial Care", 
    cat: "Skin", 
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800", 
    desc: "Advanced medical-grade facials using premium botanical serums.", 
    price: "€120" 
  },
  { 
    id: "2", 
    title: "Microneedling", 
    cat: "Skin", 
    img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800", 
    desc: "Stimulate natural collagen with our gold-plated precision technology.", 
    price: "€180" 
  },
  { 
    id: "3", 
    title: "PRP Therapy", 
    cat: "Body", 
    img: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?auto=format&fit=crop&q=80&w=800", 
    desc: "Regenerative plasma treatments for revitalized skin texture.", 
    price: "€350" 
  },
  { 
    id: "4", 
    title: "Permanent Makeup", 
    cat: "Beauty", 
    img: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800", 
    desc: "Expertly defined features using hypoallergenic mineral pigments.", 
    price: "€450" 
  },
  { 
    id: "5", 
    title: "Lash Extensions", 
    cat: "Beauty", 
    img: "https://images.unsplash.com/photo-1621081541299-f47ec724773c?auto=format&fit=crop&q=80&w=800", 
    desc: "Hand-crafted silk extensions for an effortless morning glow.", 
    price: "€85" 
  },
  { 
    id: "6", 
    title: "Body Sculpting", 
    cat: "Body", 
    img: "https://images.unsplash.com/photo-1519824141121-99745c23ef3e?auto=format&fit=crop&q=80&w=800", 
    desc: "Non-invasive contouring sessions using clinical sculpting tech.", 
    price: "€220" 
  },
  { 
    id: "7", 
    title: "Glow Peel", 
    cat: "Skin", 
    img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800", 
    desc: "Instant luminosity through specialized AHA/BHA luxury peels.", 
    price: "€95" 
  },
  { 
    id: "8", 
    title: "Dermaplaning", 
    cat: "Skin", 
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=800", 
    desc: "Precision exfoliation for glass-like skin and product absorption.", 
    price: "€75" 
  }
];

const TreatmentCard: React.FC<{ treatment: any, index: number }> = ({ treatment, index }) => {
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
      className={`group relative bg-white rounded-[2.5rem] p-4 border border-stone-100/50 shadow-sm transition-all duration-700 hover:-translate-y-4 hover:shadow-2xl hover:border-gold/30 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6">
        <img src={treatment.img} alt={treatment.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="absolute top-6 right-6 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-xl">
          <span className="text-gold font-bold text-xs tracking-widest">{treatment.price}</span>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gold font-bold text-[9px] uppercase tracking-[0.4em]">{treatment.cat}</span>
          <div className="flex gap-0.5">
             {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-1 bg-gold/30 rounded-full"></div>)}
          </div>
        </div>
        <h3 className="text-2xl font-serif text-stone-900 group-hover:text-gold transition-colors">{treatment.title}</h3>
        <p className="text-stone-400 text-xs font-light leading-relaxed h-12 overflow-hidden line-clamp-2">{treatment.desc}</p>
        
        <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500">
           <button className="shimmer-btn px-6 py-2.5 bg-stone-900 text-white text-[9px] font-bold uppercase tracking-widest rounded-full hover:bg-gold transition-all">
             Book Now
           </button>
           <div className="w-8 h-8 rounded-full border border-stone-100 flex items-center justify-center text-stone-300 hover:text-gold hover:border-gold transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
           </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const pos = ((x - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pos)));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none border-4 border-white shadow-2xl"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200')` }}>
        <span className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Initial State</span>
      </div>
      <div 
        className="absolute inset-0 bg-cover bg-center border-l-2 border-white"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&q=80&w=1200')`,
          clipPath: `inset(0 0 0 ${sliderPos}%)`
        }}
      >
        <span className="absolute bottom-6 right-6 bg-gold/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">Active Glow</span>
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] z-10" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-2 border-stone-50 transition-transform active:scale-125">
           <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7l-4 4m0 0l4 4m-4-4h18m-4 4l4-4m0 0l-4-4"></path></svg>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredTreatments = activeCat === 'All' 
    ? TREATMENTS 
    : TREATMENTS.filter(t => t.cat === activeCat);

  return (
    <div className="min-h-screen">
      <a 
        href="https://salonized.com" 
        className="fixed bottom-10 right-10 z-[100] px-8 py-5 bg-gold text-white rounded-full font-bold uppercase tracking-[0.3em] text-[10px] shadow-2xl animate-gold-pulse shimmer-btn flex items-center gap-3 transition-transform hover:scale-105 active:scale-95"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/></svg>
        Book Appointment
      </a>

      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-stone-100/50">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="flex flex-col -space-y-1">
                <span className="text-3xl font-serif font-black tracking-tight text-stone-900">BEAUTY QLUB</span>
                <span className="text-[10px] uppercase tracking-[0.6em] text-gold font-bold">Berlin Clinic</span>
             </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-12 text-[10px] font-black text-stone-600 uppercase tracking-[0.25em]">
            <a href="#home" className="nav-link hover:text-gold transition-all">Home</a>
            <a href="#treatments" className="nav-link hover:text-gold transition-all">Treatments</a>
            <a href="#results" className="nav-link hover:text-gold transition-all">Results</a>
            <a href="#about" className="nav-link hover:text-gold transition-all">Clinic</a>
            <a href="https://salonized.com" className="shimmer-btn px-10 py-3.5 bg-stone-900 text-white rounded-full hover:bg-gold transition-all shadow-2xl gold-glow border-2 border-transparent hover:border-gold">Book Now</a>
          </div>
        </div>
      </nav>

      <header id="home" className="relative h-screen flex items-center overflow-hidden bg-stone-100">
        <Hero3D />
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519415510236-855911993da4?auto=format&fit=crop&q=80&w=1920" 
            alt="Clinic Interior" 
            className="w-full h-full object-cover transition-transform duration-1000 scale-105 opacity-80"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-50/95 via-stone-50/60 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-20">
          <div className="max-w-3xl space-y-10">
             <div className="inline-flex items-center gap-4">
                <span className="w-8 h-px bg-gold"></span>
                <span className="text-gold font-bold tracking-[0.4em] uppercase text-[10px]">Excellence in Dermatology</span>
             </div>
             <h1 className="text-8xl md:text-[130px] font-serif text-stone-900 leading-[0.85] -ml-2 tracking-tighter">
                Elevate Your <br/><span className="italic text-gold">Natural Glow</span>
             </h1>
             <p className="text-stone-500 max-w-sm font-light text-lg leading-relaxed border-l-2 border-gold/20 pl-8">
               Bespoke clinical aesthetics in the heart of Berlin Charlottenburg.
             </p>
             <div className="flex flex-wrap gap-8 pt-6">
                <button className="shimmer-btn px-14 py-6 bg-gold text-white font-black text-[11px] uppercase tracking-[0.4em] rounded-full shadow-2xl hover:shadow-gold/20 transition-all">
                  Explore Treatments
                </button>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-4">
                    {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-stone-200 overflow-hidden shadow-sm">
                       <img src={`https://images.unsplash.com/photo-${[
                         '1534528741775-53994a69daeb',
                         '1531746020798-e6953c6e8e04',
                         '1507003211169-0a1dd7228f2d',
                         '1494790108377-be9c29b29330'
                       ][i-1]}?auto=format&fit=crop&q=80&w=100`} alt="user" className="w-full h-full object-cover" />
                    </div>)}
                  </div>
                  <div className="space-y-0.5">
                    <div className="text-[11px] font-black text-stone-900 tracking-widest uppercase">5.0 Star Clinic</div>
                    <div className="text-[9px] font-bold text-stone-400 tracking-widest uppercase">Based on 1,200+ Reviews</div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </header>

      <section id="treatments" className="py-40 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
            <div className="space-y-6">
              <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Our Treatment Menu</span>
              <h2 className="text-7xl font-serif text-stone-900 tracking-tight leading-none">Curated <span className="italic text-gold">Artistry</span></h2>
            </div>
            
            <div className="flex gap-4 p-1.5 bg-stone-50 rounded-full border border-stone-100">
               {['All', 'Skin', 'Body', 'Beauty'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setActiveCat(cat)}
                   className={`px-8 py-3 text-[9px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 ${activeCat === cat ? 'bg-stone-900 text-white shadow-xl' : 'text-stone-400 hover:text-stone-900'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {filteredTreatments.map((t, idx) => (
              <TreatmentCard key={t.id} treatment={t} index={idx} />
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="py-40 bg-stone-50 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div className="space-y-16 order-2 lg:order-1">
            <div className="space-y-6">
              <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">Real Transformations</span>
              <h2 className="text-7xl font-serif text-stone-900 leading-[0.9]">Visible <br/><span className="italic text-gold">Confidence</span></h2>
            </div>
            <p className="text-stone-500 text-xl font-light leading-relaxed max-w-md">
              Our clinical approach focuses on refinement over radical change. We use high-end medical products to enhance what is already there.
            </p>
            <div className="grid grid-cols-2 gap-16">
               <div className="space-y-2 group cursor-default">
                  <h4 className="text-5xl font-serif text-stone-900 transition-colors group-hover:text-gold">98%</h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">Recurring Patients</p>
               </div>
               <div className="space-y-2 group cursor-default">
                  <h4 className="text-5xl font-serif text-stone-900 transition-colors group-hover:text-gold">15+</h4>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-black text-stone-400">Years Experience</p>
               </div>
            </div>
            <button className="group text-stone-900 font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 hover:gap-10 transition-all">
              Clinical Gallery <div className="w-20 h-px bg-gold group-hover:w-32 transition-all"></div>
            </button>
          </div>
          <div className="order-1 lg:order-2">
            <BeforeAfterSlider />
          </div>
        </div>
      </section>

      <VeoSection />

      <section className="bg-stone-900 py-48 overflow-hidden relative">
         <div className="absolute inset-0 opacity-15">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover grayscale">
               <source src="https://assets.mixkit.co/videos/preview/mixkit-facial-treatment-in-a-beauty-salon-40337-large.mp4" type="video/mp4" />
            </video>
         </div>
         <div className="relative z-10 max-w-7xl mx-auto px-8 text-center space-y-8">
            <h2 className="text-8xl md:text-[140px] font-serif text-white tracking-tighter leading-none">
               Where <span className="text-gold italic">Science</span> <br/>Meets <span className="text-white">Beauty</span>
            </h2>
            <div className="flex items-center justify-center gap-6 pt-4">
               <span className="w-12 h-px bg-gold/50"></span>
               <p className="text-gold/60 uppercase tracking-[0.8em] text-[11px] font-black">Berlin Charlottenburg Lounge</p>
               <span className="w-12 h-px bg-gold/50"></span>
            </div>
         </div>
      </section>

      <section id="contact" className="py-40 px-8 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-32">
          <div className="lg:col-span-5 space-y-20">
            <div className="space-y-8">
              <span className="text-gold font-bold tracking-[0.5em] uppercase text-[10px]">The Lounge Location</span>
              <h2 className="text-7xl font-serif text-stone-900 leading-none">Your <span className="italic text-gold">Quiet</span> <br/>Sanctuary</h2>
            </div>
            
            <div className="space-y-12">
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-50 bg-stone-50 flex items-center justify-center text-gold group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-stone-400">Address</h4>
                    <p className="text-2xl font-serif">Ludwigkirchstraße 14, 10719 Berlin</p>
                  </div>
               </div>
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 rounded-full border-2 border-stone-50 bg-stone-50 flex items-center justify-center text-gold group-hover:bg-stone-900 group-hover:text-white transition-all duration-500 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-stone-400">Direct Contact</h4>
                    <p className="text-2xl font-serif underline decoration-gold/30 decoration-2 transition-all hover:decoration-gold">hello@beautyqlub.de</p>
                  </div>
               </div>
            </div>

            <div className="flex gap-6">
               {['Instagram', 'WhatsApp'].map(s => (
                 <a key={s} href="#" className="text-[10px] font-black uppercase tracking-[0.3em] px-10 py-4 border-2 border-stone-50 rounded-full hover:border-gold hover:text-gold transition-all">{s}</a>
               ))}
            </div>
          </div>

          <div className="lg:col-span-7 h-[700px] rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white grayscale hover:grayscale-0 transition-all duration-1000 group">
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.468205463776!2d13.323568777174624!3d25.49881882674488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a850e02c61099b%3A0xc3c9459207e0c03c!2sLudwigkirchstra%C3%9Fe%2014%2C%2010719%20Berlin!5e0!3m2!1sen!2sde!4v1709400000000!5m2!1sen!2sde"
               className="w-full h-full border-0 scale-105 group-hover:scale-100 transition-transform duration-1000"
               allowFullScreen
               loading="lazy"
               title="Clinic Location"
             ></iframe>
          </div>
        </div>
      </section>

      <footer className="bg-stone-900 text-stone-500 py-32 px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-24">
          <div className="col-span-2 space-y-12">
             <span className="text-5xl font-serif font-black text-white tracking-tighter">BEAUTY QLUB</span>
             <p className="max-w-sm text-lg font-light leading-relaxed text-stone-400">
               Berlin's premier destination for clinical aesthetics and luxury self-reclamation. Precision in every touch.
             </p>
             <div className="flex gap-10">
                <div className="space-y-2">
                   <div className="text-white text-3xl font-serif">5.0</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-gold">Google Rating</div>
                </div>
                <div className="space-y-2">
                   <div className="text-white text-3xl font-serif">10k+</div>
                   <div className="text-[9px] font-black uppercase tracking-widest text-gold">Treatments</div>
                </div>
             </div>
          </div>
          <div className="space-y-12">
             <h4 className="text-white text-[11px] font-black uppercase tracking-widest border-b border-gold/20 pb-4">Menu</h4>
             <ul className="space-y-6 text-[10px] tracking-widest uppercase font-bold">
               <li><a href="#home" className="hover:text-gold transition-colors">Hero Lounge</a></li>
               <li><a href="#treatments" className="hover:text-gold transition-colors">Treatment Menu</a></li>
               <li><a href="#results" className="hover:text-gold transition-colors">Before & After</a></li>
               <li><a href="#veo-studio" className="hover:text-gold transition-colors">AI Visualization</a></li>
             </ul>
          </div>
          <div className="space-y-12">
             <h4 className="text-white text-[11px] font-black uppercase tracking-widest border-b border-gold/20 pb-4">Berlin Hours</h4>
             <ul className="space-y-6 text-[10px] tracking-widest uppercase font-bold">
               <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">09 - 19</span></li>
               <li className="flex justify-between"><span>Sat</span> <span className="text-white">10 - 16</span></li>
               <li className="flex justify-between"><span>Sun</span> <span className="text-white">Closed</span></li>
               <li className="pt-4 text-gold/60 text-[8px]">Available for Private Bookings</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-32 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.4em]">
           <span>&copy; {new Date().getFullYear()} Beauty Qlub Berlin</span>
           <div className="flex gap-12">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Imprint</a>
             <a href="#" className="text-gold">Site by Digital Luxe</a>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
