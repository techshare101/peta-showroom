'use client';

import { X, Download, Play, Music, Film } from 'lucide-react';

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetLang: string;
  inputType: 'video' | 'audio';
}

export default function PlayerModal({ isOpen, onClose, targetLang, inputType }: PlayerModalProps) {
  if (!isOpen) return null;

  const isVideo = inputType === 'video';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#05050a]/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#0c0c14] border border-orange-500/20 rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/5">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
              {isVideo ? <Film size={18} /> : <Music size={18} />}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Transmuted Output</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">
                {targetLang.toUpperCase()} Vector • {isVideo ? '4K Short' : 'HD Audio'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 rounded-full transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Player Body */}
        <div className="p-8 flex flex-col items-center justify-center">
          {isVideo ? (
            <div className="aspect-[9/16] w-64 bg-zinc-900 rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60" />
              <Play className="text-orange-500 w-12 h-12 fill-orange-500/20 group-hover:scale-110 transition-transform cursor-pointer" />
              <div className="absolute bottom-4 left-4 right-4 h-1 bg-zinc-800 rounded-full">
                <div className="h-full w-1/3 bg-orange-500 rounded-full" />
              </div>
            </div>
          ) : (
            <div className="w-full py-12 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8 animate-pulse">
                <Music className="text-orange-500 w-8 h-8" />
              </div>
              <div className="w-full max-w-sm space-y-4">
                <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono uppercase">
                  <span>0:14</span>
                  <span>0:30</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                  <div className="h-full w-[45%] bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-8 py-6 bg-zinc-900/30 flex items-center justify-center">
          <button 
            className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white font-bold rounded-2xl hover:bg-orange-400 transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            onClick={() => alert('Initiating device download...')}
          >
            <Download size={18} />
            Download to Device
          </button>
        </div>
      </div>
    </div>
  );
}
