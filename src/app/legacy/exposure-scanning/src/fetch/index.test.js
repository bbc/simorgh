const { Headers, Response } = jest.requireActual('node-fetch');

const mockHeaders = new Headers({ 'Content-Type': 'application/json' });

const ResponseInit = {
  url: 'hello',
  headers: mockHeaders,
  status: 200,
};

const mockPrBodyRes = new Response(
  JSON.stringify({
    title: 'PR Title',
    body: 'PR Body',
  }),
  ResponseInit,
);

const mockPrCommentsRes = new Response(
  JSON.stringify([
    { id: 1, body: 'Added translations' },
    { id: 2, body: 'Nice work, LGTM!' },
  ]),
  ResponseInit,
);

const mockPrReviewCommentsRes = new Response(
  JSON.stringify([{ id: 3, body: 'Smashed it!' }]),
  ResponseInit,
);

const mockIssueBodyRes = new Response(
  JSON.stringify({
    title: 'Issue Title',
    body: 'Issue Body',
  }),
  ResponseInit,
);

const mockIssueCommentsRes = new Response(
  JSON.stringify([
    { id: 4, body: 'Closing this' },
    { id: 5, body: 'Nice issue' },
  ]),
  ResponseInit,
);

const prBodyEndpoint = 'https://api.github.com/repos/bbc/simorgh/pulls/9188';
const prCommentsEndpoint =
  'https://api.github.com/repos/bbc/simorgh/issues/9188/comments';
const prReviewCommentsEndpoint =
  'https://api.github.com/repos/bbc/simorgh/pulls/9188/comments';
const issueBodyEndpoint =
  'https://api.github.com/repos/bbc/psammead/issues/4512';
const issueCommentsEndpoint =
  'https://api.github.com/repos/bbc/psammead/issues/4512/comments';

jest.mock('node-fetch', () => ({
  default: async url =>
    ({
      [prBodyEndpoint]: mockPrBodyRes,
      [prCommentsEndpoint]: mockPrCommentsRes,
      [prReviewCommentsEndpoint]: mockPrReviewCommentsRes,
      [issueBodyEndpoint]: mockIssueBodyRes,
      [issueCommentsEndpoint]: mockIssueCommentsRes,
    }[url]),
}));

const { fetchPr, fetchIssue } = require('.');

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

describe('Fetching from the GitHub API', () => {
  it('should call the correct GitHub API endpoints and construct a pr object', async () => {
    const reqBody = {
      owner: 'bbc',
      repo: 'simorgh',
      id: '9188',
    };

    const pr = await fetchPr(reqBody);
    expect(pr).toEqual({
      body: 'PR Body',
      comments: [
        { id: 1, body: 'Added translations' },
        { id: 2, body: 'Nice work, LGTM!' },
      ],
      reviewComments: [{ id: 3, body: 'Smashed it!' }],
    });
  });

  it('should call the correct GitHub API endpoints and construct an issue object', async () => {
    const reqBody = {
      owner: 'bbc',
      repo: 'psammead',
      id: '4512',
    };

    const issue = await fetchIssue(reqBody);
    expect(issue).toEqual({
      body: 'Issue Body',
      comments: [
        { id: 4, body: 'Closing this' },
        { id: 5, body: 'Nice issue' },
      ],
    });
  });
});
