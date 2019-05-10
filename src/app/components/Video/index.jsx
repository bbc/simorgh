import React from 'react';
import { shape } from 'prop-types';
import deepGet from '../../helpers/json/deepGet';

const Video = ({ model }) => {
  const nestedModel = deepGet(['blocks', 0, 'model'], model);
  const kind = deepGet(['subType'], nestedModel);
  const title = deepGet(['title'], nestedModel);
  const version = deepGet(['versions', 0], nestedModel);
  const vpid = deepGet(['versionId'], version);
  const duration = deepGet(['duration'], version);
  const holdingImageUrl = deepGet(
    ['blocks', 1, 'model', 'blocks', 0, 'model', 'locator'],
    model,
  );
  const items = {
    versionId: vpid,
    kind,
    duration,
  };

  return (
    <div>
      <div>video pid: {vpid}</div>
      <div>kind: {kind}</div>
      <div>title: {title}</div>
      <div>holdingImageURL: {holdingImageUrl}</div>
      <div>uiLocale: </div>
      <div>items: {JSON.stringify(items, null, 4)}</div>
    </div>
  );
};

Video.propTypes = {
  model: shape().isRequired,
};

export default Video;
