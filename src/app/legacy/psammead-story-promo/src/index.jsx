import React from 'react';
import styled from '@emotion/styled';
import { node, bool, string, oneOf, shape } from 'prop-types';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_QUAD,
} from '@bbc/gel-foundations/spacings';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  getParagon,
  getLongPrimer,
  getPica,
  getDoublePica,
} from '@bbc/gel-foundations/typography';
import { C_EBON, C_METAL, C_SHADOW } from '@bbc/psammead-styles/colours';
import {
  getSansRegular,
  getSerifMedium,
} from '@bbc/psammead-styles/font-styles';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { grid } from '@bbc/psammead-styles/detection';
import ImageGridItem from './ImageStyles';
import TextGridItem from './TextStyles';

const PROMO_TYPES = oneOf(['top', 'regular', 'leading']);

const wrapperTopStoryStyles = `
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

const wrapperRegularStyles = `
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: block;
  }
`;

const wrapperStyles = {
  top: wrapperTopStoryStyles,
  regular: wrapperRegularStyles,
  leading: '',
};

const StoryPromoWrapper = styled.div`
  position: relative; /* This is needed to contain the faux-block-link to the Story Promo */
  @supports (${grid}) {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: ${GEL_SPACING};

    @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      grid-column-gap: ${GEL_SPACING_DBL};
    }

    ${({ promoType }) => wrapperStyles[promoType]}
  }
`;

const ImageContentsWrapper = styled.div`
  position: relative;
`;

const mediaIndicatorStylesTopLeading = `
  position: absolute;
  bottom: 0;
  > * {
    height: ${GEL_SPACING_QUAD};
    padding: ${GEL_SPACING} ${GEL_SPACING_HLF};
  }
`;

const mediaIndicatorStylesRegular = `
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    position: absolute;
    bottom: 0;
  }
  > * {
    @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
      height: 1.25rem;
      padding: ${GEL_SPACING_HLF} ${GEL_SPACING_HLF} 0;
    }

    height: ${GEL_SPACING_QUAD};
    padding: ${GEL_SPACING} ${GEL_SPACING_HLF};
  }
`;

/*
 These styles are to ensure we have the correct positioning
 & spacing of the Media Indicator over the Image in the Story Promo 
 */
const mediaIndicatorStyles = {
  top: mediaIndicatorStylesTopLeading,
  regular: mediaIndicatorStylesRegular,
  leading: mediaIndicatorStylesTopLeading,
};

const ImageOverlayWrapper = styled.div`
  ${({ promoType }) => mediaIndicatorStyles[promoType]}
`;

const headlineTopStoryTypography = script => getParagon(script);

const headlineRegularTypography = script => getPica(script);

const headlineLeadingStoryTypography = script => getDoublePica(script);

const headlineTypography = script => ({
  top: headlineTopStoryTypography(script),
  regular: headlineRegularTypography(script),
  leading: headlineLeadingStoryTypography(script),
});

export const Headline = styled.h3`
  color: ${C_EBON};
  margin: 0; /* Reset */
  padding-bottom: ${GEL_SPACING};
  ${({ service }) => getSerifMedium(service)}
  ${({ script, promoType }) => script && headlineTypography(script)[promoType]}
  ${({ promoHasImage }) =>
    !promoHasImage &&
    `display: inline;`} /* Needed for aligning Media Indicator with Headline */
`;

Headline.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  promoHasImage: bool,
  promoType: PROMO_TYPES,
};

Headline.defaultProps = {
  promoHasImage: true,
  promoType: 'regular',
};

const summaryTopStoryStyles = `
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    display: none;
    visibility: hidden;
  }
`;

const summaryRegularStyles = `
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    display: none;
    visibility: hidden;
  }

  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    display: none;
    visibility: hidden;
  }
`;

const summaryStyles = {
  top: summaryTopStoryStyles,
  regular: summaryRegularStyles,
  leading: summaryRegularStyles,
};

export const Summary = styled.p`
  ${({ script }) => script && getLongPrimer(script)};
  ${({ service }) => getSansRegular(service)}
  color: ${C_SHADOW};
  margin: 0; /* Reset */
  padding-bottom: ${GEL_SPACING};

  ${({ promoHasImage }) => !promoHasImage && `padding-top: ${GEL_SPACING};`}

  ${({ promoType }) => summaryStyles[promoType]}
`;

Summary.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  promoHasImage: bool,
  promoType: PROMO_TYPES,
};

Summary.defaultProps = {
  promoHasImage: true,
  promoType: 'regular',
};

export const Link = styled.a`
  position: static;
  color: ${C_EBON};
  text-decoration: none;
  overflow-wrap: break-word;

  &:before {
    bottom: 0;
    content: '';
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
    white-space: nowrap;
    z-index: 1;
  }

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &:visited {
    color: ${C_METAL};
  }
`;

const StoryPromo = ({
  image,
  info,
  promoType,
  dir,
  displayImage,
  mediaIndicator,
  mediaIndicatorIsInline,
  ...props
}) => {
  const renderImage = displayImage && (
    <ImageGridItem dir={dir} promoType={promoType}>
      <ImageContentsWrapper>
        {image}
        {mediaIndicator && (
          <ImageOverlayWrapper
            mediaIndicatorIsInline={mediaIndicatorIsInline}
            promoType={promoType}
          >
            {mediaIndicator}
          </ImageOverlayWrapper>
        )}
      </ImageContentsWrapper>
    </ImageGridItem>
  );

  const renderText = (
    <TextGridItem promoType={promoType} dir={dir} displayImage={displayImage}>
      {!displayImage && mediaIndicator}
      {info}
    </TextGridItem>
  );

  return (
    <StoryPromoWrapper promoType={promoType} {...props}>
      {promoType === 'leading' ? (
        <>
          {renderText}
          {renderImage}
        </>
      ) : (
        <>
          {renderImage}
          {renderText}
        </>
      )}
    </StoryPromoWrapper>
  );
};

StoryPromo.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
  image: node.isRequired,
  info: node.isRequired,
  promoType: PROMO_TYPES,
  displayImage: bool,
  mediaIndicator: node,
  mediaIndicatorIsInline: bool,
};

StoryPromo.defaultProps = {
  dir: 'ltr',
  promoType: 'regular',
  displayImage: true,
  mediaIndicator: null,
  mediaIndicatorIsInline: false,
};

export default StoryPromo;
