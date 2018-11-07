const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const mockConfig = require('./mockConfig');
const runLighthouse = require('./runLighthouse');

jest.mock('lighthouse', () => Promise.resolve({ lhr: {} }));

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
  it('Validates scores based on on config', () => {
    expect(runLighthouse(mockConfig)).resolves.toEqual(validatedScores);
  });
  // it('thing', () => expect(runLighthouse(mockConfig)).resolves.toEqual('Paul'));
  // mockimports
  // mockLighthouseResponse
  // setInputOne
  // await import('./lighthouseRunner');
  // expect output to equal output 1
  // expect output to equal output 1
});
