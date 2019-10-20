import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';

// 315532801000 is the first second of 1980 in milliseconds, if a
// timestamp greater than that, its probably in milliseconds.
const isAfter1980 = timestamp => timestamp > 315532801000;

// This bodge will be removed once ares sends timestamps in milliseconds;
const timestampToMilliseconds = jsonRaw => {
  const firstPublished = pathOr(null, ['metadata', 'firstPublished'], jsonRaw);
  const lastPublished = pathOr(null, ['metadata', 'lastPublished'], jsonRaw);

  if (isAfter1980(firstPublished) && isAfter1980(lastPublished)) {
    return jsonRaw;
  }

  const json = deepClone(jsonRaw);

  if (firstPublished) {
    json.metadata.firstPublished = firstPublished * 1000;
  }

  if (lastPublished) {
    json.metadata.lastPublished = lastPublished * 1000;
  }

  return json;
};

export default timestampToMilliseconds;
