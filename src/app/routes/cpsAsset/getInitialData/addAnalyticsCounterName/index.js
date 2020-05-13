import assocPath from 'ramda/src/assocPath';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';

const hasCounterName = hasPath(['metadata', 'analyticsLabels', 'counterName']);

const transformer = pagedata => {
  if (hasCounterName(pagedata)) return pagedata;
  const id = path(['metadata', 'id'], pagedata);
  const counterName = id.split(':').pop().replace(/\//g, '.').concat('.page');

  return assocPath(
    ['metadata', 'analyticsLabels', 'counterName'],
    counterName,
    pagedata,
  );
};

export default transformer;
