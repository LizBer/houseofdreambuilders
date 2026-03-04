import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import { Play, Loader2, Sparkles, AlertCircle, ExternalLink } from "lucide-react";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VideoGenerator = () => {
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("");

  const messages = [
    "Architecting neural pathways...",
    "Rendering stunning AI designs...",
    "Accelerating vision...",
    "Crafting cinematic motion...",
    "Finalizing the dream..."
  ];

  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      setHasKey(true);
    }
  };

  const generateVideo = async () => {
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);
    
    let messageIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[messageIndex % messages.length]);
      messageIndex++;
    }, 4000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: 'A cinematic, high-speed journey through a futuristic architectural landscape of glowing neural networks and sleek AI systems, representing acceleration and stunning design, 4k, professional lighting, fluid motion.',
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });
        
        if (!response.ok) throw new Error("Failed to fetch generated video");
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } else {
        throw new Error("No video link received from the model.");
      }
    } catch (err: any) {
      console.error("Video generation error:", err);
      if (err.message?.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key session expired or invalid. Please select your key again.");
      } else {
        setError(err.message || "An unexpected error occurred during generation.");
      }
    } finally {
      clearInterval(interval);
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-dark text-brand-paper overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#F27D26_0%,transparent_50%)] blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-brand-accent-pink font-bold">Vision Lab</p>
            <h2 className="text-5xl md:text-7xl font-serif leading-tight">
              Accelerate <br /> <span className="italic text-gradient">Your Vision</span>
            </h2>
            <p className="text-xl text-brand-paper/60 leading-relaxed max-w-lg">
              Experience the future of boutique AI. Use our custom Veo integration to generate a cinematic vision of acceleration and stunning design.
            </p>
            
            <div className="pt-8 space-y-4">
              {!hasKey ? (
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-4 max-w-md">
                    <AlertCircle className="w-6 h-6 text-brand-accent-orange shrink-0" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">API Key Required</p>
                      <p className="text-xs text-brand-paper/40 leading-relaxed">
                        To generate high-quality AI video, you must select a paid Google Cloud API key. 
                        <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-brand-accent-pink hover:underline ml-1 inline-flex items-center gap-1">
                          Learn about billing <ExternalLink className="w-3 h-3" />
                        </a>
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={handleSelectKey}
                    className="px-8 py-4 bg-brand-paper text-brand-dark rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-accent-pink hover:text-white transition-all flex items-center gap-3"
                  >
                    Select API Key to Begin
                  </button>
                </div>
              ) : (
                <button 
                  onClick={generateVideo}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-gradient-brand text-white rounded-full font-bold uppercase tracking-widest text-sm hover:shadow-2xl hover:shadow-brand-accent-pink/20 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Vision...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate Acceleration Video
                    </>
                  )}
                </button>
              )}
              
              {error && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-brand-accent-orange text-sm font-medium flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.p>
              )}
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-6"
                >
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-2 border-brand-accent-pink/20 border-t-brand-accent-pink animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-brand-accent-pink animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-xl font-serif italic">{loadingMessage}</p>
                    <p className="text-xs font-mono uppercase tracking-widest text-brand-paper/40">This may take a few minutes</p>
                  </div>
                </motion.div>
              ) : videoUrl ? (
                <motion.video 
                  key="video"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={videoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <motion.div 
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <Play className="w-8 h-8 text-brand-paper/20" />
                  </div>
                  <p className="text-brand-paper/40 font-mono text-sm uppercase tracking-widest">
                    Your generated vision will appear here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
