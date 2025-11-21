import React, { useState } from 'react';
import { ApiKeySelector } from './components/ApiKeySelector';
import { StepAspectRatio, StepStyle, StepColor, StepPrompt } from './components/Steps';
import { ImageConfig, AspectRatio, ArtStyle, Step } from './types';
import { generateImageWithGemini } from './services/geminiService';
import { ChevronLeft, ChevronRight, Loader2, Download, RefreshCcw, Sparkles } from 'lucide-react';

const INITIAL_CONFIG: ImageConfig = {
  aspectRatio: AspectRatio.Square,
  style: ArtStyle.Realistic,
  primaryColor: null,
  isGradient: false,
  removeBackground: false,
  prompt: '',
  referenceImage: null,
};

export default function App() {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [step, setStep] = useState<Step>('aspect');
  const [config, setConfig] = useState<ImageConfig>(INITIAL_CONFIG);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateConfig = (updates: Partial<ImageConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => {
    if (step === 'aspect') setStep('style');
    else if (step === 'style') setStep('color');
    else if (step === 'color') setStep('prompt');
    else if (step === 'prompt') handleGenerate();
  };

  const handleBack = () => {
    if (step === 'style') setStep('aspect');
    else if (step === 'color') setStep('style');
    else if (step === 'prompt') setStep('color');
    else if (step === 'result') {
        setGeneratedImage(null);
        setStep('prompt');
    }
  };

  const handleGenerate = async () => {
    if (!config.prompt.trim()) {
      setError('لطفا توضیحات تصویر را وارد کنید');
      return;
    }
    setError(null);
    setIsGenerating(true);
    setStep('generating');

    try {
      const imageUrl = await generateImageWithGemini(config);
      setGeneratedImage(imageUrl);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError('خطایی در تولید تصویر رخ داد. لطفا مجدد تلاش کنید.');
      setStep('prompt');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setConfig(INITIAL_CONFIG);
    setStep('aspect');
  };

  if (!hasApiKey) {
    return <ApiKeySelector onKeySelected={() => setHasApiKey(true)} />;
  }

  // Steps Metadata
  const getStepInfo = () => {
    switch (step) {
      case 'aspect': return { title: 'انتخاب ابعاد', subtitle: 'سایز تصویر خروجی را مشخص کنید' };
      case 'style': return { title: 'سبک طراحی', subtitle: 'استایل هنری مورد نظر را انتخاب کنید' };
      case 'color': return { title: 'تنظیمات رنگ', subtitle: 'پالت رنگی و افکت‌ها' };
      case 'prompt': return { title: 'توصیف تصویر', subtitle: 'جزئیات چیزی که در ذهن دارید' };
      case 'generating': return { title: 'در حال طراحی', subtitle: 'هوش مصنوعی مشغول کار است...' };
      case 'result': return { title: 'پایان کار', subtitle: 'شاهکار شما آماده است' };
      default: return { title: '', subtitle: '' };
    }
  };

  const stepInfo = getStepInfo();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex items-center justify-center p-4 md:p-8 font-sans">
      
      {/* Main Container */}
      <div className="w-full max-w-2xl bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-800 overflow-hidden relative min-h-[600px] flex flex-col">
        
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-brand-500/5 blur-[100px] rounded-full pointer-events-none" />

        {/* Header */}
        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center justify-between mb-6">
             <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400 flex items-center gap-2">
               <Sparkles className="w-6 h-6 text-brand-400" />
               DreamCanvas AI
             </h1>
             {step !== 'aspect' && step !== 'generating' && (
               <button onClick={handleBack} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                 <ChevronRight className="w-6 h-6" />
               </button>
             )}
          </div>

          {/* Progress Bar */}
          {step !== 'result' && step !== 'generating' && (
            <div className="flex gap-2 mb-6">
              {['aspect', 'style', 'color', 'prompt'].map((s, i) => {
                const steps = ['aspect', 'style', 'color', 'prompt'];
                const currentIndex = steps.indexOf(step);
                const thisIndex = i;
                const isActive = thisIndex <= currentIndex;
                
                return (
                  <div key={s} className="h-1 flex-1 rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} 
                    />
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-1">
             <h2 className="text-3xl font-bold text-white">{stepInfo.title}</h2>
             <p className="text-slate-400">{stepInfo.subtitle}</p>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 pt-2 relative z-10 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-200 rounded-xl text-sm">
              {error}
            </div>
          )}

          {step === 'aspect' && <StepAspectRatio selected={config.aspectRatio} onSelect={(r) => updateConfig({ aspectRatio: r })} />}
          {step === 'style' && <StepStyle selected={config.style} onSelect={(s) => updateConfig({ style: s })} />}
          {step === 'color' && <StepColor config={config} onChange={updateConfig} />}
          {step === 'prompt' && <StepPrompt config={config} onChange={updateConfig} />}
          
          {step === 'generating' && (
            <div className="flex flex-col items-center justify-center h-64 gap-6">
              <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-brand-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-brand-500 animate-pulse" />
                </div>
              </div>
              <p className="text-slate-400 animate-pulse">در حال ارتباط با Gemini 3 Pro...</p>
            </div>
          )}

          {step === 'result' && generatedImage && (
            <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 group">
                <img src={generatedImage} alt="Generated" className="max-h-[400px] w-auto object-contain" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
                    <a 
                      href={generatedImage} 
                      download={`dreamcanvas-${Date.now()}.png`}
                      className="bg-white text-black font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <Download className="w-5 h-5" />
                      دانلود تصویر
                    </a>
                </div>
              </div>
              
              <div className="flex gap-4 w-full">
                 <button 
                   onClick={handleReset} 
                   className="flex-1 py-4 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                 >
                   <RefreshCcw className="w-5 h-5" />
                   طراحی جدید
                 </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {step !== 'generating' && step !== 'result' && (
          <div className="p-8 border-t border-slate-800 bg-[#0f172a]/50 backdrop-blur-md sticky bottom-0 z-20">
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-brand-600 to-accent-600 hover:from-brand-500 hover:to-accent-500 text-white font-bold rounded-xl text-lg shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99]"
            >
              {step === 'prompt' ? 'شروع طراحی' : 'مرحله بعد'}
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
