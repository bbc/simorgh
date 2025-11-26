import React, { use } from 'react';
import omit from 'ramda/src/omit';
import styled from '@emotion/styled';
import { mediaIcons } from '#psammead/psammead-assets/src/svgs';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import pixelsToRem from '#app/utilities/pixelsToRem';

import ImagePlaceholder from '#psammead/psammead-image-placeholder/src';
import { RequestContext } from '../../../contexts/RequestContext';

import { withEpisodeContext } from './helpers';

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 4.375rem;
  ${({ dir }) => `margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING};`}
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    width: 7.5rem;
  }
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    ${({ dir }) =>
      `margin-${dir === 'ltr' ? 'right' : 'left'}: ${GEL_SPACING_DBL};`}
    width: 14.375rem;
  }
`;

const LitePlayWrapper = withEpisodeContext(styled.div`
  padding: ${GEL_SPACING_HLF};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING};
  }
  svg {
    margin: 0 0 ${pixelsToRem(1)}px 0;
    height: 0.6rem;
    width: 0.7rem;
    color: ${props => props.theme.palette.WHITE};
    @media screen and (forced-colors: active) {
      fill: linkText;
    }
  }
`);

const PlayWrapper = withEpisodeContext(styled.div`
  background-color: ${props => props.theme.palette.EBON};
  padding: ${GEL_SPACING_HLF};
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding: ${GEL_SPACING};
  }

  svg {
    margin: 0 0 1px 0;
    height: 0.6rem;
    width: 0.7rem;
    color: ${props => props.theme.palette.WHITE};
    @media screen and (forced-colors: active) {
      fill: linkText;
    }
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    position: absolute;
    bottom: 0;
  }
`);

const DurationWrapper = withEpisodeContext(styled.span`
  ${({ theme: { fontSizes } }) => fontSizes.minion};
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  color: ${props => props.theme.palette.WHITE};
  ${({ dir }) =>
    dir === 'rtl'
      ? `padding: 0 ${GEL_SPACING_HLF} 0 0;`
      : `padding: 0 0 0 ${GEL_SPACING_HLF};`}
`);

const StyledImage = styled.img`
  width: 100%;
`;

const EpisodeImage = props => {
  const { duration = '', alt = '', dir } = props;

  const { isLite } = use(RequestContext);

  // This component only uses a subset of its props
  // the remaining props are passed down to the underlying <img> element
  const selectImgProps = omit([
    'alt',
    'duration',
    'classname',
    'script',
    'service',
  ]);

  return isLite ? (
    <div>
      <LitePlayWrapper aria-hidden="true">
        {mediaIcons.video}
        {duration && <DurationWrapper>{duration}</DurationWrapper>}
      </LitePlayWrapper>
    </div>
  ) : (
    <Wrapper dir={dir}>
      <ImagePlaceholder ratio={56.25}>
        <StyledImage alt={alt} {...selectImgProps(props)} />
      </ImagePlaceholder>
      <PlayWrapper aria-hidden="true">
        {mediaIcons.video}
        {duration && <DurationWrapper>{duration}</DurationWrapper>}
      </PlayWrapper>
    </Wrapper>
  );
};

export default withEpisodeContext(EpisodeImage);
