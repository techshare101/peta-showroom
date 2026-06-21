'use client';

import { useState, useCallback } from 'react';
import VoidInput from '@/components/VoidInput';
import SwarmStatus from '@/components/SwarmStatus';
import PipelineVisualizer from '@/components/PipelineVisualizer';
import {
  PipelineState,
  getInitialPipelineState,
  simulatePipeline,
} from '@/lib/simulation';

export default function Home() {
  const [pipeline, setPipeline] = useState<PipelineState>(getInitialPipelineState());

  const handleProcess = useCallback((input: string, targetLang: string) => {
    setPipeline(getInitialPipelineState());

    simulatePipeline((newState) => {
      setPipeline({ ...newState });
    }, input, targetLang);
  }, []);

  return (
    <main className="min-h-screen bg-[#05050a] flex flex-col font-sans selection:bg-orange-500/30 selection:text-white">
      {/* Decorative Glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-zinc-800/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 px-8 py-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center shadow-2xl">
              <span className="text-black text-2xl font-black italic tracking-tighter pr-1">P</span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">PETA</h1>
              <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-bold mt-1">Universal Voice Layer</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
             <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System: Operational</span>
          </div>
        </div>
      </header>

      {/* Main UI */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 pb-32">
        {/* Headline */}
        <div className="text-center mb-20 space-y-4 px-6">
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            The <span className="text-orange-600 italic">Void</span> Awaits.
          </h2>
          <p className="text-zinc-600 text-sm md:text-lg max-w-xl mx-auto font-light leading-relaxed">
            Transmute human expression into global intelligence. Isolate, translate, 
            and reconstruct any voice with Imperial-grade fidelity.
          </p>
        </div>

        {/* The Drop Node */}
        <VoidInput onSubmit={handleProcess} disabled={pipeline.isProcessing} />

        {/* Visualizer & Console */}
        <PipelineVisualizer state={pipeline} />

        {/* Detailed Swarm Log */}
        <SwarmStatus agents={pipeline.agents} />
      </div>

      {/* Sovereign Footer */}
      <footer className="px-10 py-12 border-t border-zinc-900/50 bg-black/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-10">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">Authority</span>
                 <span className="text-sm font-black tracking-widest text-orange-600">METALMINDTECH</span>
              </div>
              <div className="h-8 w-[1px] bg-zinc-800" />
              <div className="flex flex-col">
                 <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">Framework</span>
                 <span className="text-sm font-bold text-zinc-400">Eve System</span>
              </div>
           </div>
           
           <div className="text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
             © 2026 — Intelligence to the Metal
           </div>
        </div>
      </footer>
    </main>
  );
}
