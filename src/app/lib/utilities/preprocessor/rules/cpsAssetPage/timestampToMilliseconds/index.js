import pathOr from 'ramda/src/pathOr';
import deepClone from 'ramda/src/clone';
import semverCompare from 'semver-compare';

const timestampToMilliseconds = jsonRaw => {
  const firstPublished = pathOr(null, ['metadata', 'firstPublished'], jsonRaw);
  const lastPublished = pathOr(null, ['metadata', 'lastPublished'], jsonRaw);
  const rawAresVersion = pathOr(null, ['metadata', 'version'], jsonRaw);

  // if cant find ares version, do nothing
  if (!rawAresVersion) return jsonRaw;

  const aresVersion = rawAresVersion.replace('v', '');

  const semverComparison = semverCompare(aresVersion, '1.1.0');

  // if ares version is 1.1.0 or above, do nothing
  if (semverComparison !== -1) return jsonRaw;

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
