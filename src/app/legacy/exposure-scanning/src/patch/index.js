let octokit;

// Used to limit the number of calls to the patch comment and review comment endpoint
// since each comment is uniquely identified in the context of the repository instead
// of the individual PR/issue, and we only wish to update the comments and review comments
// of that single PR or issue.
const maxCommentPatches = 20;

(async () => {
  if (process.env.GITHUB_ACTION && process.env.GITHUB_TOKEN) {
    const { Octokit } = await import('@octokit/action');
    octokit = new Octokit();
  } else {
    const { Octokit } = await import('@octokit/rest');
    octokit = new Octokit();
  }
})();

const patchPrBody = async (reqBody, body) => {
  await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{id}', {
    ...reqBody,
    body,
  });
};

const patchReviewComments = async (reqBody, comments) => {
  await Promise.all(
    comments.slice(0, maxCommentPatches).map(({ id, body }) =>
      octokit.request('PATCH /repos/{owner}/{repo}/pulls/comments/{id}', {
        owner: reqBody.owner,
        repo: reqBody.repo,
        id,
        body,
      }),
    ),
  );
};

const patchComments = async (reqBody, comments) => {
  await Promise.all(
    comments.slice(0, maxCommentPatches).map(({ id, body }) =>
      octokit.request('PATCH /repos/{owner}/{repo}/issues/comments/{id}', {
        ...reqBody,
        id,
        body,
      }),
    ),
  );
};

const patchIssueBody = async (reqBody, body) => {
  await octokit.request('PATCH /repos/{owner}/{repo}/issues/{id}', {
    ...reqBody,
    body,
  });
};

export const patchPr = async (reqBody, { body, comments, reviewComments }) => {
  await Promise.all([
    patchPrBody(reqBody, body),
    patchComments(reqBody, comments),
    patchReviewComments(reqBody, reviewComments),
  ]);
};

export const patchIssue = async (reqBody, { body, comments }) => {
  await Promise.all([
    patchIssueBody(reqBody, body),
    patchComments(reqBody, comments),
  ]);
};
