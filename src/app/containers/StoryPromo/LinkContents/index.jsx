import React, { useContext } from 'react';
import moment from 'moment-timezone';
import { shape, bool } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import pick from 'ramda/src/pick';
import { ServiceContext } from '#contexts/ServiceContext';
import formatDuration from '#lib/utilities/formatDuration';
import { storyItem } from '#models/propTypes/storyItem';
import { isPgl, isMap } from '../utilities';

const LinkContents = ({ item, isInline }) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  const isMedia = isMap(item);
  const isPhotoGallery = isPgl(item);
  const headlines = item?.headlines || null;

  const getContent = () => {
    if (headlines === null) {
      return item?.name || null;
    }
    const { headline, overtyped } = headlines;
    return overtyped || headline;
  };

  const content = getContent();

  if (!isPhotoGallery && !isMedia) {
    return content;
  }

  const getAnnouncedType = () => {
    if (isPhotoGallery) {
      return 'photogallery';
    }

    const mediaType = item?.media?.format || null;

    return mediaType === 'audio' ? 'listen' : mediaType;
  };

  const type = getAnnouncedType();

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = item?.media?.versions?.[0]?.duration || null;
  let offScreenDuration;

  if (rawDuration && !isInline) {
    const separator = ',';
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration({ duration, separator });
    const durationTranslation = mediaTranslations.duration || '';

    offScreenDuration = (
      <VisuallyHiddenText>
        {`, ${durationTranslation} ${durationString}`}
      </VisuallyHiddenText>
    );
  }
  const mediaType = mediaTranslations[type];

  return (
    // role="text" is required to correct a text splitting bug on iOS VoiceOver.
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text">
      {mediaType && <VisuallyHiddenText>{`${mediaType}, `}</VisuallyHiddenText>}
      <span>{content}</span>
      {offScreenDuration}
    </span>
  );
};

LinkContents.propTypes = {
  item: shape(pick(['cpsType', 'headlines', 'media'], storyItem)).isRequired,
  isInline: bool,
};

LinkContents.defaultProps = {
  isInline: false,
};

export default LinkContents;
