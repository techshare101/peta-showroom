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
    <main className="min-h-screen relative overflow-hidden bg-[#05050a] flex flex-col font-sans">
      {/* Background FX */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-50 border-b border-zinc-800/30 px-8 py-6 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 border border-orange-400/30 flex items-center justify-center shadow-lg shadow-orange-500/10 transition-transform group-hover:scale-105">
              <span className="text-white text-lg font-black tracking-tighter italic">P</span>
            </div>
            <div>
              <h1 className="text-lg font-black text-zinc-100 tracking-tighter flex items-center gap-2">
                PETA <span className="text-[10px] font-mono text-orange-500 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">V0.1.2</span>
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-bold">Universal Voice Layer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end mr-4">
              <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-600 font-bold">Registry Status</span>
              <span className="text-[10px] font-mono text-emerald-500/80">AUTHENTICATED</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-md">
              <div className={`w-1.5 h-1.5 rounded-full ${pipeline.isProcessing ? 'bg-orange-500 agent-active-pulse' : 'bg-emerald-500'}`} />
              <span className="text-[10px] text-zinc-400 font-black tracking-widest uppercase">
                {pipeline.isProcessing ? 'Swarm Processing' : 'System Ready'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-6xl font-black text-zinc-100 tracking-tighter leading-none">
            The <span className="text-orange-500 italic">Void</span> Awaits.
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed font-light">
            Transmute any audio source into global intelligence. Four specialized AI agents will isolate, 
            translate, and reconstruct vocals with studio-grade fidelity.
          </p>
        </div>

        {/* The Void - Drop Input */}
        <VoidInput onSubmit={handleProcess} disabled={pipeline.isProcessing} />

        {/* Pipeline Visualizer */}
        <div className="w-full flex justify-center">
           <PipelineVisualizer state={pipeline} />
        </div>

        {/* Swarm Status */}
        <SwarmStatus agents={pipeline.agents} />
      </div>

      {/* Footer */}
      <footer className="relative z-50 border-t border-zinc-800/30 px-8 py-8 backdrop-blur-md bg-black/40 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
             <div className="flex flex-col">
               <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mb-1">Architecture</span>
               <span className="text-xs text-zinc-400 font-bold tracking-tight">Eve Agent Framework</span>
             </div>
             <div className="h-8 w-[1px] bg-zinc-800/50" />
             <div className="flex flex-col">
               <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase mb-1">Sovereign Authority</span>
               <span className="text-xs text-orange-500 font-black tracking-[0.25em] uppercase">MetalMindTech</span>
             </div>
          </div>
          
          <div className="flex items-center gap-8">
            <span className="text-[10px] text-zinc-700 font-medium tracking-tight">© 2026 INTELLIGENCE TO THE METAL.</span>
            <div className="flex gap-4">
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
               <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
