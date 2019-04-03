import get from '../../../helpers/json/deepGet';

const getArticleId = articleData => {
  const aresID = get(['metadata', 'id'], articleData);
  return aresID ? aresID.split(':').pop() : 'unknown';
};

export default getArticleId;
