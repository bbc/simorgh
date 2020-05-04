import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { shape, string, oneOf, oneOfType, bool } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import MediaIndicator from '@bbc/psammead-media-indicator';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import { storyItem, linkPromo } from '#models/propTypes/storyItem';
import formatDuration from '#lib/utilities/formatDuration';
import loggerNode from '#lib/logger.node';
import { MEDIA_MISSING_FIELD } from '#lib/logger.const';

const logger = loggerNode(__filename);

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
  const isPGL = path(['cpsType'], item) === 'PGL';
  const isCpsMedia = path(['cpsType'], item) === 'MAP';
  const hasMediaInfo = path(['media'], item);

  // Only build a media indicator if this is a photo gallery or media item
  if (!isPGL && (!isCpsMedia || !hasMediaInfo)) {
    return null;
  }
  const type = isPGL ? 'photogallery' : path(['media', 'format'], item);
  return type || null;
};

const getMediaType = item => {
  const isAssetTypeMedia = path(['assetTypeCode'], item);
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
  const rawDuration = path(['media', 'versions', 0, 'duration'], item);

  if (!rawDuration) {
    logger.warn(MEDIA_MISSING_FIELD, {
      url: '/pashto',
      missingField: 'duration',
      item,
    });
  }

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
