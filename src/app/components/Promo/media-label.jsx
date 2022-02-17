import React from 'react';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { shape, string, number, oneOf } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { C_WHITE, C_EBON } from '@bbc/psammead-styles/colours';
import { getMinion } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import formatDuration from '#lib/utilities/formatDuration';

export const TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photogallery',
};

const StyledMediaIndicator = styled.div`
  padding: ${GEL_SPACING_HLF};
  color: ${C_EBON};
  background-color: ${C_WHITE};
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => script && getMinion(script)};
`;

const StyledTime = styled.time`
  padding: ${GEL_SPACING_HLF};
  position: relative;
  top: 0.09rem;
`;

const formatChildren = children => {
  if (!children) return null;
  const duration = moment.duration(children, 'seconds');
  const durationString = formatDuration({ duration });
  const isoDuration = duration.toISOString();
  return <StyledTime dateTime={isoDuration}>{durationString}</StyledTime>;
};

const MediaLabel = ({ script, service, children, type }) => {
  if (!type) return null;
  return (
    <StyledMediaIndicator script={script} service={service}>
      {mediaIcons[TYPES[type]]}
      {formatChildren(children)}
    </StyledMediaIndicator>
  );
};

MediaLabel.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  type: oneOf(Object.keys(TYPES)),
  children: number,
};

MediaLabel.defaultProps = {
  children: null,
  type: null,
};

export default MediaLabel;
