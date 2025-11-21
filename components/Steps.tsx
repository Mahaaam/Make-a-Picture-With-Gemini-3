import React, { useState, useRef } from 'react';
import { AspectRatio, ArtStyle, ImageConfig } from '../types';
import { ASPECT_RATIOS, ART_STYLES, COLORS } from '../constants';
import { Check, Upload, X, Image as ImageIcon, Layers } from 'lucide-react';

// --- Step 1: Aspect Ratio ---
interface StepAspectRatioProps {
  selected: AspectRatio;
  onSelect: (ratio: AspectRatio) => void;
}

export const StepAspectRatio: React.FC<StepAspectRatioProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {ASPECT_RATIOS.map((ratio) => (
        <button
          key={ratio.id}
          onClick={() => onSelect(ratio.id)}
          className={`group relative p-6 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all duration-300 
            ${selected === ratio.id 
              ? 'border-brand-500 bg-brand-500/10 shadow-[0_0_30px_-10px_rgba(14,165,233,0.5)]' 
              : 'border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-800'}`}
        >
          <div className={`p-4 rounded-full transition-colors ${selected === ratio.id ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
            {ratio.icon}
          </div>
          <div className="text-center">
            <h3 className={`font-bold text-lg ${selected === ratio.id ? 'text-white' : 'text-slate-200'}`}>{ratio.label}</h3>
            <p className="text-xs text-slate-500 mt-1">{ratio.desc}</p>
          </div>
          {selected === ratio.id && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-lg">
              <Check className="w-3 h-3" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// --- Step 2: Style ---
interface StepStyleProps {
  selected: ArtStyle;
  onSelect: (style: ArtStyle) => void;
}

export const StepStyle: React.FC<StepStyleProps> = ({ selected, onSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {ART_STYLES.map((style) => (
        <button
          key={style.id}
          onClick={() => onSelect(style.id)}
          className={`group relative overflow-hidden rounded-2xl border-2 text-right transition-all duration-300 h-48
            ${selected === style.id 
              ? 'border-accent-500 shadow-[0_0_30px_-10px_rgba(139,92,246,0.5)]' 
              : 'border-slate-800 hover:border-slate-600'}`}
        >
          {/* Background Image with overlay */}
          <div className="absolute inset-0 z-0">
            <img src={style.img} alt={style.label} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity group-hover:scale-110 duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-end p-4">
            <div className={`mb-3 transition-transform duration-300 ${selected === style.id ? 'scale-110 translate-y-0' : 'translate-y-2 group-hover:translate-y-0'}`}>
               {style.icon}
            </div>
            <h3 className={`font-bold text-lg ${selected === style.id ? 'text-accent-400' : 'text-slate-200'}`}>{style.label}</h3>
          </div>
          
          {selected === style.id && (
            <div className="absolute top-3 left-3 w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center text-white shadow-lg z-20">
              <Check className="w-3 h-3" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// --- Step 3: Color & Details ---
interface StepColorProps {
  config: ImageConfig;
  onChange: (updates: Partial<ImageConfig>) => void;
}

export const StepColor: React.FC<StepColorProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Color Picker */}
      <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-brand-500 rounded-full"></span>
          تم رنگی قالب
        </h3>
        <div className="flex flex-wrap gap-3">
          <button
             onClick={() => onChange({ primaryColor: null })}
             className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all
               ${config.primaryColor === null ? 'border-brand-500 bg-slate-800 text-white' : 'border-slate-700 bg-slate-900 text-slate-500 hover:bg-slate-800'}`}
             title="بدون رنگ خاص"
          >
            <X className="w-5 h-5" />
          </button>
          {COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => onChange({ primaryColor: color.label })}
              className={`w-12 h-12 rounded-full border-2 transition-all relative group
                ${config.primaryColor === color.label ? 'border-white scale-110 shadow-xl' : 'border-transparent hover:scale-110'}`}
              style={{ backgroundColor: color.value }}
              title={color.label}
            >
              {config.primaryColor === color.label && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Check className={`w-5 h-5 ${color.id === 'white' ? 'text-black' : 'text-white'} drop-shadow-md`} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Gradient Toggle */}
        <div 
          onClick={() => onChange({ isGradient: !config.isGradient })}
          className={`cursor-pointer p-4 rounded-xl border-2 flex items-center justify-between transition-all
            ${config.isGradient ? 'border-pink-500 bg-pink-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.isGradient ? 'bg-gradient-to-br from-pink-500 to-purple-600 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">حالت گرادیانت</h4>
              <p className="text-xs text-slate-500">ترکیب نرم رنگ‌ها</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${config.isGradient ? 'bg-pink-500 border-pink-500' : 'border-slate-600'}`}>
             {config.isGradient && <Check className="w-3 h-3 text-white" />}
          </div>
        </div>

        {/* Background Toggle */}
        <div 
          onClick={() => onChange({ removeBackground: !config.removeBackground })}
          className={`cursor-pointer p-4 rounded-xl border-2 flex items-center justify-between transition-all
            ${config.removeBackground ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}
        >
           <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${config.removeBackground ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-200">حذف پس‌زمینه</h4>
              <p className="text-xs text-slate-500">تمرکز روی سوژه</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${config.removeBackground ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}>
             {config.removeBackground && <Check className="w-3 h-3 text-white" />}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Step 4: Prompt & Upload ---
interface StepPromptProps {
  config: ImageConfig;
  onChange: (updates: Partial<ImageConfig>) => void;
}

export const StepPrompt: React.FC<StepPromptProps> = ({ config, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange({ referenceImage: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Text Area */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-400">توصیف تصویر (به فارسی یا انگلیسی)</label>
        <textarea
          value={config.prompt}
          onChange={(e) => onChange({ prompt: e.target.value })}
          placeholder="مثلاً: یک گربه فضانورد که در حال نوشیدن چای در مریخ است..."
          className="w-full h-32 bg-slate-900 border border-slate-700 rounded-2xl p-4 text-white placeholder-slate-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all resize-none"
          dir="auto"
        />
      </div>

      {/* Upload Area */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-400">تصویر نمونه (اختیاری)</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
            ${dragActive 
              ? 'border-brand-500 bg-brand-500/10' 
              : 'border-slate-700 bg-slate-900/30 hover:border-slate-500 hover:bg-slate-900/50'}`}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          
          {config.referenceImage ? (
            <div className="relative w-full h-full group">
              <img src={config.referenceImage} alt="Preview" className="w-full h-full object-contain p-2" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white font-medium">تغییر تصویر</p>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onChange({ referenceImage: null }); }}
                className="absolute top-2 right-2 p-1 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3">
                <Upload className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-300 font-medium">عکس را اینجا رها کنید</p>
              <p className="text-xs text-slate-500 mt-1">یا برای انتخاب کلیک کنید</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};