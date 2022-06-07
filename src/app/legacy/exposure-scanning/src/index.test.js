import parseArgs from './args';
import { fetchPr, fetchIssue } from './fetch';
import { patchPr, patchIssue } from './patch';
import scanExposures from '.';

jest.mock('./args');
jest.mock('./fetch');
jest.mock('./patch'); // Please keep this mock so that you don't accidentally edit a PR or issue by running these tests.

describe('Expected PR scanning', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    parseArgs.mockReturnValueOnce({
      repo: 'psammead',
      id: '100000',
      flag: '-pr',
      regexString: 'foo|bar',
    });
  });

  it('should not throw or patch when there are no matches in a PR', async () => {
    fetchPr.mockResolvedValueOnce({
      body: 'Pr Body',
      comments: [],
      reviewComments: [],
    });

    await expect(scanExposures()).resolves.toBe('No matches found.');
    expect(patchPr).not.toHaveBeenCalled();
  });

  it('should throw when there is a match in the PR body', async () => {
    fetchPr.mockResolvedValueOnce({
      body: 'foo and bar',
      comments: [],
      reviewComments: [],
    });

    await expect(scanExposures()).rejects.toThrow();
    expect(patchPr).toHaveBeenCalled();
  });

  it('should throw when there is a match in the PR comments', async () => {
    fetchPr.mockResolvedValueOnce({
      body: 'PR Body',
      comments: [{ id: 3, body: 'foooooo' }],
      reviewComments: [],
    });

    await expect(scanExposures()).rejects.toThrow();
    expect(patchPr).toHaveBeenCalled();
  });

  it('should throw when there is a match in the PR review comments', async () => {
    fetchPr.mockResolvedValueOnce({
      body: 'Pr Body',
      comments: [],
      reviewComments: [{ id: 1, body: 'foo bar bar foo' }],
    });

    await expect(scanExposures()).rejects.toThrow();
    expect(patchPr).toHaveBeenCalled();
  });
});

describe('Expected issue scanning', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    parseArgs.mockReturnValueOnce({
      repo: 'psammead',
      id: '100000',
      flag: '-issue',
      regexString: 'foo|bar',
    });
  });

  it('should not throw when there are no matches in an issue', async () => {
    fetchIssue.mockResolvedValueOnce({
      body: 'Issue Body',
      comments: [],
    });

    await expect(scanExposures()).resolves.toBe('No matches found.');
    expect(patchIssue).not.toHaveBeenCalled();
  });

  it('should throw when there is a match in the issue body', async () => {
    fetchIssue.mockResolvedValueOnce({
      body: 'foobar',
      comments: [],
    });

    await expect(scanExposures()).rejects.toThrow();
    expect(patchIssue).toHaveBeenCalled();
  });

  it('should throw when there is a match in the issue comments', async () => {
    fetchIssue.mockResolvedValueOnce({
      body: 'Issue Body',
      comments: [{ id: 0, body: 'bar.' }],
    });

    await expect(scanExposures()).rejects.toThrow();
    expect(patchIssue).toHaveBeenCalled();
  });
});
