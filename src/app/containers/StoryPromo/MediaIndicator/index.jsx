import React from 'react';
import moment from 'moment-timezone';
import { shape, bool, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import { storyItem } from '../../../models/propTypes/storyItem';
import formatDuration from '../../../lib/utilities/formatDuration';

const MediaIndicator = ({ item, topStory, service }) => {
  const isPGL = pathOr(null, ['cpsType'], item) === 'PGL';
  const isMedia = pathOr(null, ['cpsType'], item) === 'MAP';
  const hasMediaInfo = pathOr(null, ['media'], item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPGL && (!isMedia || !hasMediaInfo)) {
    return null;
  }

  const type = isPGL ? 'photogallery' : pathOr(null, ['media', 'format'], item);

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = pathOr(null, ['media', 'versions', 0, 'duration'], item);

  if (rawDuration) {
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration(duration);
    const isoDuration = duration.toISOString();
    return <p>media</p>;
  }

  return <p>media</p>;
};

MediaIndicator.propTypes = {
  item: shape(pick(['cpsType', 'media'], storyItem)).isRequired,
  topStory: bool,
  service: string.isRequired,
};

MediaIndicator.defaultProps = {
  topStory: false,
};

export default MediaIndicator;
