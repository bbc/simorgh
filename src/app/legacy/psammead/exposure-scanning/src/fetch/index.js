let octokit;

(async () => {
  if (process.env.GITHUB_ACTION && process.env.GITHUB_TOKEN) {
    const { Octokit } = await import('@octokit/action');
    octokit = new Octokit();
  } else {
    const { Octokit } = await import('@octokit/rest');
    octokit = new Octokit();
  }
})();

const fetchPrBody = async reqBody => {
  const {
    data: { body },
  } = await octokit.request('GET /repos/{owner}/{repo}/pulls/{id}', reqBody);
  return body;
};

const fetchComments = async reqBody => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/issues/{id}/comments',
    reqBody,
  );
  return data.map(({ id, body }) => ({
    id,
    body,
  }));
};

const fetchReviewComments = async reqBody => {
  const { data } = await octokit.request(
    'GET /repos/{owner}/{repo}/pulls/{id}/comments',
    reqBody,
  );
  return data.map(({ id, body }) => ({
    id,
    body,
  }));
};

const fetchIssueBody = async reqBody => {
  const {
    data: { body },
  } = await octokit.request('GET /repos/{owner}/{repo}/issues/{id}', reqBody);
  return body;
};

export const fetchPr = async reqBody => {
  const [body, comments, reviewComments] = await Promise.all([
    fetchPrBody(reqBody),
    fetchComments(reqBody),
    fetchReviewComments(reqBody),
  ]);

  return {
    body,
    comments,
    reviewComments,
  };
};

export const fetchIssue = async reqBody => {
  const [body, comments] = await Promise.all([
    fetchIssueBody(reqBody),
    fetchComments(reqBody),
  ]);

  return {
    body,
    comments,
  };
};
