import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { string, number, node, shape, bool } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/spacings';

const SVG_TOP_OFFSET_BELOW_400PX = '0.625rem'; // 10px
const SVG_BOTTOM_OFFSET_BELOW_400PX = '0.375rem'; // 6px
const SVG_BOTTOM_OFFSET_ABOVE_400PX = '0.75rem'; // 12px
const SVG_BOTTOM_OFFSET_ABOVE_600PX = '1.25rem'; // 20px
const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '78rem';
const SCRIPT_LINK_OFFSET_BELOW_240PX = 52;
const PADDING_AROUND_SVG_BELOW_400PX = 16;
const PADDING_AROUND_SVG_ABOVE_400PX = 28;

const conditionallyRenderHeight = (svgHeight, padding) =>
  svgHeight ? `min-height: ${(svgHeight + padding) / 16}rem;` : '';

const TRANSPARENT_BORDER = `0.0625rem solid transparent`;

const SvgWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX};
  margin: 0 auto;

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: block;
  }
`;

const Banner = styled.div`
  background-color: ${props => props.backgroundColour};
  ${({ svgHeight }) =>
    conditionallyRenderHeight(svgHeight, PADDING_AROUND_SVG_BELOW_400PX)}
  width: 100%;
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    ${({ svgHeight }) =>
      conditionallyRenderHeight(svgHeight, PADDING_AROUND_SVG_ABOVE_400PX)}
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    ${({ scriptLink, svgHeight }) =>
      scriptLink &&
      `min-height: ${
        (svgHeight +
          PADDING_AROUND_SVG_BELOW_400PX +
          SCRIPT_LINK_OFFSET_BELOW_240PX) /
        16
      }rem;`}
  }

  ${({ borderTop }) => borderTop && `border-top: ${TRANSPARENT_BORDER}`};
  ${({ borderBottom }) =>
    borderBottom && `border-bottom: ${TRANSPARENT_BORDER}`};
`;

const brandWidth = (minWidth, maxWidth) => `
  width: 100%;
  max-width: ${maxWidth / 16}rem;
  min-width: ${minWidth / 16}rem;
  flex: 1 1 ${minWidth / 16}rem;
  -ms-flex-preferred-size: ${maxWidth / 16}rem;
`;

const StyledLink = styled.a`
  display: inline-block;
  ${({ maxWidth, minWidth }) => brandWidth(minWidth, maxWidth)}

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: block;
  }
`;

// `currentColor` has been used to address high contrast mode in Firefox.
const BrandSvg = styled.svg`
  box-sizing: content-box;
  color: ${props => props.logoColour};
  fill: currentColor;
  padding-top: ${SVG_TOP_OFFSET_BELOW_400PX};
  padding-bottom: ${SVG_BOTTOM_OFFSET_BELOW_400PX};
  height: ${props => props.height / 16}rem;

  ${({ maxWidth, minWidth }) => brandWidth(minWidth, maxWidth)}

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    padding-top: ${GEL_SPACING_DBL};
    padding-bottom: ${SVG_BOTTOM_OFFSET_ABOVE_400PX};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    padding-top: ${SVG_BOTTOM_OFFSET_ABOVE_600PX};
    padding-bottom: ${GEL_SPACING_DBL};
  }

  @media screen and (-ms-high-contrast: active), print {
    fill: windowText;
  }

  /* stylelint-disable */
  ${StyledLink}:hover &,
    ${StyledLink}:focus & {
    text-decoration: none;
    border-bottom: ${GEL_SPACING_HLF} solid ${props => props.logoColour};
    margin-bottom: -${GEL_SPACING_HLF};
  }
  /* stylelint-enable */
`;

const LocalisedBrandName = ({ linkId, product, serviceLocalisedName }) => {
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

LocalisedBrandName.propTypes = {
  linkId: string.isRequired,
  product: string.isRequired,
  serviceLocalisedName: string,
};

LocalisedBrandName.defaultProps = {
  serviceLocalisedName: null,
};

const StyledBrand = ({
  linkId,
  product,
  serviceLocalisedName,
  svgHeight,
  svg,
  maxWidth,
  minWidth,
  backgroundColour,
  logoColour,
}) => (
  <>
    {svg && (
      <>
        <BrandSvg
          height={svgHeight}
          viewBox={`0 0 ${svg.viewbox.width} ${svg.viewbox.height}`}
          xmlns="http://www.w3.org/2000/svg"
          focusable="false"
          aria-hidden="true"
          ratio={svg.ratio}
          maxWidth={maxWidth}
          minWidth={minWidth}
          backgroundColour={backgroundColour}
          logoColour={logoColour}
        >
          {svg.group}
        </BrandSvg>
        <LocalisedBrandName
          linkId={linkId}
          product={product}
          serviceLocalisedName={serviceLocalisedName}
        />
      </>
    )}
  </>
);

const brandProps = {
  linkId: string.isRequired,
  product: string.isRequired,
  serviceLocalisedName: string,
  maxWidth: number.isRequired,
  minWidth: number.isRequired,
  svgHeight: number.isRequired,
  svg: shape({
    group: node.isRequired,
    ratio: number.isRequired,
    viewbox: shape({
      height: number.isRequired,
      width: number.isRequired,
    }).isRequired,
  }).isRequired,
  backgroundColour: string.isRequired,
  logoColour: string.isRequired,
};

StyledBrand.propTypes = brandProps;

StyledBrand.defaultProps = {
  serviceLocalisedName: null,
};

const Brand = forwardRef((props, ref) => {
  const {
    svgHeight,
    maxWidth,
    minWidth,
    url,
    borderTop,
    borderBottom,
    backgroundColour,
    logoColour,
    scriptLink,
    skipLink,
    linkId,
    ...rest
  } = props;

  return (
    <Banner
      svgHeight={svgHeight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      backgroundColour={backgroundColour}
      logoColour={logoColour}
      scriptLink={scriptLink}
      {...rest}
    >
      <SvgWrapper ref={ref}>
        {url ? (
          <StyledLink
            href={url}
            maxWidth={maxWidth}
            minWidth={minWidth}
            id={linkId}
            // This is a temporary fix for the a11y nested span's bug experienced in TalkBack, refer to the following issue: https://github.com/bbc/simorgh/issues/9652
            aria-labelledby={`BrandLink-${linkId}`}
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

Brand.defaultProps = {
  url: null,
  serviceLocalisedName: null,
  borderTop: false,
  borderBottom: false,
  scriptLink: null,
  skipLink: null,
  linkId: null,
};

Brand.propTypes = {
  ...brandProps,
  url: string,
  serviceLocalisedName: string,
  borderTop: bool,
  borderBottom: bool,
  scriptLink: node,
  skipLink: node,
  linkId: string,
};

export default Brand;
