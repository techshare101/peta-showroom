'use client';

import { useState, useRef, DragEvent } from 'react';

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (url.trim() && !disabled) {
      onSubmit(url.trim(), targetLang);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onSubmit(`[file] ${files[0].name}`, targetLang);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
        {/* Ambient corner accents */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/30 rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/30 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/30 rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/30 rounded-br-2xl" />

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
            ref={inputRef}
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder="https://youtube.com/watch?v=... or spotify:track:..."
            className="
              flex-1 bg-[#0a0a0f] border border-zinc-800 rounded-lg px-4 py-3
              text-sm text-zinc-200 placeholder:text-zinc-600
              focus:outline-none focus:border-orange-500/40 focus:ring-1 focus:ring-orange-500/20
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-300
            "
          />
          <button
            onClick={handleSubmit}
            disabled={disabled || !url.trim()}
            className="
              px-6 py-3 rounded-lg font-medium text-sm
              bg-orange-500/10 border border-orange-500/30 text-orange-400
              hover:bg-orange-500/20 hover:border-orange-500/50
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            {disabled ? 'Processing...' : 'Process'}
          </button>
        </div>

        {/* Language Vector Selection */}
        <div className="flex flex-col items-center">
          <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-3 font-mono">
            Target Language Vector
          </div>
          <div className="flex gap-2 p-1 bg-zinc-900/50 border border-zinc-800 rounded-xl">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLang(lang.code)}
                disabled={disabled}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-300
                  ${targetLang === lang.code
                    ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400'
                    : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 border border-transparent'
                  }
                  disabled:opacity-40
                `}
              >
                <span>{lang.flag}</span>
                <span>{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>

        {isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#0a0a0f]/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">🎵</div>
              <p className="text-orange-400 text-sm font-medium">Drop audio file here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
