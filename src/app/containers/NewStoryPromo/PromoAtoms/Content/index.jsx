import React, { useContext } from 'react';
import { string, number, bool } from 'prop-types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '#app/legacy/psammead-visually-hidden-text/src';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';

const Content = ({
  id,
  mediaType,
  mediaDuration,
  headline,
  isPhotoGallery,
}) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  if (!isPhotoGallery && !mediaType) {
    // This span is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    return <span id={id}>{headline}</span>;
  }

  const getAnnouncedType = () => {
    if (isPhotoGallery) {
      return 'photogallery';
    }
    return mediaType === 'audio' ? 'listen' : mediaType;
  };

  const type = getAnnouncedType();

  const announcedMediaType = mediaTranslations[type];

  let offScreenDuration;

  if (mediaDuration) {
    const separator = ',';
    const duration = moment.duration(mediaDuration, 'seconds');
    const durationString = formatDuration({ duration, separator });
    const durationTranslation = mediaTranslations.duration || '';

    offScreenDuration = (
      <VisuallyHiddenText>
        {`, ${durationTranslation} ${durationString}`}
      </VisuallyHiddenText>
    );
  }

  return (
    // role="text" is required to correct a text splitting bug on iOS VoiceOver.
    // ID is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <span role="text" id={id}>
      {announcedMediaType && (
        <VisuallyHiddenText>{`${announcedMediaType}, `}</VisuallyHiddenText>
      )}
      <span>{headline}</span>
      {offScreenDuration}
    </span>
  );
};

Content.propTypes = {
  id: string.isRequired,
  mediaType: string,
  mediaDuration: number,
  headline: string.isRequired,
  isPhotoGallery: bool,
};
Content.defaultProps = {
  mediaType: null,
  mediaDuration: null,
  isPhotoGallery: false,
};

export default Content;
