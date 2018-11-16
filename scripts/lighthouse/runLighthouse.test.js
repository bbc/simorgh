import runLighthouse from './runLighthouse';
import { validatedPassingScores, config } from './fixtures';

jest.mock('lighthouse', () =>
  jest.fn().mockResolvedValue({
    lhr: {
      categories: {
        performance: {
          id: 'performance',
          score: 1,
        },
        pwa: {
          id: 'pwa',
          score: 1,
        },
        accessibility: {
          id: 'accessibility',
          score: 1,
        },
        'best-practices': {
          id: 'best-practices',
          score: 0.5,
        },
        seo: {
          id: 'seo',
          score: 0.5,
        },
      },
    },
  }),
);

describe('runLighthouse', () => {
  it('Validates scores based on on config', async () => {
    const result = await runLighthouse(config);
    expect(result).toEqual(validatedPassingScores);
  });
});
