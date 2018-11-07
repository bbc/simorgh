// import * as lighthouse from 'lighthouse';
import config from './mockConfig';
import runLighthouse from './runLighthouse';

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

const validatedScores = [
  {
    url: 'http://localhost:7080/news/articles/c9rpqy7pmypo',
    scores: [
      {
        id: 'performance',
        score: 0.72,
        expectedScore: 0,
        pass: true,
      },
      { id: 'pwa', score: 0.58, expectedScore: 0, pass: true },
      { id: 'accessibility', score: 1, expectedScore: 0, pass: true },
      {
        id: 'best-practices',
        score: 0.93,
        expectedScore: 0,
        pass: true,
      },
      { id: 'seo', score: 0.8, expectedScore: 0, pass: true },
    ],
  },
];

describe('runLighthouse', () => {
  it('Validates scores based on on config', async () => {
    const result = await runLighthouse(config);
    expect(result).toEqual(validatedScores);
  });
});
