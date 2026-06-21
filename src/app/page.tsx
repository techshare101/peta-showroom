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
      <header className="border-b border-zinc-800/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center">
              <span className="text-orange-400 text-sm font-bold">P</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-wide">PETA</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">Universal Voice Layer</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
              <div className={`w-1.5 h-1.5 rounded-full ${pipeline.isProcessing ? 'bg-orange-500 agent-active' : 'bg-emerald-500'}`} />
              <span className="text-[10px] text-zinc-400 font-mono">
                {pipeline.isProcessing ? 'PROCESSING' : 'READY'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-light mb-3 tracking-tight">
            The <span className="text-orange-400 font-medium">Void</span> Awaits
          </h2>
          <p className="text-zinc-500 text-sm max-w-md mx-auto leading-relaxed">
            Drop any audio source. Four AI agents will analyze, isolate, transmute, and mix — 
            delivering studio-grade output in seconds.
          </p>
        </div>

        {/* The Void - Drop Input */}
        <VoidInput onSubmit={handleProcess} disabled={pipeline.isProcessing} />

        {/* Pipeline Visualizer */}
        <PipelineVisualizer state={pipeline} />

        {/* Swarm Status */}
        <SwarmStatus agents={pipeline.agents} />
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-[10px] text-zinc-600 font-mono">PETA v0.1.1 — SHOWROOM</span>
          <span className="text-[10px] text-zinc-600">Powered by Eve Agent Framework</span>
        </div>
      </footer>
    </main>
  );
}
