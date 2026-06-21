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

  // Detect if input was a video (Mock logic)
  const isVideo = state.inputUrl.includes('youtube') || state.inputUrl.includes('shorts');

  return (
    <>
      <div className="w-full max-w-2xl mx-auto mt-10">
        {/* Stage Pipeline */}
        <div className="flex items-center justify-between mb-6">
          {STAGES.map((stage, i) => {
            const isActive = state.currentStage === i;
            const isComplete = state.currentStage > i || state.outputReady;

            return (
              <div key={stage} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono
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
                    mt-2 text-[10px] uppercase tracking-wider font-medium
                    ${isActive ? 'text-orange-400' : isComplete ? 'text-emerald-400/60' : 'text-zinc-600'}
                  `}>
                    {stage}
                  </span>
                </div>

                {i < 3 && (
                  <div className={`
                    h-[2px] flex-1 mx-2 rounded transition-all duration-700
                    ${state.currentStage > i || state.outputReady
                      ? 'bg-emerald-500/40'
                      : state.currentStage === i
                        ? 'bg-gradient-to-r from-orange-500/40 to-zinc-800'
                        : 'bg-zinc-800'
                    }
                  `} />
                )}
              </div>
            );
          })}
        </div>

        {/* Active stage progress bar */}
        {state.isProcessing && state.currentStage >= 0 && (
          <div className="relative h-1 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300"
              style={{ width: `${state.agents[state.currentStage]?.progress || 0}%` }}
            />
          </div>
        )}

        {/* Output Ready */}
        {state.outputReady && (
          <div className="mt-6 p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-center animate-in slide-in-from-bottom-2 duration-500">
            <div className="text-emerald-400 text-sm font-medium mb-1">✓ Transmutation Complete</div>
            <p className="text-zinc-400 text-xs">
              Studio-grade {isVideo ? 'video' : 'audio'} is ready for delivery.
            </p>
            <button 
              onClick={() => setIsPlayerOpen(true)}
              className="mt-4 px-8 py-3 rounded-xl bg-emerald-500 text-black font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
            >
              Preview & Download
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
