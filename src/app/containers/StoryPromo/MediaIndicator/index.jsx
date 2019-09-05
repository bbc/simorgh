import React from 'react';
import moment from 'moment-timezone';
import { shape, bool, string, oneOfType } from 'prop-types';
import MediaIndicatorComp from '@bbc/psammead-media-indicator';
import pathOr from 'ramda/src/pathOr';
import { storyItem, linkPromo } from '../../../models/propTypes/storyItem';
import formatDuration from '../../../lib/utilities/formatDuration';

const getAssetContentTypes = item => {
  const mediaContentTypes = ['audio'];
  const type = pathOr(null, ['contentType'], item).toLowerCase();
  return mediaContentTypes.includes(type) ? type : null;
};

const getCpsMediaTypes = item => {
  const isPGL = pathOr(null, ['cpsType'], item) === 'PGL';
  const isCpsMedia = pathOr(null, ['cpsType'], item) === 'MAP';
  const hasMediaInfo = pathOr(null, ['media'], item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPGL && (!isCpsMedia || !hasMediaInfo)) {
    return null;
  }
  return isPGL ? 'photogallery' : pathOr(null, ['media', 'format'], item);
};

const getMediaType = item => {
  const isAssetTypeMedia = pathOr(null, ['assetTypeCode'], item);
  return isAssetTypeMedia ? getAssetContentTypes(item) : getCpsMediaTypes(item);
};

const MediaIndicator = ({ item, topStory, service, indexAlsos }) => {
  const type = getMediaType(item);

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
    type && (
      <MediaIndicatorComp
        type={type}
        service={service}
        indexAlsos={indexAlsos}
      />
    )
  );
};

MediaIndicator.propTypes = {
  item: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  topStory: bool,
  service: string.isRequired,
  indexAlsos: bool,
};

MediaIndicator.defaultProps = {
  topStory: false,
  indexAlsos: false,
};

export default MediaIndicator;
