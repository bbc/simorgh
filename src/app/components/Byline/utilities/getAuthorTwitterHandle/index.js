import { pathOr, isEmpty } from 'rambda';

const getAuthorTwitterHandle = articleContentBlocks => {
  const [firstByline, ...otherBylines] = articleContentBlocks.filter(
    block => block.type === 'byline',
  );

  if (!firstByline) return null;

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
  const sanitizedcontributorHandle = contributorHandle
    ? contributorHandle.replace(/^@*/, '@')
    : null;
  return sanitizedcontributorHandle;
};

export default getAuthorTwitterHandle;
