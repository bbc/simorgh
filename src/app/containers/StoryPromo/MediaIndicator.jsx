import React from 'react';
import moment from 'moment-timezone';
import { shape } from 'prop-types';
import MediaIndicatorComp from '@bbc/psammead-media-indicator';

import { storyItem } from '../../models/propTypes/storyItem';
import deepGet from '../../lib/utilities/deepGet';
import formatDuration from '../../lib/utilities/formatDuration';

const capitalise = str => str.slice(0, 1).toUpperCase() + str.slice(1);

const MediaIndicator = ({ item }) => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';
  // Only build a media indicator if this is a media item.
  if (!isMedia) {
    return null;
  }

  const type = deepGet(['media', 'format'], item);
  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = deepGet(['media', 'versions', 0, 'duration'], item);

  if (rawDuration) {
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration(duration);
    const isoDuration = duration.toISOString();
    return (
      <MediaIndicatorComp
        duration={durationString}
        datetime={isoDuration}
        offscreenText={capitalise(type)}
        type={type}
      />
    );
  }

  return <MediaIndicatorComp offscreenText={capitalise(type)} type={type} />;
};

MediaIndicator.propTypes = {
  item: shape(storyItem).isRequired,
};

export default MediaIndicator;
