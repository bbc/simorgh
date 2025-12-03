import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import { focusIndicatorThickness } from '../../../../components/ThemeProvider/focusIndicator';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX = '2.625rem';

const TRANSPARENT_BORDER = `0.0625rem solid transparent`;

const SvgWrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX};
  margin: 0 auto;

  @media (max-width: ${({ isLongBrand }) =>
      isLongBrand
        ? GEL_GROUP_1_SCREEN_WIDTH_MAX
        : GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: block;
  }
`;

const Banner = styled.div`
  background-color: ${props => props.theme.palette.BRAND_BACKGROUND};
  height: ${44 / 16}rem;
  width: 100%;
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    height: ${60 / 16}rem;
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    height: ${60 / 16}rem;
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    height: ${64 / 16}rem;
  }

  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    ${({ scriptLink }) => scriptLink && 'height: 100%'}
  }

  ${({ borderTop }) => borderTop && `border-top: ${TRANSPARENT_BORDER}`};
  ${({ borderBottom }) =>
    borderBottom && `border-bottom: ${TRANSPARENT_BORDER}`};
`;

const styledLinkOutline = `
  content: '';
  position: absolute;
  top: 0;
  left: -${focusIndicatorThickness};
  bottom: 0;
  right: -${focusIndicatorThickness};
  `;

const StyledLink = styled.a`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0.125rem;
  padding-top: 0.125rem;
  &:hover,
  &:focus {
    text-decoration: none;
    border-bottom: ${GEL_SPACING_HLF} solid
      ${props => props.theme.palette.BRAND_LOGO};
    margin-bottom: -${GEL_SPACING_HLF};
  }

  /* Custom focus indicator styling applied to pseudo-element. Global focus indicator styling has been removed. */
  &:focus-visible::after {
    ${styledLinkOutline}
    border-top: ${GEL_SPACING_HLF} solid ${props =>
      props.theme.palette.BRAND_LOGO};
    outline: ${GEL_SPACING_HLF} solid ${props => props.theme.palette.BRAND_LOGO};
  }
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    ${({ scriptLink }) =>
      scriptLink && `height: ${SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX}`}
  }
`;

// `currentColor` has been used to address high contrast mode in Firefox.
const BrandSvg = styled.svg`
  box-sizing: content-box;
  color: ${props => props.theme.palette.BRAND_LOGO};
  fill: currentColor;
  height: ${20 / 16}rem;

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    height: ${24 / 16}rem;
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    height: ${30 / 16}rem;
  }

  @media screen and (-ms-high-contrast: active), print {
    fill: windowText;
  }
`;

const LocalisedBrandName = ({
  linkId = null,
  product,
  serviceLocalisedName = null,
}) => {
  const brandId = `BrandLink-${linkId}`;
  return serviceLocalisedName ? (
    // id={`BrandLink-${linkId}` is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
    // eslint-disable-next-line jsx-a11y/aria-role
    <VisuallyHiddenText role="text" id={brandId}>
      <span lang="en-GB">{`${product}, `}</span>
      <span>{serviceLocalisedName}</span>
    </VisuallyHiddenText>
  ) : (
    <VisuallyHiddenText id={brandId}>{product}</VisuallyHiddenText>
  );
};

const StyledBrand = ({
  linkId,
  product,
  serviceLocalisedName = null,
  svg,
  isLongBrand,
}) => {
  return svg ? (
    <>
      <BrandSvg
        id={linkId !== 'footer' ? 'brandSvgHeader' : 'brandSvgFooter'}
        viewBox={[
          svg.viewbox.minX || 0,
          svg.viewbox.minY || 0,
          svg.viewbox.width,
          svg.viewbox.height,
        ].join(' ')}
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        height="32"
        isLongBrand={isLongBrand}
      >
        {svg.group}
      </BrandSvg>
      <LocalisedBrandName
        linkId={linkId}
        product={product}
        serviceLocalisedName={serviceLocalisedName}
      />
    </>
  ) : null;
};

const Brand = forwardRef((props, ref) => {
  const {
    svgHeight,
    maxWidth,
    minWidth,
    url = null,
    borderTop = false,
    borderBottom = false,
    scriptLink = null,
    isLongBrand = false,
    skipLink = null,
    linkId = null,
    ...rest
  } = props;

  return (
    <Banner
      svgHeight={svgHeight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      scriptLink={scriptLink}
      {...rest}
    >
      <SvgWrapper ref={ref} isLongBrand={isLongBrand}>
        {url ? (
          <StyledLink
            href={url}
            id={linkId}
            className="focusIndicatorRemove"
            // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
            aria-labelledby={`BrandLink-${linkId}`}
            scriptLink={scriptLink}
          >
            <StyledBrand {...props} />
          </StyledLink>
        ) : (
          <StyledBrand {...props} />
        )}
        {skipLink}
        {scriptLink && <div>{scriptLink}</div>}
      </SvgWrapper>
    </Banner>
  );
});

export default Brand;
