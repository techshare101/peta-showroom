'use client';

import { AgentState } from '@/lib/simulation';

interface SwarmStatusProps {
  agents: AgentState[];
}

export default function SwarmStatus({ agents }: SwarmStatusProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mt-12 px-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-orange-500/60 agent-active" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">
          Swarm Status
        </span>
      </div>

      <div className="space-y-2">
        {agents.map((agent) => {
          const isActive = agent.status === 'active';
          const isComplete = agent.status === 'complete';

          return (
            <div
              key={agent.id}
              className={`
                relative rounded-lg border p-4 transition-all duration-500
                ${isActive
                  ? 'border-orange-500/40 bg-orange-500/5'
                  : isComplete
                    ? 'border-emerald-500/20 bg-emerald-500/[0.02]'
                    : 'border-zinc-800/50 bg-[#0c0c14]'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${isActive ? 'text-orange-400' : 'text-zinc-400'}`}>
                    [{agent.label}]
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-1">{agent.description}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] capitalize ${isActive ? 'text-orange-400 agent-active' : isComplete ? 'text-emerald-400' : 'text-zinc-600'}`}>
                    {agent.status}
                  </span>
                  {isComplete && <span className="text-emerald-500 text-xs">✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
