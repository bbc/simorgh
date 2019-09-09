import React from 'react';
import moment from 'moment-timezone';
import { shape, bool, string } from 'prop-types';
import MediaIndicatorComp from '@bbc/psammead-media-indicator';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import { storyItem } from '../../../models/propTypes/storyItem';
import formatDuration from '../../../lib/utilities/formatDuration';

const getAssetContentTypes = item => {
  const mediaContentTypes = ['video'];
  let type = pathOr(null, ['contentType'], item);
  if (type != null) {
    type = type.toLowerCase();
  }
  return mediaContentTypes.includes(type) ? type : null;
};

const getCpsMediaTypes = item => {
  const isPGL = path(['cpsType'], item) === 'PGL';
  const isMedia = path(['cpsType'], item) === 'MAP';
  const hasMediaInfo = path(['media'], item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPGL && (!isMedia || !hasMediaInfo)) {
    return null;
  }
  const type = isPGL ? 'photogallery' : path(['media', 'format'], item);
  return type || null;
};

const getMediaType = item => {
  const isAssetTypeMedia = path(['assetTypeCode'], item);
  return isAssetTypeMedia ? getAssetContentTypes(item) : getCpsMediaTypes(item);
};

const MediaIndicator = ({ item, topStory, service, indexAlsos }) => {
  const type = getMediaType(item);

  if (!type) {
    return null;
  }

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = pathOr(null, ['media', 'versions', 0, 'duration'], item);

  if (rawDuration) {
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration(duration);
    const isoDuration = duration.toISOString();
    return (
      <MediaIndicatorComp
        duration={durationString}
        datetime={isoDuration}
        type={type}
        topStory={topStory}
        service={service}
      />
    );
  }

  return (
    <MediaIndicatorComp type={type} service={service} indexAlsos={indexAlsos} />
  );
};

MediaIndicator.propTypes = {
  item: shape(pick(['cpsType', 'media'], storyItem)).isRequired,
  topStory: bool,
  service: string.isRequired,
  indexAlsos: bool,
};

MediaIndicator.defaultProps = {
  topStory: false,
  indexAlsos: false,
};

export default MediaIndicator;
