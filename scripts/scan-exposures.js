/* eslint-disable no-console */
const { Octokit } = require('@octokit/rest');

if (process.argv.length !== 5) {
  throw new Error(
    'Error: Incorrect number of args.\nUsage: node scan-simorgh.js <-pr/-issue> <id> <regex>',
  );
}

const flag = process.argv[2];
const id = process.argv[3];
const regex = new RegExp(process.argv[4], 'i');

const errorMsg =
  '\n\nFound potential exposure in GitHub PR/Issue. Please follow internal instructions to remove this.\n\n';

const octokit = new Octokit();

const scanCorpus = corpus => {
  let matches;
  corpus.forEach(text => {
    try {
      matches = text.match(regex);
    } catch (error) {
      throw new Error('Error encountered when attempting to match regex.');
    }
    if (matches) {
      process.exitCode = 1;
      throw new Error(errorMsg);
    }
  });

  console.log('\n\nFound no regex matches\n\n');

  return true;
};

const scanPr = async pullNumber => {
  let corpus = [];
  const requestBody = {
    owner: 'bbc',
    repo: 'simorgh',
    pullNumber,
  };

  try {
    // Get PR itself
    const pr = await octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pullNumber}',
      requestBody,
    );
    const { title, body } = pr.data;

    // Get PR Comments
    const prCommentsRequest = await octokit.request(
      'GET /repos/{owner}/{repo}/issues/{pullNumber}/comments',
      requestBody,
    );
    const prComments = prCommentsRequest.data.map(comment => comment.body);

    // Get PR Review Comments
    const prReviewCommentsRequest = await octokit.request(
      'GET /repos/{owner}/{repo}/pulls/{pullNumber}/comments',
      requestBody,
    );
    const prReviewComments = prReviewCommentsRequest.data.map(
      comment => comment.body,
    );

    corpus = [title, body, ...prComments, ...prReviewComments];
  } catch (error) {
    throw new Error(`Error when attempting to get PR #${pullNumber}`);
  }

  return scanCorpus(corpus, regex);
};

const scanIssue = async issueNumber => {
  let corpus = [];
  const requestBody = {
    owner: 'bbc',
    repo: 'simorgh',
    issueNumber,
  };

  try {
    // Get issue itself
    const issue = await octokit.request(
      'GET /repos/{owner}/{repo}/issues/{issueNumber}',
      requestBody,
    );
    const { title, body } = issue.data;

    // Get issue comments
    const issueCommentsRequest = await octokit.request(
      'GET /repos/{owner}/{repo}/issues/{issueNumber}/comments',
      requestBody,
    );
    const issueComments = issueCommentsRequest.data.map(
      comment => comment.body,
    );

    corpus = [title, body, ...issueComments];
  } catch (error) {
    throw new Error(`Error when attempting to get issue #${issueNumber}`);
  }

  return scanCorpus(corpus, regex);
};

({
  '-pr': scanPr,
  '-issue': scanIssue,
}[flag](id));
