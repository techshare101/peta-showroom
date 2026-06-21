'use client';

import { useState } from 'react';
import { PipelineState, STAGES } from '@/lib/simulation';
import PlayerModal from './PlayerModal';

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
        {/* The 4 Big Circles (v0.1.0 look) */}
        <div className="flex items-center justify-between mb-8">
          {STAGES.map((stage, i) => {
            const isActive = state.currentStage === i;
            const isComplete = state.currentStage > i || state.outputReady;

            return (
              <div key={stage} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center text-xs font-mono
                      border-2 transition-all duration-500
                      ${isActive
                        ? 'border-orange-500 bg-orange-500/10 text-orange-400 scale-110'
                        : isComplete
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-zinc-800 bg-zinc-900/50 text-zinc-600'
                      }
                    `}
                  >
                    {isComplete ? '✓' : i + 1}
                  </div>
                  <span className={`
                    mt-2 text-[9px] uppercase tracking-wider font-medium
                    ${isActive ? 'text-orange-400' : isComplete ? 'text-emerald-400/60' : 'text-zinc-600'}
                  `}>
                    {stage}
                  </span>
                </div>

                {i < 3 && (
                  <div className={`
                    h-[1px] flex-1 mx-2 rounded transition-all duration-700
                    ${state.currentStage > i || state.outputReady
                      ? 'bg-emerald-500/40'
                      : state.currentStage === i
                        ? 'bg-orange-500/40'
                        : 'bg-zinc-800'
                    }
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Output Ready Console */}
        {state.outputReady && (
          <div className="mt-6 p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-center">
            <div className="text-emerald-400 text-sm font-medium mb-1">✓ Processing Complete</div>
            <p className="text-zinc-400 text-xs mb-4">
              All 4 agents finished. Output ready for delivery.
            </p>
            <button 
              onClick={() => setIsPlayerOpen(true)}
              className="px-6 py-2 rounded-lg bg-emerald-800/20 border border-emerald-500/30 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-all"
            >
              Download Output
            </button>
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
