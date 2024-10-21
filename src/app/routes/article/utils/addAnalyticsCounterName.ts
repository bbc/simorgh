import { assocPath, hasPath } from 'rambda';
import { Article } from '#app/models/types/optimo';

const hasCounterName = hasPath(['metadata', 'analyticsLabels', 'counterName']);

const transformer = (pageData: Article) => {
  if (pageData?.metadata?.type !== 'FIX') return pageData;
  if (hasCounterName(pageData)) return pageData;

  const id = pageData?.metadata?.id;

  const counterName = id.split(':').pop()?.replace(/\//g, '.').concat('.page');

  return assocPath(
    ['metadata', 'analyticsLabels', 'counterName'],
    counterName,
    pageData,
  );
};

export default transformer;
