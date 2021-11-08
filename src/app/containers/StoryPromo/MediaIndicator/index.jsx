import React from 'react';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { shape, string, oneOf, oneOfType, bool } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import MediaIndicator from '@bbc/psammead-media-indicator';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import formatDuration from '#lib/utilities/formatDuration';
import { isPgl, isMap } from '../utilities';

const getAssetContentTypes = item => {
  const type = item?.contentType || '';
  const mediaContentTypesMapping = {
    Audio: 'audio',
    Gallery: 'photogallery',
    Video: 'video',
  };

  if (type in mediaContentTypesMapping) {
    return mediaContentTypesMapping[type];
  }

  return null;
};

const getCpsMediaTypes = item => {
  const isPhotoGallery = isPgl(item);
  const isMedia = isMap(item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPhotoGallery && !isMedia) {
    return null;
  }
  const type = isPhotoGallery ? 'photogallery' : item?.media?.format;
  return type || null;
};

const getMediaType = item => {
  const isAssetTypeMedia = item?.assetTypeCode;
  return isAssetTypeMedia ? getAssetContentTypes(item) : getCpsMediaTypes(item);
};

const StyledTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

const MediaIndicatorContainer = ({ item, script, service, dir, isInline }) => {
  const type = getMediaType(item);

  if (!type) {
    return null;
  }

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = item?.media?.versions?.[0]?.duration;

  if (rawDuration && !isInline) {
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration({ duration });
    const isoDuration = duration.toISOString();
    return (
      <MediaIndicator type={type} script={script} service={service} dir={dir}>
        <StyledTime dateTime={isoDuration}>{durationString}</StyledTime>
      </MediaIndicator>
    );
  }

  return (
    <MediaIndicator
      type={type}
      script={script}
      service={service}
      dir={dir}
      isInline={isInline}
    />
  );
};

MediaIndicatorContainer.propTypes = {
  item: oneOfType([shape(storyItem), shape(linkPromo)]).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  isInline: bool,
};

MediaIndicatorContainer.defaultProps = {
  dir: 'ltr',
  isInline: false,
};
export default MediaIndicatorContainer;
