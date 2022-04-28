import React from 'react';
import styled from '@emotion/styled';
import { node, bool, string, oneOf, shape } from 'prop-types';
import { C_WHITE, C_EBON } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getMinion } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { mediaIcons } from '@bbc/psammead-assets/svgs';

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
