import React, { useContext } from 'react';
import moment from 'moment-timezone';
import { shape, bool, string } from 'prop-types';
import pathOr from 'ramda/src/pathOr';
import pick from 'ramda/src/pick';
import formatDuration from '#lib/utilities/formatDuration';
import { getHeadline } from '#lib/utilities/getStoryPromoInfo';
import { storyItem } from '#models/propTypes/storyItem';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import { isPgl, isMap } from '../utilities';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const LinkContents = ({ item, isInline, id }) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  const isMedia = isMap(item);
  const isPhotoGallery = isPgl(item);

  const headline = getHeadline(item);

  if (!isPhotoGallery && !isMedia) {
    // This span is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    return <span id={id}>{headline}</span>;
  }

  const getAnnouncedType = () => {
    if (isPhotoGallery) {
      return 'photogallery';
    }

    const mediaType = (
      pathOr(null, ['media', 'format'], item) ||
      pathOr(null, ['contentType'], item)
    )?.toLowerCase();
    return mediaType === 'audio' ? 'listen' : mediaType;
  };

  const type = getAnnouncedType();
  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = pathOr(null, ['media', 'versions', 0, 'duration'], item);
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
    // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text" id={id}>
      {mediaType && <VisuallyHiddenText>{`${mediaType}, `}</VisuallyHiddenText>}
      <span>{headline}</span>
      {offScreenDuration}
    </span>
  );
};

LinkContents.propTypes = {
  item: shape(pick(['cpsType', 'headlines', 'media'], storyItem)).isRequired,
  isInline: bool,
  id: string.isRequired,
};

LinkContents.defaultProps = {
  isInline: false,
};

export default LinkContents;
