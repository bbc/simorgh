import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import VisuallyHiddenText from '#app/legacy/psammead-visually-hidden-text/src';
import moment from 'moment';
import formatDuration from '#app/lib/utilities/formatDuration';
import PromoContext from '../PromoContext';

const Content = ({ mediaDuration, headline, isPhotoGallery }) => {
  const {
    translations: { media: mediaTranslations },
  } = useContext(ServiceContext);

  const { ariaLabelledBy, mediaType } = useContext(PromoContext);

  if (!isPhotoGallery && !mediaType) {
    // This span is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    return <span id={ariaLabelledBy}>{headline}</span>;
  }

  const type = isPhotoGallery ? 'photogallery' : mediaType;

  const typeAnnounced = type === 'audio' ? 'listen' : mediaType;

  const announcedMediaType = mediaTranslations[typeAnnounced];

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
    <span role="text" id={ariaLabelledBy}>
      {announcedMediaType && (
        <VisuallyHiddenText>{`${announcedMediaType}, `}</VisuallyHiddenText>
      )}
      <span>{headline}</span>
      {offScreenDuration}
    </span>
  );
};

Content.propTypes = {
  mediaDuration: string,
  headline: string.isRequired,
  isPhotoGallery: bool,
};
Content.defaultProps = {
  mediaDuration: null,
  isPhotoGallery: false,
};

export default Content;
