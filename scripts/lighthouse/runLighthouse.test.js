import config from './mockConfig';
import runLighthouse from './runLighthouse';
import { validatedPassingScores } from './fixtures';

jest.mock('lighthouse', () =>
  jest.fn().mockResolvedValue({
    lhr: {
      categories: {
        performance: {
          id: 'performance',
          score: 0.72,
        },
        pwa: {
          id: 'pwa',
          score: 0.58,
        },
        accessibility: {
          id: 'accessibility',
          score: 1,
        },
        'best-practices': {
          id: 'best-practices',
          score: 0.93,
        },
        seo: {
          id: 'seo',
          score: 0.8,
        },
      },
    },
  }),
);

// jest.setTimeout(30000);

describe('runLighthouse', () => {
  it('Validates scores based on on config', async () => {
    const result = await runLighthouse(config);
    expect(result).toEqual(validatedPassingScores);
  });
});
