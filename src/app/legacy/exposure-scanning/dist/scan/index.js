"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanIssue = exports.scanPr = exports.scanComments = exports.scanText = void 0;
var replacementStr = '*';

var scanText = function scanText(text, regex) {
  var scannedText = text.replace(regex, replacementStr);
  var foundTextMatch = scannedText !== text;
  return {
    body: scannedText,
    foundTextMatch: foundTextMatch
  };
};

exports.scanText = scanText;

var scanComments = function scanComments(comments, regex) {
  var scannedComments = comments.map(function (_ref) {
    var id = _ref.id,
        body = _ref.body;

    if (regex.test(body)) {
      return {
        id: id,
        body: body.replace(regex, replacementStr)
      };
    }

    return false;
  }).filter(Boolean);
  var foundCommentMatch = scannedComments.length > 0;
  return {
    comments: scannedComments,
    foundCommentMatch: foundCommentMatch
  };
};

exports.scanComments = scanComments;

var scanPr = function scanPr(pr, regex) {
  try {
    var _scanText = scanText(pr.body, regex),
        body = _scanText.body,
        foundTextMatch = _scanText.foundTextMatch;

    var _scanComments = scanComments(pr.comments, regex),
        comments = _scanComments.comments,
        foundCommentMatch = _scanComments.foundCommentMatch;

    var _scanComments2 = scanComments(pr.reviewComments, regex),
        reviewComments = _scanComments2.comments,
        foundReviewCommentsMatch = _scanComments2.foundCommentMatch;

    return {
      body: body,
      comments: comments,
      reviewComments: reviewComments,
      foundMatch: foundTextMatch || foundCommentMatch || foundReviewCommentsMatch
    };
  } catch (error) {
    throw new Error('Encountered an error when scanning.');
  }
};

exports.scanPr = scanPr;

var scanIssue = function scanIssue(issue, regex) {
  try {
    var _scanText2 = scanText(issue.body, regex),
        body = _scanText2.body,
        foundTextMatch = _scanText2.foundTextMatch;

    var _scanComments3 = scanComments(issue.comments, regex),
        comments = _scanComments3.comments,
        foundCommentMatch = _scanComments3.foundCommentMatch;

    return {
      body: body,
      comments: comments,
      foundMatch: foundTextMatch || foundCommentMatch
    };
  } catch (error) {
    throw new Error('Encountered an error when scanning.');
  }
};

exports.scanIssue = scanIssue;