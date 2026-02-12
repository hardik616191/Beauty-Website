
import React, { useState, useEffect } from 'react';
import Hero3D from './components/Hero3D';
import VeoSection from './components/VeoSection';

const SERVICES = [
  { id: "1", title: "Hydra Facial", desc: "Get healthy glowing skin with our premium Hydra Facial treatment.", img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=800" },
  { id: "2", title: "Mehndi", desc: "Traditional and modern Mehndi designs that tell your unique story.", img: "https://images.unsplash.com/photo-1590674519921-2e864be73562?auto=format&fit=crop&q=80&w=800" },
  { id: "3", title: "Threading", desc: "Expert eyebrow shaping and facial threading for a perfectly defined look.", img: "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800" },
  { id: "4", title: "Body Therapy", desc: "Release tension with our specialized therapeutic body scrubs and massages.", img: "https://images.unsplash.com/photo-1544161515-4af6b1d462c2?auto=format&fit=crop&q=80&w=800" },
  { id: "5", title: "Advanced Facial", desc: "Customized botanical facials tailored to your specific skin type.", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=800" },
  { id: "6", title: "Hair Treatment", desc: "Nourishing spa treatments for healthy, strong, and shiny hair.", img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800" },
  { id: "7", title: "Hair Styling", desc: "Precision cuts and styling by master stylists for your everyday glamour.", img: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&q=80&w=800" },
  { id: "8", title: "Bridal Package", desc: "Exquisite bridal makeup and styling for your most special day.", img: "https://images.unsplash.com/photo-1621259252343-26155a0225d3?auto=format&fit=crop&q=80&w=800" },
];

const App: React.FC = () => {
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.328325854743!2d72.50297437531478!3d23.04840507915579!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x46927d2c3ef39677!2sHardik%20Sonagra%20Studio!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Construct the URL to show the user's current live location with a pin
          setMapUrl(`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`);
        },
        (error) => {
          console.warn("Geolocation permission denied or error. Using default studio location.", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-stone-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-lg">H</div>
             <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Hardik Beauty</span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-purple-600 font-bold">Salons</span>
             </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-[11px] font-bold text-stone-600 uppercase tracking-[0.2em]">
            <a href="#home" className="hover:text-purple-600 transition-all">Home</a>
            <a href="#about" className="hover:text-purple-600 transition-all">About</a>
            <a href="#services" className="hover:text-purple-600 transition-all">Services</a>
            <a href="#veo-studio" className="hover:text-purple-600 transition-all">AI Studio</a>
            <a href="#contact" className="hover:text-purple-600 transition-all">Contact</a>
            <a href="#contact" className="ml-4 px-6 py-2.5 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors shadow-md">Book Now</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="relative h-screen flex items-center overflow-hidden bg-stone-100">
        <Hero3D />
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-50 grayscale-[0.1]"
          />
        </div>
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
          <div className="max-w-2xl animate-reveal">
             <span className="text-purple-600 font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Welcome to Opulence</span>
             <h1 className="text-7xl md:text-[140px] font-serif text-purple-600 leading-[0.85] mb-4">HARDIK</h1>
             <h2 className="text-4xl md:text-6xl font-serif text-stone-800 italic mb-8">Salon & Spa</h2>
             <p className="text-stone-500 max-w-sm mb-10 font-light tracking-wide text-base leading-relaxed">
               Crafting high-end experiences in the realm of beauty and wellness. Your journey to self-reclamation starts here.
             </p>
             <div className="flex gap-4">
                <a href="#services" className="px-10 py-4 bg-purple-600 text-white font-bold text-xs uppercase tracking-[0.2em] rounded shadow-xl hover:bg-purple-700 hover:-translate-y-1 transition-all">Explore Services</a>
                <a href="#veo-studio" className="px-10 py-4 border-2 border-stone-200 text-stone-800 font-bold text-xs uppercase tracking-[0.2em] rounded hover:border-purple-600 transition-all">AI Studio</a>
             </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24">
          <div className="flex-1 relative">
             <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-stone-50">
                <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1000" alt="Salon Experience" className="w-full h-auto" />
             </div>
             <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-purple-50 rounded-full z-0"></div>
             <div className="absolute top-1/2 -left-12 -translate-y-1/2 w-48 h-48 border-2 border-purple-100 rounded-full z-0"></div>
          </div>
          <div className="flex-1 space-y-8">
             <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-purple-600 block">The Visionary Experience</span>
                <h2 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
                  Where "Me Time" is Your Deserving <span className="italic text-purple-600">Opulence</span>.
                </h2>
             </div>
             <p className="text-stone-500 leading-relaxed font-light text-lg">
                At Hardik Beauty Salons, we believe beauty is an internal glow that we simply help manifest. Founded by <strong>Hardik Sonagra</strong>, our studio is more than just a salon—it's a sanctuary. 
             </p>
             <p className="text-stone-500 leading-relaxed font-light">
                We combine artisan techniques with modern technology, like our proprietary AI Studio, to give you a bespoke beauty experience that respects your individuality and celebrates your luxury.
             </p>
             <div className="grid grid-cols-2 gap-8 pt-6">
                <div>
                   <h4 className="font-serif text-2xl text-purple-600 mb-2">15+</h4>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Master Artists</p>
                </div>
                <div>
                   <h4 className="font-serif text-2xl text-purple-600 mb-2">5000+</h4>
                   <p className="text-[10px] uppercase tracking-widest font-bold text-stone-400">Happy Clients</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl font-serif text-stone-900 mb-4 tracking-tight"><span className="text-purple-600">Curated</span> Services</h2>
            <div className="w-24 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-[10px] uppercase font-bold tracking-[0.5em] text-stone-400">Excellence in every detail</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <div key={s.id} className="service-card group relative bg-white overflow-hidden h-[400px] rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-3xl font-serif mb-3">{s.title}</h3>
                  <p className="text-white/70 text-sm font-light leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">{s.desc}</p>
                  <div className="w-10 h-0.5 bg-purple-400 group-hover:w-full transition-all"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Studio Section */}
      <VeoSection />

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24">
            <div className="space-y-12">
              <div>
                <h2 className="text-6xl font-serif text-stone-900 mb-4">Connect With <span className="text-purple-600">Hardik</span></h2>
                <p className="text-stone-500 text-lg font-light leading-relaxed">
                  Ready for your transformation? Visit our studio or drop us a line for personalized consultations.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                   </div>
                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Phone</h4>
                      <p className="text-xl text-stone-800">9879730991</p>
                   </div>
                </div>

                <div className="flex items-center gap-6 group">
                   <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                      <svg className="w-6 h-6 text-purple-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                   </div>
                   <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-1">Email</h4>
                      <p className="text-xl text-stone-800">sonagrahardik2004@gmail.com</p>
                   </div>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden h-[300px] shadow-2xl border-4 border-stone-50 grayscale hover:grayscale-0 transition-all duration-1000">
                 <iframe 
                  src={mapUrl}
                  className="w-full h-full border-0" 
                  allowFullScreen={true} 
                  loading="lazy"
                  title="Live Location Map"
                ></iframe>
              </div>
            </div>

            <div className="bg-stone-50 p-12 rounded-3xl shadow-sm border border-stone-100">
              <h3 className="text-3xl font-serif text-stone-800 mb-8 border-b pb-4 border-stone-200">Send us a message</h3>
              {/* FormSubmit.co integration - replace with your actual email */}
              <form action="https://formsubmit.co/sonagrahardik2004@gmail.com" method="POST" className="space-y-6">
                <input type="hidden" name="_subject" value="New Contact from Hardik Beauty Salon" />
                <input type="hidden" name="_template" value="table" />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Full Name</label>
                    <input type="text" name="name" required placeholder="Enter Name" className="w-full p-4 bg-white border border-stone-100 rounded-lg outline-none focus:border-purple-300 transition-colors text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                    <input type="email" name="email" required placeholder="Enter Email" className="w-full p-4 bg-white border border-stone-100 rounded-lg outline-none focus:border-purple-300 transition-colors text-sm" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Phone Number</label>
                  <input type="text" name="phone" placeholder="Enter Phone" className="w-full p-4 bg-white border border-stone-100 rounded-lg outline-none focus:border-purple-300 transition-colors text-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Your Message</label>
                  <textarea name="message" required placeholder="Describe your inquiry..." className="w-full p-4 bg-white border border-stone-100 rounded-lg outline-none focus:border-purple-300 transition-colors h-40 text-sm resize-none" />
                </div>
                
                <button type="submit" className="w-full py-5 bg-purple-600 text-white font-bold text-xs uppercase tracking-[0.3em] rounded-lg shadow-xl hover:bg-purple-700 hover:shadow-purple-200 transform hover:-translate-y-1 transition-all">
                  Send your message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-serif text-xl font-bold shadow-md">H</div>
                <div className="flex flex-col -space-y-1">
                   <span className="text-2xl font-serif font-bold text-white tracking-tight">Hardik Beauty</span>
                   <span className="text-[11px] uppercase tracking-[0.2em] text-purple-400 font-bold">Salons</span>
                </div>
             </div>
             <p className="text-xs leading-relaxed mb-8 font-light text-stone-500">
               © {new Date().getFullYear()} Hardik Ventures Private Limited. <br/>Crafting Opulence for the Modern Individual.
             </p>
          </div>

          <div>
             <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-2">Salon Locations</h4>
             <ul className="space-y-6 text-xs font-light">
               <li className="flex items-start gap-3">
                 <span className="text-purple-600">◆</span>
                 <span>74-D Jami Commercial Street 9, <br/>Phase 2 Commercial Area DHA,<br/>Karachi, Pakistan</span>
               </li>
               <li className="flex items-start gap-3">
                 <span className="text-purple-600">◆</span>
                 <span>Saadabad Cooperative Housing<br/>Society, Block 4 Gulistan-e-<br/>Johar, Karachi</span>
               </li>
             </ul>
          </div>

          <div>
             <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-2">Quick Links</h4>
             <ul className="space-y-4 text-xs font-light uppercase tracking-widest">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#veo-studio" className="hover:text-white transition-colors">AI Visualization</a></li>
             </ul>
          </div>

          <div>
             <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-8 border-b border-white/10 pb-2">Connect</h4>
             <div className="flex gap-4 mb-8">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </div>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-purple-600 transition-all cursor-pointer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
             </div>
             <p className="text-[9px] text-stone-600 font-bold uppercase tracking-[0.3em]">Exclusively by Hardik Sonagra</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
