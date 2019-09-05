import React from 'react';
import moment from 'moment-timezone';
import { shape, bool, string, oneOfType } from 'prop-types';
import MediaIndicatorComp from '@bbc/psammead-media-indicator';
import path from 'ramda/src/path';
import { storyItem, linkPromo } from '../../../models/propTypes/storyItem';
import formatDuration from '../../../lib/utilities/formatDuration';

const getAssetContentTypes = item => {
  const mediaContentTypes = ['audio'];
  const type = path(['contentType'], item) && item.contentType.toLowerCase();
  return mediaContentTypes.includes(type) ? type : null;
};

const getCpsMediaTypes = item => {
  const isPGL = path(['cpsType'], item) === 'PGL';
  const isCpsMedia = path(['cpsType'], item) === 'MAP';
  const hasMediaInfo = path(['media'], item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPGL && (!isCpsMedia || !hasMediaInfo)) {
    return null;
  }
  return isPGL ? 'photogallery' : path(['media', 'format'], item);
};

const getMediaType = item => {
  const isAssetTypeMedia = path(['assetTypeCode'], item);
  return isAssetTypeMedia ? getAssetContentTypes(item) : getCpsMediaTypes(item);
};

const MediaIndicator = ({ item, topStory, service, indexAlsos }) => {
  const type = getMediaType(item);

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = path(['media', 'versions', 0, 'duration'], item);

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
