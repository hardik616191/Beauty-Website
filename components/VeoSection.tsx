
import React, { useState, useRef } from 'react';
import { VideoAspectRatio, VideoGenerationState } from '../types';
import { generateVeoVideo, fileToBase64, openApiKeySelector, checkApiKeySelection } from '../services/geminiService';

const VeoSection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<VideoGenerationState>({
    isGenerating: false,
    status: '',
    videoUrl: null,
    error: null,
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await fileToBase64(file);
        setImage(base64);
        setState(prev => ({ ...prev, error: null }));
      } catch (err) {
        setState(prev => ({ ...prev, error: "Failed to load reference image." }));
      }
    }
  };

  const handleGenerate = async () => {
    if (!image) {
      setState(prev => ({ ...prev, error: "Please upload a treatment reference photo." }));
      return;
    }

    const hasKey = await checkApiKeySelection();
    if (!hasKey) {
      await openApiKeySelector();
    }

    setState({ isGenerating: true, status: 'Simulating Glow...', videoUrl: null, error: null });

    try {
      const videoUrl = await generateVeoVideo(image, prompt, VideoAspectRatio.LANDSCAPE, (status) => {
        setState(prev => ({ ...prev, status }));
      });
      setState({ isGenerating: false, status: 'Simulation Ready', videoUrl, error: null });
    } catch (err: any) {
      setState({ 
        isGenerating: false, 
        status: '', 
        videoUrl: null, 
        error: err.message || "Visualization simulation failed." 
      });
    }
  };

  return (
    <section id="veo-studio" className="py-32 bg-stone-50 px-8 border-y border-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <span className="text-gold font-bold tracking-[0.5em] uppercase text-[9px]">Innovation Room</span>
          <h2 className="text-6xl font-serif text-stone-900 tracking-tighter">AI Cinematic Preview</h2>
          <p className="text-stone-400 max-w-lg mx-auto text-sm font-light">Visualize your aesthetic outcome before your session. Our clinic uses neural-rendering to simulate treatment effects.</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-4 space-y-10 bg-white p-10 rounded-[2.5rem] shadow-sm border border-stone-100">
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">1. Reference Profile</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-square border-2 border-dashed border-stone-100 rounded-[2rem] flex flex-col items-center justify-center hover:border-gold transition-all bg-stone-50 overflow-hidden group"
              >
                {image ? (
                  <img src={image} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                       <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    </div>
                    <span className="text-[9px] text-stone-400 font-bold uppercase tracking-widest block">Upload Portrait</span>
                  </div>
                )}
              </button>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-stone-400 uppercase tracking-widest">2. Simulation Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ex: Hydrated glowing skin, cinematic soft lighting, subtle rejuvenation..."
                className="w-full p-6 rounded-2xl border border-stone-100 focus:border-gold outline-none h-32 text-xs bg-stone-50 transition-colors resize-none"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={state.isGenerating}
              className={`w-full py-5 rounded-full font-bold uppercase tracking-[0.3em] text-[10px] text-white transition-all ${state.isGenerating ? 'bg-stone-300' : 'bg-gold hover:bg-stone-900 shadow-xl gold-glow'}`}
            >
              {state.isGenerating ? 'Rendering...' : 'Start Simulation'}
            </button>

            {state.error && <p className="text-[10px] text-red-400 font-bold text-center uppercase tracking-widest">{state.error}</p>}
          </div>

          <div className="lg:col-span-8 bg-stone-900 rounded-[3rem] overflow-hidden shadow-2xl relative min-h-[600px] flex items-center justify-center border-[12px] border-white">
            {state.isGenerating ? (
              <div className="text-center space-y-8">
                <div className="relative">
                   <div className="w-20 h-20 border-2 border-gold/20 border-t-gold rounded-full animate-spin mx-auto"></div>
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-2 border-gold/40 border-b-gold rounded-full animate-spin-slow"></div>
                   </div>
                </div>
                <p className="text-gold text-[10px] font-black uppercase tracking-[0.5em] animate-pulse">{state.status}</p>
              </div>
            ) : state.videoUrl ? (
              <video src={state.videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
            ) : (
              <div className="text-center max-w-md px-12 space-y-6">
                <div className="text-gold/20 font-serif text-[120px] leading-none mb-4">AI</div>
                <h4 className="text-white text-xl font-serif">Simulated Outcome Window</h4>
                <p className="text-stone-500 text-xs font-light leading-relaxed tracking-wide">
                  Your treatment visualization will render here. Please note: This simulation is for visual planning and cinematic preview only.
                </p>
                <div className="pt-8">
                  <div className="inline-block px-6 py-2 border border-stone-800 text-stone-700 text-[9px] uppercase tracking-widest rounded-full">Neural Rendering Active</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeoSection;
