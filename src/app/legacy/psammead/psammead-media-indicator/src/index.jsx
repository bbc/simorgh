import React from 'react';
import styled from '@emotion/styled';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import { getMinion } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';

const StyledMediaIndicator = styled.div`
  color: ${props => props.theme.palette.EBON};
  background-color: ${props => props.theme.palette.WHITE};
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

const MediaIndicator = ({
  type = 'video',
  script,
  service,
  dir = 'ltr',
  isInline = false,
  children = null,
}) => (
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

export default MediaIndicator;
