'use client';

import { useState } from 'react';
import { PipelineState, STAGES } from '@/lib/simulation';
import PlayerModal from './PlayerModal';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface PipelineVisualizerProps {
  state: PipelineState;
}

export default function PipelineVisualizer({ state }: PipelineVisualizerProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  if (!state.isProcessing && !state.outputReady) return null;

  const isVideo = state.inputUrl.includes('youtube') || state.inputUrl.includes('shorts');

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-16 px-4">
        {/* The 4-Stage Circular Pipeline (The version the user liked) */}
        <div className="flex items-center justify-between mb-12">
          {STAGES.map((stage, i) => {
            const isActive = state.currentStage === i;
            const isComplete = state.currentStage > i || state.outputReady;

            return (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-14 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-700
                      border-2 
                      ${isActive
                        ? 'border-orange-500 bg-orange-500/10 text-orange-500 scale-110 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                        : isComplete
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500'
                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-700'
                      }
                    `}
                  >
                    {isComplete ? <CheckCircle2 size={24} /> : (
                      <span className="text-xs font-black font-mono">{(i + 1).toString().padStart(2, '0')}</span>
                    )}
                  </div>
                  <span className={`
                    mt-4 text-[9px] uppercase tracking-[0.2em] font-black
                    ${isActive ? 'text-orange-500' : isComplete ? 'text-emerald-500/60' : 'text-zinc-700'}
                  `}>
                    {stage}
                  </span>
                </div>

                {i < 3 && (
                  <div className={`
                    h-[1px] flex-1 mx-4 rounded-full transition-all duration-1000
                    ${state.currentStage > i || state.outputReady
                      ? 'bg-emerald-500/40'
                      : state.currentStage === i
                        ? 'bg-gradient-to-r from-orange-500 to-zinc-900'
                        : 'bg-zinc-900'
                    }
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Processing Console */}
        {state.outputReady ? (
          <div className="mt-8 p-10 rounded-[2.5rem] border border-emerald-500/20 bg-emerald-500/[0.03] text-center animate-in zoom-in-95 duration-700">
             <div className="mb-6 inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-500">
                <CheckCircle2 size={32} />
             </div>
             <h3 className="text-emerald-400 text-xl font-black uppercase tracking-tighter mb-2">Transmutation Verified</h3>
             <p className="text-zinc-500 text-sm font-light mb-8">
                Target Language: <span className="text-emerald-500 font-bold uppercase">{state.targetLang} Vector</span> active.
             </p>
             <button 
               onClick={() => setIsPlayerOpen(true)}
               className="px-12 py-5 rounded-2xl bg-emerald-500 text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all active:scale-95 shadow-2xl shadow-emerald-500/20 flex items-center gap-3 mx-auto"
             >
               Preview & Download
               <ChevronRight size={16} />
             </button>
          </div>
        ) : (
          <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
             <div 
               className="h-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300 shadow-[0_0_10px_#f97316]"
               style={{ width: `${state.agents[state.currentStage]?.progress || 0}%` }}
             />
          </div>
        )}
      </div>

      <PlayerModal 
        isOpen={isPlayerOpen} 
        onClose={() => setIsPlayerOpen(false)}
        targetLang={state.targetLang}
        inputType={isVideo ? 'video' : 'audio'}
      />
    </>
  );
}
