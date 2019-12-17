import React, { useContext } from 'react';
import moment from 'moment-timezone';
import { shape } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import { ServiceContext } from '#contexts/ServiceContext';
import formatDuration from '#lib/utilities/formatDuration';
import { storyItem } from '#models/propTypes/storyItem';

const LinkContents = ({ item }) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  const isMedia = pathOr(null, ['cpsType'], item) === 'MAP';
  const isPGL = pathOr(null, ['cpsType'], item) === 'PGL';
  const headlines = pathOr(null, ['headlines'], item);

  const getContent = () => {
    if (headlines === null) {
      return pathOr(null, ['name'], item);
    }
    const { headline, overtyped } = headlines;
    return overtyped || headline;
  };

  const content = getContent();

  if (!isPGL && !isMedia) {
    return content;
  }

  const type = isPGL ? 'photogallery' : pathOr(null, ['media', 'format'], item);

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = pathOr(null, ['media', 'versions', 0, 'duration'], item);

  const separator = ',';
  const duration = moment.duration(rawDuration, 'seconds');
  const durationString = formatDuration({ duration, separator });

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
  item: shape(pick(['cpsType', 'headlines', 'media'], storyItem)).isRequired,
};

export default LinkContents;
