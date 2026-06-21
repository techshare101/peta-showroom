'use client';

import { useState, useRef, DragEvent } from 'react';
import { Globe2, ChevronRight, Activity } from 'lucide-react';

interface VoidInputProps {
  onSubmit: (input: string, targetLang: string) => void;
  disabled: boolean;
}

const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'fr', label: 'French', flag: '🇫🇷' },
  { code: 'sp', label: 'Spanish', flag: '🇪🇸' },
];

export default function VoidInput({ onSubmit, disabled }: VoidInputProps) {
  const [url, setUrl] = useState('');
  const [targetLang, setTargetLang] = useState('fr');
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = () => {
    if (url.trim() && !disabled) {
      onSubmit(url.trim(), targetLang);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          const files = e.dataTransfer.files;
          if (files.length > 0) onSubmit(`[file] ${files[0].name}`, targetLang);
        }}
        className={`
          relative rounded-[2rem] tactical-border p-8 md:p-12 transition-all duration-700
          ${isDragging ? 'border-orange-500 scale-[1.02] bg-orange-500/5' : 'bg-black/40'}
          ${disabled ? 'opacity-50' : ''}
        `}
      >
        {/* Status indicator */}
        <div className="flex justify-center mb-8">
           <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
             <div className="w-2 h-2 rounded-full bg-orange-500 agent-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/80">Drop Node Active</span>
           </div>
        </div>

        <div className="text-center mb-8">
           <p className="text-zinc-400 text-sm font-light">Paste YouTube/Spotify URL or Drop Audio File</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={disabled}
            placeholder="https://youtube.com/shorts/..."
            className="
              flex-1 bg-zinc-950 border border-zinc-800 rounded-2xl px-6 py-4
              text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-orange-500/40
              transition-all duration-300
            "
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !url.trim()}
            className="
              px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest
              bg-orange-600 text-white hover:bg-orange-500 transition-all
              disabled:opacity-20 shadow-xl shadow-orange-900/20
            "
          >
            {disabled ? 'Processing' : 'Process'}
          </button>
        </div>

        {/* Language Selection - Tactile Chips */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 mb-4 font-bold">Target Language Vector</div>
          <div className="flex gap-3">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLang(lang.code)}
                disabled={disabled}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all duration-300
                  ${targetLang === lang.code 
                    ? 'bg-zinc-100 text-black shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                    : 'bg-zinc-900 text-zinc-500 hover:text-zinc-300 border border-zinc-800'
                  }
                `}
              >
                <span>{lang.flag}</span>
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {isDragging && (
           <div className="absolute inset-0 rounded-[2rem] bg-orange-600/90 flex items-center justify-center backdrop-blur-sm z-50">
             <Activity size={48} className="text-white animate-pulse" />
           </div>
        )}
      </div>
    </div>
  );
}
