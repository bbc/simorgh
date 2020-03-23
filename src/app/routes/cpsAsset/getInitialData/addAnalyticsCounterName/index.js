import assocPath from 'ramda/src/assocPath';
import path from 'ramda/src/path';

const transformer = (pagedata) => {
  const id = path(['metadata', 'id'], pagedata);
  const counterName = id.split(':').pop().replace(/\//g, '.').concat('.page');

  return assocPath(
    ['metadata', 'analyticsLabels', 'counterName'],
    counterName,
    pagedata,
  );
};

export default transformer;
