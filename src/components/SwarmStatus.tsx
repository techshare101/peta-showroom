'use client';

import { AgentState } from '@/lib/simulation';
import { CheckCircle2, Circle } from 'lucide-react';

interface SwarmStatusProps {
  agents: AgentState[];
}

export default function SwarmStatus({ agents }: SwarmStatusProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-20 px-4">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1 h-3 bg-zinc-800" />
        <span className="text-[10px] uppercase tracking-[0.4em] text-zinc-600 font-bold">Swarm Status Log</span>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => {
          const isActive = agent.status === 'active';
          const isComplete = agent.status === 'complete';

          return (
            <div
              key={agent.id}
              className={`
                group relative rounded-2xl border p-6 transition-all duration-700
                ${isActive
                  ? 'border-orange-500/40 bg-orange-500/[0.02] shadow-[0_0_30px_-10px_rgba(249,115,22,0.1)]'
                  : isComplete
                    ? 'border-emerald-500/10 bg-emerald-500/[0.01]'
                    : 'border-zinc-800/40 bg-zinc-950/20'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                   <span className={`text-[10px] font-mono tracking-widest uppercase ${isActive ? 'text-orange-500' : 'text-zinc-600'}`}>
                     [{agent.label}]
                   </span>
                   <span className={`text-sm font-light ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`}>
                     {agent.description}
                   </span>
                </div>

                <div className="flex items-center gap-4">
                   {isActive && (
                      <span className="text-xs font-black text-orange-500/80 font-mono italic">
                        {agent.progress}%
                      </span>
                   )}
                   <div className={`${isActive ? 'text-orange-500 animate-pulse' : isComplete ? 'text-emerald-500' : 'text-zinc-800'}`}>
                      {isComplete ? <CheckCircle2 size={18} /> : <Circle size={18} strokeWidth={3} />}
                   </div>
                </div>
              </div>
              
              {isActive && (
                <div className="absolute bottom-0 left-0 h-[1px] bg-orange-500 shadow-[0_0_10px_#f97316] transition-all duration-300" style={{ width: `${agent.progress}%` }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
