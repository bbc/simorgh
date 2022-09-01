import { scanPr, scanIssue } from '.';

describe('Scanning a PR', () => {
  const pr = {
    body: 'PR Body',
    comments: [
      { id: 1, body: 'Added Translations' },
      { id: 2, body: 'Nice work, LGTM!' },
    ],
    reviewComments: [
      { id: 3, body: 'Smashed it!' },
      { id: 4, body: 'Should there be new translations for this?' },
    ],
  };

  it('should return the original PR with empty comment arrays if no matches have been found', () => {
    const regex = new RegExp('foo|bar', 'gi');
    const scannedPr = scanPr(pr, regex);
    expect(scannedPr).toEqual({
      ...pr,
      foundMatch: false,
      comments: [],
      reviewComments: [],
    });
  });

  it('should return the PR with a redacted body and empty comment arrays if a body match was found', () => {
    const regex = new RegExp('Body', 'gi');
    const scannedPr = scanPr(pr, regex);

    expect(scannedPr).toEqual({
      body: 'PR *',
      foundMatch: true,
      comments: [],
      reviewComments: [],
    });
  });

  it('should return the PR with redacted comments and review comments if a match has been found', () => {
    const regex = new RegExp('translations', 'gi');
    const scannedPr = scanPr(pr, regex);

    expect(scannedPr).toEqual({
      ...pr,
      foundMatch: true,
      comments: [{ id: 1, body: 'Added *' }],
      reviewComments: [{ id: 4, body: 'Should there be new * for this?' }],
    });
  });

  it('should not log the regex when the scanPr method throws', () => {
    const regex = new RegExp('foobar', 'gi');
    const invalidPr = {
      body: ['test'],
      comments: [],
      reviewcomments: [],
    };

    expect(() => {
      scanPr(invalidPr, regex);
    }).toThrow('Encountered an error when scanning.');
  });
});

describe('Scanning an Issue', () => {
  const issue = {
    body: 'Issue Body',
    comments: [
      { id: 4, body: 'Closing this' },
      { id: 5, body: 'Nice issue' },
    ],
  };

  it('should return the original issue with empty comment arrays if there are no matches', () => {
    const regex = new RegExp('foo|bar');
    const scannedIssue = scanIssue(issue, regex);
    expect(scannedIssue).toEqual({
      ...issue,
      foundMatch: false,
      comments: [],
    });
  });

  it('should return the issue with a redacted body if there is a match in the issue body', () => {
    const regex = new RegExp('body', 'gi');
    const scannedIssue = scanIssue(issue, regex);
    expect(scannedIssue).toEqual({
      body: 'Issue *',
      foundMatch: true,
      comments: [],
    });
  });

  it('should return the issue with redacted body and comments if a match occurs in either', () => {
    const regex = new RegExp('issue', 'gi');
    const scannedIssue = scanIssue(issue, regex);
    expect(scannedIssue).toEqual({
      body: '* Body',
      foundMatch: true,
      comments: [{ id: 5, body: 'Nice *' }],
    });
  });

  it('should not log the regex when scanIssue throws', () => {
    const invalidIssue = {
      body: 'text',
      comments: 'non-iterable',
      reviewComments: [],
    };
    const regex = new RegExp('foobar', 'gi');
    expect(() => {
      scanIssue(invalidIssue, regex);
    }).toThrow('Encountered an error when scanning.');
  });
});
