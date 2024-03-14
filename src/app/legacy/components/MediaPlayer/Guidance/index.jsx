/** @jsx jsx */
import { jsx } from '@emotion/react';
import { string } from 'prop-types';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_LONG_PRIMER } from '#psammead/gel-foundations/src/typography';
import { getSansRegular } from '#psammead/psammead-styles/src/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';

const GUIDANCE_BACKGROUND = 'rgba(34, 34, 34, 0.75)';

const GuidanceWrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${GEL_LONG_PRIMER}
  width: 100%;
  height: 100%;
  position: absolute;
  border: 0.0625rem solid transparent;
  color: ${props => props.theme.palette.WHITE};
  ${({ guidanceMessage }) =>
    guidanceMessage
      ? `
    background-color: ${GUIDANCE_BACKGROUND};
    @media screen and (-ms-high-contrast: active) {
      background-color: transparent;
    }`
      : ``}

  ${({ noJsClassName }) =>
    noJsClassName &&
    `
      .${noJsClassName} & {
        background-color: ${GUIDANCE_BACKGROUND};
        @media screen and (-ms-high-contrast: active) {
          background-color: transparent;
        }
        .guidance-message {
          display: none;
        }
      }
    `}
`;

const GuidanceMessage = styled.strong`
  display: block;
  font-weight: normal;
  padding: ${GEL_SPACING};
  border-bottom: 0.0625rem solid transparent;
  @media screen and (-ms-high-contrast: active) {
    background-color: window;
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING_DBL};
  }
`;

const StyledNoScript = styled.noscript`
  position: absolute;
  bottom: 0;
  ${({ noJsClassName }) =>
    !noJsClassName &&
    `
      display: none;
    `}
`;

const Guidance = ({
  guidanceMessage,
  service,
  noJsMessage,
  noJsClassName,
  className,
}) => (
  <GuidanceWrapper
    service={service}
    guidanceMessage={guidanceMessage}
    noJsClassName={noJsClassName}
    data-e2e="media-player__guidance"
    className={className}
  >
    {guidanceMessage && (
      <GuidanceMessage className="guidance-message" aria-hidden="true">
        {guidanceMessage}
      </GuidanceMessage>
    )}
    <StyledNoScript noJsClassName={noJsClassName}>
      <GuidanceMessage>{noJsMessage}</GuidanceMessage>
    </StyledNoScript>
  </GuidanceWrapper>
);

Guidance.propTypes = {
  guidanceMessage: string,
  service: string.isRequired,
  noJsMessage: string.isRequired,
  noJsClassName: string,
  className: string,
};

Guidance.defaultProps = {
  guidanceMessage: null,
  noJsClassName: null,
  className: null,
};

export default Guidance;
