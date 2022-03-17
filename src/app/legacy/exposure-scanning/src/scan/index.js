const replacementStr = '*';

export const scanText = (text, regex) => {
  const scannedText = text.replace(regex, replacementStr);
  const foundTextMatch = scannedText !== text;

  return { body: scannedText, foundTextMatch };
};

export const scanComments = (comments, regex) => {
  const scannedComments = comments
    .map(({ id, body }) => {
      if (regex.test(body)) {
        return {
          id,
          body: body.replace(regex, replacementStr),
        };
      }
      return false;
    })
    .filter(Boolean);
  const foundCommentMatch = scannedComments.length > 0;

  return { comments: scannedComments, foundCommentMatch };
};

export const scanPr = (pr, regex) => {
  try {
    const { body, foundTextMatch } = scanText(pr.body, regex);
    const { comments, foundCommentMatch } = scanComments(pr.comments, regex);
    const {
      comments: reviewComments,
      foundCommentMatch: foundReviewCommentsMatch,
    } = scanComments(pr.reviewComments, regex);

    return {
      body,
      comments,
      reviewComments,
      foundMatch:
        foundTextMatch || foundCommentMatch || foundReviewCommentsMatch,
    };
  } catch (error) {
    throw new Error('Encountered an error when scanning.');
  }
};

export const scanIssue = (issue, regex) => {
  try {
    const { body, foundTextMatch } = scanText(issue.body, regex);
    const { comments, foundCommentMatch } = scanComments(issue.comments, regex);

    return { body, comments, foundMatch: foundTextMatch || foundCommentMatch };
  } catch (error) {
    throw new Error('Encountered an error when scanning.');
  }
};
