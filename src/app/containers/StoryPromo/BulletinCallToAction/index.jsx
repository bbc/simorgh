import React from 'react';
import { string, oneOf, bool, shape } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import styled, { css } from 'styled-components';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getPica } from '@bbc/gel-foundations/typography';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { C_WHITE, C_POSTBOX, C_EBON } from '@bbc/psammead-styles/colours';

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  > svg {
    color: ${C_WHITE};
    fill: currentColor;
    width: 1.0625rem;
    height: ${GEL_SPACING_DBL};
    margin: 0;
  }
  ${({ dir }) =>
    dir === 'ltr'
      ? `padding-right: ${GEL_SPACING};`
      : `padding-left: ${GEL_SPACING};`}
`;

const radioPlayCta = css`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: inline-flex;
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
    margin-bottom: ${GEL_SPACING_DBL};
  }
`;

const tvPlayCta = css`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    display: inline-flex;
    padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  }
`;

const playCtaStyles = {
  audio: radioPlayCta,
  video: tvPlayCta,
};

const PlayCTA = styled.div.attrs({ 'aria-hidden': true })`
  background-color: ${({ isLive }) => (isLive ? C_POSTBOX : C_EBON)};
  border: 0.0625rem solid transparent;
  color: ${C_WHITE};
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ script }) => script && getPica(script)};
  ${({ service }) => service && getSansRegular(service)};
  ${({ mediaType }) => playCtaStyles[mediaType]}
  width: 100%;
`;

const BulletinCallToAction = ({
  isLive,
  service,
  script,
  dir,
  mediaType,
  ctaText,
}) => (
  <PlayCTA
    isLive={isLive}
    service={service}
    script={script}
    mediaType={mediaType}
    dir={dir}
  >
    <IconWrapper dir={dir}>{mediaIcons[mediaType]}</IconWrapper>
    {ctaText}
  </PlayCTA>
);

BulletinCallToAction.propTypes = {
  isLive: bool.isRequired,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  dir: oneOf(['rtl', 'ltr']).isRequired,
  mediaType: oneOf(['audio', 'video']).isRequired,
  ctaText: string.isRequired,
};

export default BulletinCallToAction;
