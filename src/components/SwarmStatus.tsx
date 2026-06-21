'use client';

import { AgentState } from '@/lib/simulation';
import { Cpu, Activity, PenTool, Radio } from 'lucide-react';

interface SwarmStatusProps {
  agents: AgentState[];
}

const ICONS = {
  ear: Cpu,
  surgeon: Radio,
  poet: PenTool,
  voice: Activity
};

export default function SwarmStatus({ agents }: SwarmStatusProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mt-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1 h-4 bg-orange-500 rounded-full" />
          <h3 className="text-xs uppercase tracking-[0.4em] text-zinc-400 font-bold">
            Swarm Intelligence
          </h3>
        </div>
        <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          Node Status: Operational
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const Icon = ICONS[agent.id] || Cpu;
          const isActive = agent.status === 'active';
          const isComplete = agent.status === 'complete';

          return (
            <div
              key={agent.id}
              className={`
                group relative overflow-hidden rounded-2xl border transition-all duration-700
                ${isActive
                  ? 'border-orange-500/40 bg-zinc-950/60 shadow-lg shadow-orange-500/5 ring-1 ring-orange-500/20'
                  : isComplete
                    ? 'border-emerald-500/20 bg-emerald-500/[0.02]'
                    : 'border-zinc-800/40 bg-zinc-950/40'
                }
              `}
            >
              {/* Progress Bar Overlay */}
              {isActive && (
                <div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-300"
                  style={{ width: `${agent.progress}%` }}
                />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    p-2.5 rounded-xl border transition-all duration-500
                    ${isActive 
                      ? 'bg-orange-500 text-black border-orange-400 shadow-[0_0_15px_-3px_rgba(249,115,22,0.8)]' 
                      : isComplete 
                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                        : 'bg-zinc-900 text-zinc-600 border-zinc-800'
                    }
                  `}>
                    <Icon size={16} strokeWidth={2.5} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`
                      text-[9px] font-bold uppercase tracking-tighter
                      ${isActive ? 'text-orange-400' : isComplete ? 'text-emerald-500' : 'text-zinc-600'}
                    `}>
                      {agent.status}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-orange-500 agent-active-pulse' : isComplete ? 'bg-emerald-500' : 'bg-zinc-800'
                    }`} />
                  </div>
                </div>

                <div className="mb-1">
                  <h4 className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`}>
                    {agent.label}
                  </h4>
                </div>

                <p className={`text-[11px] leading-relaxed transition-colors duration-500 ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {agent.description}
                </p>

                {isActive && (
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-lg font-black text-white">{agent.progress}</span>
                    <span className="text-[9px] font-bold text-orange-500/60">%</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
