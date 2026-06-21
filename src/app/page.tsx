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
    <main className="min-h-screen flex flex-col bg-[#0a0a0f] text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800/30 px-6 py-6 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-white">PETA</h1>
            <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-500">Universal Voice Layer</span>
          </div>

          <div className="flex items-center gap-3">
             <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">System: Operational</span>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-16 pb-24">
        <div className="text-center mb-12 px-6">
          <h2 className="text-4xl font-bold text-white tracking-tight mb-4">The Void Awaits.</h2>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto leading-relaxed">
            Transmute human expression into global intelligence. Isolate, translate, and reconstruct any voice with Imperial-grade fidelity.
          </p>
        </div>

        <VoidInput onSubmit={handleProcess} disabled={pipeline.isProcessing} />

        <PipelineVisualizer state={pipeline} />

        <SwarmStatus agents={pipeline.agents} />
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/30 px-6 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
             <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Authority</span>
             <span className="text-xs font-bold text-zinc-400">METALMINDTECH</span>
          </div>
          <div className="flex flex-col items-end gap-1">
             <span className="text-[9px] uppercase tracking-widest text-zinc-600 font-bold">Framework</span>
             <span className="text-xs font-bold text-zinc-400">Eve System</span>
          </div>
          <div className="col-span-2 text-center pt-6 opacity-30">
            <span className="text-[10px] font-mono">© 2026 — INTELLIGENCE TO THE METAL</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
