'use client';

import { useState, useRef, DragEvent } from 'react';

interface VoidInputProps {
  onSubmit: (input: string, targetLang: string) => void;
  disabled: boolean;
}

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'sp', label: 'SP', flag: '🇪🇸' },
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
          relative rounded-2xl border-2 border-dashed p-8 transition-all duration-500
          ${isDragging
            ? 'border-orange-500/60 bg-orange-500/5 scale-[1.02]'
            : disabled
              ? 'border-zinc-800/30 bg-[#0c0c14]/50'
              : 'border-orange-500/20 bg-[#0c0c14] hover:border-orange-500/40 void-glow'
          }
        `}
      >
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 agent-active" />
            <span className="text-[10px] uppercase tracking-[0.15em] text-orange-400/80 font-medium">
              Drop Node Active
            </span>
          </div>
          <p className="text-zinc-400 text-sm">
            Paste YouTube/Spotify URL or Drop Audio File
          </p>
        </div>

        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={disabled}
            placeholder="https://youtube.com/shorts/..."
            className="
              flex-1 bg-[#0a0a0f] border border-zinc-800 rounded-lg px-4 py-3
              text-sm text-zinc-200 placeholder:text-zinc-600
              focus:outline-none focus:border-orange-500/40
              disabled:opacity-40
            "
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !url.trim()}
            className="
              px-6 py-3 rounded-lg font-medium text-sm
              bg-orange-500/10 border border-orange-500/30 text-orange-400
              hover:bg-orange-500/20 hover:border-orange-500/50
              disabled:opacity-30
            "
          >
            {disabled ? 'Processing' : 'Process'}
          </button>
        </div>

        {/* Language Selection */}
        <div className="flex flex-col items-center">
          <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">
            Target Language Vector
          </div>
          <div className="flex gap-2 p-1 bg-zinc-900/50 border border-zinc-800 rounded-lg">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLang(lang.code)}
                disabled={disabled}
                className={`
                  flex items-center gap-2 px-4 py-1.5 rounded-md text-[10px] font-bold transition-all
                  ${targetLang === lang.code
                    ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    : 'text-zinc-500 hover:text-zinc-300'
                  }
                  disabled:opacity-40
                `}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#0a0a0f]/90 backdrop-blur-sm">
            <p className="text-orange-400 text-sm font-medium">Drop to begin transmutation</p>
          </div>
        )}
      </div>
    </div>
  );
}
