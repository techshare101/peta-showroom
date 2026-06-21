'use client';

import { useState } from 'react';
import { PipelineState, STAGES } from '@/lib/simulation';
import PlayerModal from './PlayerModal';
import { CheckCircle2, ChevronRight, Download } from 'lucide-react';

interface PipelineVisualizerProps {
  state: PipelineState;
}

export default function PipelineVisualizer({ state }: PipelineVisualizerProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  
  if (!state.isProcessing && !state.outputReady) return null;

  const isVideo = state.inputUrl.includes('youtube') || state.inputUrl.includes('shorts');

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-12 px-4">
        {/* Stage Pipeline */}
        <div className="flex items-center justify-between mb-8">
          {STAGES.map((stage, i) => {
            const isActive = state.currentStage === i;
            const isComplete = state.currentStage > i || state.outputReady;

            return (
              <div key={stage} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center text-xs font-black
                      border-2 transition-all duration-700
                      ${isActive
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 scale-110 shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]'
                        : isComplete
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-zinc-800 bg-zinc-950/50 text-zinc-700'
                      }
                    `}
                  >
                    {isComplete ? <CheckCircle2 size={18} /> : (i + 1).toString().padStart(2, '0')}
                  </div>
                  <span className={`
                    mt-3 text-[9px] uppercase tracking-[0.2em] font-black
                    ${isActive ? 'text-orange-400' : isComplete ? 'text-emerald-500/60' : 'text-zinc-700'}
                  `}>
                    {stage}
                  </span>
                </div>

                {i < 3 && (
                  <div className={`
                    h-[1px] flex-1 mx-4 rounded-full transition-all duration-1000
                    ${state.currentStage > i || state.outputReady
                      ? 'bg-emerald-500/30'
                      : state.currentStage === i
                        ? 'bg-gradient-to-r from-orange-500/30 to-zinc-900'
                        : 'bg-zinc-900'
                    }
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Active stage progress line */}
        {state.isProcessing && state.currentStage >= 0 && (
          <div className="relative h-[2px] w-full rounded-full bg-zinc-900 overflow-hidden mb-12">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-600 via-orange-400 to-orange-600 rounded-full transition-all duration-300"
              style={{ width: `${state.agents[state.currentStage]?.progress || 0}%` }}
            />
          </div>
        )}

        {/* Output Ready Console */}
        {state.outputReady && (
          <div className="mt-4 p-8 rounded-[2rem] border border-emerald-500/30 bg-emerald-500/[0.03] backdrop-blur-xl text-center animate-in zoom-in-95 duration-500">
            <div className="flex justify-center mb-4">
               <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
               </div>
            </div>
            <h3 className="text-emerald-400 text-lg font-black tracking-tight mb-2 uppercase">Transmutation Validated</h3>
            <p className="text-zinc-500 text-sm max-w-sm mx-auto mb-8 font-light">
              The {state.targetLang.toUpperCase()} vector is synthesized. Studio-grade {isVideo ? 'video' : 'audio'} is staged for export.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsPlayerOpen(true)}
                className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-emerald-500 text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2"
              >
                Launch Preview
                <ChevronRight size={14} />
              </button>
            </div>
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
