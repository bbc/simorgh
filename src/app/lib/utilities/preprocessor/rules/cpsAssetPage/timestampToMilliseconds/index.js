import path from 'ramda/src/path';
import deepClone from 'ramda/src/clone';
import compose from 'ramda/src/compose';

// ARES sometimes reports timestamps in seconds; sometimes in milliseconds
// This standardises that by assuming any timestamp before 1973 needs converted to ms
const MINIMUM_TIMESTAMP_VALUE = 100000000000; // March 1973

const standardiseMetadataTimestamps = jsonRaw => {
  const firstPublished = path(['metadata', 'firstPublished'], jsonRaw);
  const lastPublished = path(['metadata', 'lastPublished'], jsonRaw);
  const lastUpdated = path(['metadata', 'lastUpdated'], jsonRaw);

  const json = deepClone(jsonRaw);

  if (firstPublished < MINIMUM_TIMESTAMP_VALUE) {
    json.metadata.firstPublished = firstPublished * 1000;
  }

  if (lastPublished < MINIMUM_TIMESTAMP_VALUE) {
    json.metadata.lastPublished = lastPublished * 1000;
  }

  if (lastUpdated < MINIMUM_TIMESTAMP_VALUE) {
    json.metadata.lastUpdated = lastUpdated * 1000;
  }

  return json;
};

const standardiseRelatedContentTimestamps = jsonRaw => {
  const relatedContent = path(
    ['relatedContent', 'groups', 0, 'promos'],
    jsonRaw,
  );

  if (!Array.isArray(relatedContent)) return jsonRaw;

  const json = deepClone(jsonRaw);
  json.relatedContent.groups[0].promos = relatedContent.map(item => ({
    ...item,
    timestamp:
      item.timestamp < MINIMUM_TIMESTAMP_VALUE
        ? item.timestamp * 1000
        : item.timestamp,
  }));

  return json;
};

export default compose(
  standardiseMetadataTimestamps,
  standardiseRelatedContentTimestamps,
);
