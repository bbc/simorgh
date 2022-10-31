import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';

const getISOStringDate = date => new Date(date).toISOString();

export const getArticleId = path(['metadata', 'id']);

export const getHeadline = path(['promo', 'headlines', 'seoHeadline']);

export const getSummary = path([
  'promo',
  'summary',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'text',
]);

export const getFirstPublished = articleData =>
  getISOStringDate(path(['metadata', 'firstPublished'], articleData));

export const getLastPublished = articleData =>
  getISOStringDate(path(['metadata', 'lastPublished'], articleData));

export const getAboutTags = path(['metadata', 'tags', 'about']);

export const getArticleSection = path(['metadata', 'passport', 'genre']);

export const getMentions = path(['metadata', 'tags', 'mentions']);

export const getLang = path(['metadata', 'passport', 'language']);

export const getAuthorTwitterHandle = articleContentBlocks => {
  const [firstByline, ...otherBylines] = articleContentBlocks.filter(
    block => block.type === 'byline',
  );
  const [firstContributor, ...otherContributors] = pathOr(
    null,
    ['model', 'blocks'],
    firstByline,
  );

  if (!isEmpty(otherBylines) || !isEmpty(otherContributors)) return null;

  const contributorBlocks = pathOr(null, ['model', 'blocks'], firstContributor);
  const contributorLink = contributorBlocks.find(
    block => block.type === 'link',
  );
  const contributorHandle = pathOr(
    null,
    [
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'blocks',
      0,
      'model',
      'text',
    ],
    contributorLink,
  );
  return contributorHandle;
};
