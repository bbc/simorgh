import React, { useContext } from 'react';
import moment from 'moment-timezone';
import { shape } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import pathOr from 'ramda/src/pathOr';
import { ServiceContext } from '../../../contexts/ServiceContext';
import describeDuration from '../../../lib/utilities/describeDuration';
import { storyItem } from '../../../models/propTypes/storyItem';

const LinkContents = ({ item }) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  const isMedia = pathOr(null, ['cpsType'], item) === 'MAP';
  const headlines = pathOr(null, ['headlines'], item);
  const { headline, overtyped } = headlines;
  const content = overtyped || headline;

  if (!isMedia) {
    return content;
  }

  const type = pathOr(null, ['media', 'format'], item);

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = pathOr(null, ['media', 'versions', 0, 'duration'], item);

  // hilariously, this works. according to moment, null seconds == 0 seconds!
  const duration = moment.duration(rawDuration, 'seconds');
  const durationString = describeDuration(duration);

  return (
    // role="text" is required to correct a text splitting bug on iOS VoiceOver.
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text">
      <VisuallyHiddenText>{mediaTranslations[type]}, </VisuallyHiddenText>
      <span>{content}</span>
      {rawDuration && (
        // once we have 'duration' translations, we could place those here
        <VisuallyHiddenText>{`, ${durationString}`}</VisuallyHiddenText>
      )}
    </span>
  );
};

LinkContents.propTypes = {
  item: shape(storyItem).isRequired,
};

export default LinkContents;
