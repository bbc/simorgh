import React from 'react';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import MediaIndicator from '#psammead/psammead-media-indicator/src';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import formatDuration from '#lib/utilities/formatDuration';
import { isPgl, isMap } from '../utilities';

const getAssetContentTypes = item => {
  const type = pathOr('', ['contentType'], item);
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
  const type = isPhotoGallery
    ? 'photogallery'
    : path(['media', 'format'], item);
  return type || null;
};

const getMediaType = item => {
  const isAssetTypeMedia = path(['assetTypeCode'], item);
  return isAssetTypeMedia ? getAssetContentTypes(item) : getCpsMediaTypes(item);
};

const StyledTime = styled.time`
  padding: 0 ${GEL_SPACING_HLF};
`;

const MediaIndicatorContainer = ({
  item,
  script,
  service,
  dir = 'ltr',
  isInline = false,
}) => {
  const type = getMediaType(item);

  if (!type) {
    return null;
  }

  // Always gets the first version. Smarter logic may be needed in the future.
  const rawDuration = path(['media', 'versions', 0, 'duration'], item);

  if (rawDuration && !isInline) {
    const duration = moment.duration(rawDuration, 'seconds');
    const durationString = formatDuration({ duration });
    const isoDuration = duration.toISOString();
    return (
      <MediaIndicator type={type} script={script} service={service} dir={dir}>
        <StyledTime dateTime={isoDuration} suppressHydrationWarning>
          {durationString}
        </StyledTime>
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

export default MediaIndicatorContainer;
