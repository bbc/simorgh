import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_LONG_PRIMER } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import Image from '#psammead/psammead-image/src';

const NOJS_BACKGROUND_COLOUR = 'rgba(34, 34, 34, 0.75)';

const StyledWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MessageWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${GEL_LONG_PRIMER};
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 0.0625rem solid transparent;
  color: ${props => props.theme.palette.WHITE};
  background-color: ${NOJS_BACKGROUND_COLOUR};
  @media screen and (-ms-high-contrast: active) {
    background-color: transparent;
  }
`;

const StyledMessage = styled.strong`
  display: block;
  font-weight: normal;
  bottom: 0;
  position: absolute;
  padding: ${GEL_SPACING};
  @media screen and (-ms-high-contrast: active) {
    background-color: window;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

const Message = ({
  service,
  message,
  placeholderSrc = '',
  placeholderSrcset = '',
}) => (
  <StyledWrapper>
    {placeholderSrc && (
      <Image
        alt=""
        src={placeholderSrc}
        srcset={placeholderSrcset}
        aria-hidden="true"
      />
    )}
    <MessageWrapper service={service}>
      <StyledMessage>{message}</StyledMessage>
    </MessageWrapper>
  </StyledWrapper>
);

export default Message;
