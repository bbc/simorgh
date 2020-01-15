import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import compose from 'ramda/src/compose';

// ARES sometimes reports timestamps in seconds; sometimes in milliseconds
// This standardises that by assuming any timestamp before 1973 needs converted to ms
const MINIMUM_TIMESTAMP_VALUE = 100000000000; // March 1973

const isInSeconds = timestamp =>
  timestamp && timestamp < MINIMUM_TIMESTAMP_VALUE;

const convertToMilliseconds = timestamp => timestamp * 1000;

const standardiseTimestamp = timestamp =>
  isInSeconds(timestamp) ? convertToMilliseconds(timestamp) : timestamp;

const standardiseMetadataTimestamps = json => {
  if (!json.metadata) return json;

  return mergeDeepLeft(
    {
      metadata: {
        firstPublished: standardiseTimestamp(json.metadata.firstPublished),
        lastPublished: standardiseTimestamp(json.metadata.lastPublished),
        lastUpdated: standardiseTimestamp(json.metadata.lastUpdated),
      },
    },
    json,
  );
};

const standardiseRelatedContentTimestamp = item => ({
  ...item,
  timestamp: standardiseTimestamp(item.timestamp),
});

const standardiseRelatedContentTimestamps = json => {
  const relatedContent = path(['relatedContent', 'groups', 0, 'promos'], json);

  if (!Array.isArray(relatedContent)) return json;

  return mergeDeepLeft(
    {
      relatedContent: {
        groups: [
          {
            promos: relatedContent.map(standardiseRelatedContentTimestamp),
          },
        ],
      },
    },
    json,
  );
};

export default compose(
  standardiseMetadataTimestamps,
  standardiseRelatedContentTimestamps,
);
