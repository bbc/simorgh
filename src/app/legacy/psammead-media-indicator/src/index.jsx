import React from 'react';
import styled from '@emotion/styled';
import { node, bool, string, oneOf, shape } from 'prop-types';
import { C_WHITE, C_EBON } from '#legacy/psammead-styles/src/colours';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import { getMinion } from '#legacy/gel-foundations/src/typography';
import { getSansRegular } from '#legacy/psammead-styles/src/font-styles';
import { scriptPropType } from '#legacy/gel-foundations/src/prop-types';
import { mediaIcons } from '#legacy/psammead-assets/src/svgs';

const StyledMediaIndicator = styled.div`
  color: ${C_EBON};
  background-color: ${C_WHITE};
  ${({ service }) => getSansRegular(service)}
  ${({ script }) => script && getMinion(script)};

  ${({ isInline, dir }) =>
    isInline
      ? `
          display: inline-block;
          vertical-align: middle;
          padding-${dir === 'rtl' ? 'left' : 'right'}: ${GEL_SPACING};
        `
      : `
          display: block;
        `}
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const MediaIndicator = ({ type, script, service, dir, isInline, children }) => (
  <StyledMediaIndicator
    data-e2e="media-indicator"
    aria-hidden="true"
    script={script}
    service={service}
    dir={dir}
    isInline={isInline}
  >
    <FlexWrapper>
      {mediaIcons[type]}
      {children}
    </FlexWrapper>
  </StyledMediaIndicator>
);

MediaIndicator.propTypes = {
  type: oneOf(['video', 'audio', 'photogallery']),
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  isInline: bool,
  children: node,
};

MediaIndicator.defaultProps = {
  type: 'video',
  dir: 'ltr',
  isInline: false,
  children: null,
};

export default MediaIndicator;
