import React, { useEffect, useState } from 'react';
import { Lock, ExternalLink } from 'lucide-react';

interface ApiKeySelectorProps {
  onKeySelected: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onKeySelected }) => {
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkKey();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkKey = async () => {
    try {
      const aistudio = (window as any).aistudio;
      if (aistudio && await aistudio.hasSelectedApiKey()) {
        onKeySelected();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSelectKey = async () => {
    const aistudio = (window as any).aistudio;
    if (!aistudio) {
      alert("AI Studio environment not detected.");
      return;
    }
    try {
      await aistudio.openSelectKey();
      // Assume success and proceed to avoid race conditions
      onKeySelected();
    } catch (error) {
      console.error("Key selection failed:", error);
      // Reset and try again logic could go here
    }
  };

  if (isChecking) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-brand-500" />
        </div>
        <h1 className="text-2xl font-bold mb-4 font-sans">تایید هویت</h1>
        <p className="text-slate-400 mb-8 leading-relaxed">
          برای استفاده از مدل پیشرفته <span className="text-white font-mono font-bold">Gemini 3 Pro</span> و تولید تصاویر با کیفیت بالا، لطفاً کلید API خود را انتخاب کنید.
        </p>
        
        <button 
          onClick={handleSelectKey}
          className="w-full py-4 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-brand-500/25 mb-6"
        >
          انتخاب API Key
        </button>

        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-brand-400 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          اطلاعات بیشتر درباره تعرفه‌ها
        </a>
      </div>
    </div>
  );
};