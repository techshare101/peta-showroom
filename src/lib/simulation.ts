// Peta Processing Pipeline Simulation Engine
// Mocks the 4-stage audio processing: Analyze -> Isolate -> Transmute -> Mix

export type AgentId = 'ear' | 'surgeon' | 'poet' | 'voice';

export interface AgentState {
  id: AgentId;
  label: string;
  stage: string;
  status: 'idle' | 'active' | 'complete';
  progress: number; // 0-100
  description: string;
}

export interface PipelineState {
  currentStage: number; // 0-3
  stages: string[];
  agents: AgentState[];
  isProcessing: boolean;
  inputUrl: string;
  targetLang: string;
  outputReady: boolean;
}

export const STAGES = ['Analyze', 'Isolate', 'Transmute', 'Mix'] as const;

const LANG_LABELS: Record<string, string> = {
  en: 'English',
  fr: 'French',
  sp: 'Spanish',
};

export const INITIAL_AGENTS: AgentState[] = [
  {
    id: 'ear',
    label: 'Ear Agent',
    stage: 'Analyze',
    status: 'idle',
    progress: 0,
    description: 'Spectral analysis & content fingerprinting',
  },
  {
    id: 'surgeon',
    label: 'Surgeon Agent',
    stage: 'Isolate',
    status: 'idle',
    progress: 0,
    description: 'Stem separation & frequency isolation',
  },
  {
    id: 'poet',
    label: 'Poet Agent',
    stage: 'Transmute',
    status: 'idle',
    progress: 0,
    description: 'Lyrical & tonal transformation',
  },
  {
    id: 'voice',
    label: 'Voice Agent',
    stage: 'Mix',
    status: 'idle',
    progress: 0,
    description: 'Voice synthesis & final mix mastering',
  },
];

export function getInitialPipelineState(): PipelineState {
  return {
    currentStage: -1,
    stages: [...STAGES],
    agents: INITIAL_AGENTS.map(a => ({ ...a })),
    isProcessing: false,
    inputUrl: '',
    targetLang: 'fr',
    outputReady: false,
  };
}

// Simulated processing durations per stage (ms)
const STAGE_DURATIONS = [2500, 3500, 5000, 3000];

export function simulatePipeline(
  onUpdate: (state: PipelineState) => void,
  inputUrl: string,
  targetLang: string = 'fr'
): () => void {
  let cancelled = false;
  const state = getInitialPipelineState();
  state.inputUrl = inputUrl;
  state.targetLang = targetLang;
  state.isProcessing = true;

  // Update Poet Agent description to show target language
  state.agents[2].description = `Translating lyrics to ${LANG_LABELS[targetLang]}...`;

  async function run() {
    for (let i = 0; i < 4; i++) {
      if (cancelled) return;

      state.currentStage = i;
      state.agents[i].status = 'active';
      state.agents[i].progress = 0;
      onUpdate({ ...state, agents: state.agents.map(a => ({ ...a })) });

      const duration = STAGE_DURATIONS[i];
      const steps = 25;
      const stepDuration = duration / steps;

      for (let step = 0; step <= steps; step++) {
        if (cancelled) return;
        await new Promise(r => setTimeout(r, stepDuration));
        state.agents[i].progress = Math.min(100, Math.round((step / steps) * 100));
        onUpdate({ ...state, agents: state.agents.map(a => ({ ...a })) });
      }

      state.agents[i].status = 'complete';
      state.agents[i].progress = 100;
      onUpdate({ ...state, agents: state.agents.map(a => ({ ...a })) });
    }

    state.isProcessing = false;
    state.outputReady = true;
    onUpdate({ ...state, agents: state.agents.map(a => ({ ...a })) });
  }

  run();

  return () => { cancelled = true; };
}
