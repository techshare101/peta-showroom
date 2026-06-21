'use client';

import { AgentState } from '@/lib/simulation';

interface SwarmStatusProps {
  agents: AgentState[];
}

function getStatusColor(status: AgentState['status']): string {
  switch (status) {
    case 'idle': return 'bg-zinc-700';
    case 'active': return 'bg-orange-500';
    case 'complete': return 'bg-emerald-500';
  }
}

function getStatusIcon(status: AgentState['status']): string {
  switch (status) {
    case 'idle': return '○';
    case 'active': return '◉';
    case 'complete': return '✓';
  }
}

export default function SwarmStatus({ agents }: SwarmStatusProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-12">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-orange-500/60 agent-active" />
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium">
          Swarm Status
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className={`
              relative overflow-hidden rounded-lg border p-4 transition-all duration-500
              ${agent.status === 'active'
                ? 'border-orange-500/40 bg-[#0f0f18]'
                : agent.status === 'complete'
                  ? 'border-emerald-500/20 bg-[#0a0f0a]'
                  : 'border-zinc-800/50 bg-[#0c0c14]'
              }
            `}
          >
            {/* Progress background fill */}
            {agent.status === 'active' && (
              <div
                className="absolute inset-0 bg-orange-500/5 transition-all duration-300"
                style={{ width: `${agent.progress}%` }}
              />
            )}

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                  [{agent.label}]
                </span>
                <span className={`text-xs ${agent.status === 'active' ? 'text-orange-400 agent-active' : agent.status === 'complete' ? 'text-emerald-400' : 'text-zinc-600'}`}>
                  {getStatusIcon(agent.status)}
                </span>
              </div>

              <p className="text-[11px] text-zinc-500 mb-3 leading-relaxed">
                {agent.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${getStatusColor(agent.status)} ${agent.status === 'active' ? 'agent-active' : ''}`} />
                  <span className="text-[10px] text-zinc-500 capitalize">
                    {agent.status}
                  </span>
                </div>
                {agent.status === 'active' && (
                  <span className="text-[10px] font-mono text-orange-400/80">
                    {agent.progress}%
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
