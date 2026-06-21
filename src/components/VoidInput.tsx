'use client';

import { useState, useRef, DragEvent } from 'react';
import { Share2, Globe2, Sparkles, ChevronRight } from 'lucide-react';

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="w-full max-w-2xl mx-auto z-10">
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
          relative rounded-3xl border transition-all duration-700 p-1
          ${disabled ? 'opacity-60 grayscale-[0.5]' : ''}
          ${isDragging ? 'border-orange-500 bg-orange-500/5 scale-[1.01]' : 'border-zinc-800/50 bg-zinc-950/20'}
        `}
      >
        <div className={`
          rounded-[22px] p-8 md:p-10 transition-all duration-500
          ${disabled ? 'bg-transparent' : 'bg-zinc-950/40 obsidian-card void-input-glow'}
        `}>
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 agent-active-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-400/90">
                Awaiting Command
              </span>
            </div>
          </div>

          {/* Input Section */}
          <div className="relative group mb-8">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={disabled}
              placeholder="Paste YouTube, Spotify, or drag audio..."
              className="
                w-full bg-black/40 border border-zinc-800/50 rounded-2xl px-6 py-5 pr-32
                text-base text-zinc-100 placeholder:text-zinc-600 font-light
                focus:outline-none focus:border-orange-500/30 focus:ring-1 focus:ring-orange-500/10
                transition-all duration-500 backdrop-blur-xl
              "
            />
            <div className="absolute right-2 top-2 bottom-2">
              <button
                onClick={handleSubmit}
                disabled={disabled || !url.trim()}
                className="
                  h-full px-6 rounded-xl font-bold text-xs uppercase tracking-widest
                  bg-gradient-to-br from-orange-500 to-orange-600 text-white
                  hover:shadow-[0_0_20px_-5px_rgba(249,115,22,0.5)]
                  disabled:opacity-20 disabled:grayscale transition-all duration-300
                  flex items-center gap-2
                "
              >
                {disabled ? 'Swarms active' : 'Process'}
                <ChevronRight size={14} className={disabled ? 'hidden' : ''} />
              </button>
            </div>
          </div>

          {/* Language Selection */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-5 font-mono">
              <Globe2 size={10} />
              Target Language Vector
            </div>
            <div className="inline-flex p-1.5 bg-black/40 border border-zinc-800/50 rounded-2xl backdrop-blur-2xl">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLang(lang.code)}
                  disabled={disabled}
                  className={`
                    flex items-center gap-3 px-6 py-2.5 rounded-xl text-xs font-semibold transition-all duration-500
                    ${targetLang === lang.code
                      ? 'bg-zinc-800 text-orange-400 border border-zinc-700 shadow-xl'
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 border border-transparent'
                    }
                    disabled:opacity-30
                  `}
                >
                  <span className="text-sm opacity-80">{lang.flag}</span>
                  <span className="tracking-widest">{lang.code.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-3xl bg-black/80 backdrop-blur-md z-20 border-2 border-orange-500/50">
            <div className="text-center animate-bounce">
              <Sparkles className="text-orange-500 w-12 h-12 mx-auto mb-4" />
              <p className="text-white text-lg font-medium tracking-tight">Drop into the Void</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
