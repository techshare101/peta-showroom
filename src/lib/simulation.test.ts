import {
  getInitialPipelineState,
  simulatePipeline,
  STAGES,
  INITIAL_AGENTS,
  PipelineState,
} from './simulation';

describe('Simulation Engine', () => {
  test('getInitialPipelineState returns correct defaults', () => {
    const state = getInitialPipelineState();
    expect(state.currentStage).toBe(-1);
    expect(state.isProcessing).toBe(false);
    expect(state.outputReady).toBe(false);
    expect(state.agents).toHaveLength(4);
    expect(state.stages).toEqual([...STAGES]);
  });

  test('all agents start idle with 0 progress', () => {
    const state = getInitialPipelineState();
    state.agents.forEach(agent => {
      expect(agent.status).toBe('idle');
      expect(agent.progress).toBe(0);
    });
  });

  test('STAGES has exactly 4 entries', () => {
    expect(STAGES).toHaveLength(4);
    expect(STAGES).toEqual(['Analyze', 'Isolate', 'Transmute', 'Mix']);
  });

  test('INITIAL_AGENTS maps correctly to stages', () => {
    expect(INITIAL_AGENTS[0].id).toBe('ear');
    expect(INITIAL_AGENTS[0].stage).toBe('Analyze');
    expect(INITIAL_AGENTS[1].id).toBe('surgeon');
    expect(INITIAL_AGENTS[1].stage).toBe('Isolate');
    expect(INITIAL_AGENTS[2].id).toBe('poet');
    expect(INITIAL_AGENTS[2].stage).toBe('Transmute');
    expect(INITIAL_AGENTS[3].id).toBe('voice');
    expect(INITIAL_AGENTS[3].stage).toBe('Mix');
  });

  test('simulatePipeline completes all stages', (done) => {
    const updates: PipelineState[] = [];

    simulatePipeline((state) => {
      updates.push(JSON.parse(JSON.stringify(state)));

      if (state.outputReady) {
        // Verify all agents are complete
        state.agents.forEach(agent => {
          expect(agent.status).toBe('complete');
          expect(agent.progress).toBe(100);
        });
        expect(state.isProcessing).toBe(false);
        expect(updates.length).toBeGreaterThan(4);
        done();
      }
    }, 'https://youtube.com/watch?v=test123');
  }, 20000);

  test('simulatePipeline can be cancelled', (done) => {
    let updateCount = 0;
    const cancel = simulatePipeline((state) => {
      updateCount++;
      if (updateCount === 3) {
        cancel();
        // Wait a bit and check no more updates come
        setTimeout(() => {
          const finalCount = updateCount;
          setTimeout(() => {
            expect(updateCount).toBe(finalCount);
            done();
          }, 500);
        }, 500);
      }
    }, 'https://youtube.com/watch?v=test');
  }, 10000);
});
