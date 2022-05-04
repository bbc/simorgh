import React from 'react';
import moment from 'moment-timezone';
import styled from '@emotion/styled';
import { shape, string, number, oneOf } from 'prop-types';
import { scriptPropType } from '#legacy/gel-foundations/src/prop-types';
import { GEL_SPACING_HLF } from '#legacy/gel-foundations/src/spacings';
import { C_WHITE, C_EBON } from '#legacy/psammead-styles/src/colours';
import { getMinion } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';
import formatDuration from '#lib/utilities/formatDuration';

export const TYPES = {
  VIDEO: 'video',
  AUDIO: 'audio',
  PHOTO_GALLERY: 'photogallery',
};

const Wrapper = styled.div`
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

const MediaIcon = ({ script, service, children, type }) => {
  if (!type) return null;
  return (
    <Wrapper script={script} service={service}>
      {mediaIcons[TYPES[type]]}
      {formatChildren(children)}
    </Wrapper>
  );
};

MediaIcon.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  type: oneOf(Object.keys(TYPES)),
  children: number,
};

MediaIcon.defaultProps = {
  children: null,
  type: null,
};

export default MediaIcon;
