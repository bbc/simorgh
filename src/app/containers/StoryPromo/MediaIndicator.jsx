import React from 'react';
import moment from 'moment-timezone';
import { shape, bool, string } from 'prop-types';
import MediaIndicatorComp from '@bbc/psammead-media-indicator';

import { storyItem } from '../../models/propTypes/storyItem';
import deepGet from '../../lib/utilities/deepGet';
import formatDuration from '../../lib/utilities/formatDuration';

const MediaIndicator = ({ item, topStory, service }) => {
  const isMedia = deepGet(['cpsType'], item) === 'MAP';
  const hasMediaInfo = deepGet(['media'], item);

  // Only build a media indicator if this is a media item.
  if (!isMedia || !hasMediaInfo) {
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
        type={type}
        topStory={topStory}
        service={service}
      />
    );
  }

  return <MediaIndicatorComp type={type} service={service} />;
};

MediaIndicator.propTypes = {
  item: shape(storyItem).isRequired,
  topStory: bool,
  service: string.isRequired,
};

MediaIndicator.defaultProps = {
  topStory: false,
};

export default MediaIndicator;
