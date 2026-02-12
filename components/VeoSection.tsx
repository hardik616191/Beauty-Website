
import React, { useState, useRef } from 'react';
import { VideoAspectRatio, VideoGenerationState } from '../types';
import { generateVeoVideo, fileToBase64, openApiKeySelector, checkApiKeySelection } from '../services/geminiService';

const VeoSection: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<VideoAspectRatio>(VideoAspectRatio.LANDSCAPE);
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
        setState(prev => ({ ...prev, error: "Failed to load image." }));
      }
    }
  };

  const handleGenerate = async () => {
    if (!image) {
      setState(prev => ({ ...prev, error: "Please upload an image first." }));
      return;
    }

    const hasKey = await checkApiKeySelection();
    if (!hasKey) {
      await openApiKeySelector();
    }

    setState({ isGenerating: true, status: 'Initializing AI...', videoUrl: null, error: null });

    try {
      const videoUrl = await generateVeoVideo(image, prompt, aspectRatio, (status) => {
        setState(prev => ({ ...prev, status }));
      });
      setState({ isGenerating: false, status: 'Complete', videoUrl, error: null });
    } catch (err: any) {
      setState({ 
        isGenerating: false, 
        status: '', 
        videoUrl: null, 
        error: err.message || "Failed to generate AI visual." 
      });
    }
  };

  return (
    <section id="veo-studio" className="py-24 bg-stone-50 px-6 border-y border-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-serif text-stone-800 mb-2 uppercase tracking-tight"><span className="text-purple-600">AI</span> VIRTUAL STUDIO</h2>
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-stone-400">Bring your beauty vision to life</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
            <div>
              <label className="block text-xs font-bold text-stone-400 mb-4 uppercase tracking-[0.2em]">1. Reference Photo</label>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="w-full aspect-video border-2 border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center hover:border-purple-300 transition-all bg-stone-50 overflow-hidden"
              >
                {image ? (
                  <img src={image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="text-center">
                    <svg className="w-8 h-8 text-stone-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">Select Style</span>
                  </div>
                )}
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-400 mb-4 uppercase tracking-[0.2em]">2. Vision Details</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your desired glow, soft lighting, hair movement..."
                className="w-full p-4 rounded-xl border border-stone-100 focus:border-purple-300 outline-none h-32 text-sm bg-stone-50 transition-colors"
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={state.isGenerating}
              className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] text-white transition-all ${state.isGenerating ? 'bg-stone-300' : 'bg-purple-600 hover:bg-purple-700 shadow-lg hover:shadow-purple-200'}`}
            >
              {state.isGenerating ? 'Processing...' : 'Create AI Visualization'}
            </button>

            {state.error && <p className="text-xs text-red-500 font-medium text-center">{state.error}</p>}
          </div>

          <div className="lg:col-span-7 bg-stone-900 rounded-2xl overflow-hidden shadow-2xl relative min-h-[500px] flex items-center justify-center border-8 border-white">
            {state.isGenerating ? (
              <div className="text-center space-y-6">
                <div className="w-12 h-12 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-purple-400 text-xs font-bold uppercase tracking-[0.3em]">{state.status}</p>
              </div>
            ) : state.videoUrl ? (
              <video src={state.videoUrl} controls autoPlay loop className="w-full h-full object-cover" />
            ) : (
              <div className="text-center max-w-sm px-8">
                <div className="text-stone-700 mb-6 font-serif text-5xl">VEO</div>
                <p className="text-stone-500 text-sm font-light italic">Your cinematic style preview will be rendered here. Perfect for planning your next makeover.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VeoSection;
