import React from 'react';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { GEL_SPACING_HLF } from '#psammead/gel-foundations/src/spacings';
import { getMinion } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import formatDuration from '#lib/utilities/formatDuration';

export const TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photogallery',
};

const Wrapper = styled.div`
  padding: ${GEL_SPACING_HLF};
  color: ${props => props.theme.palette.EBON};
  background-color: ${props => props.theme.palette.WHITE};
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
  return (
    <StyledTime dateTime={isoDuration} suppressHydrationWarning>
      {durationString}
    </StyledTime>
  );
};

const MediaIcon = ({ script, service, children = null, type = null }) => {
  if (!type || !mediaIcons[type]) return null;
  return (
    <Wrapper script={script} service={service} aria-hidden="true">
      {mediaIcons[type]}
      {formatChildren(children)}
    </Wrapper>
  );
};

export default MediaIcon;
