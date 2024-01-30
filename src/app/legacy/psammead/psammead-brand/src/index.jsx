import React, { forwardRef } from 'react';
import styled from '@emotion/styled';
import { string, number, node, shape, bool } from 'prop-types';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MAX,
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
const SCRIPT_LINK_OFFSET_BELOW_240PX = 52;
const PADDING_AROUND_SVG_BELOW_400PX = 16;

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

  @media (max-width: ${GEL_GROUP_0_SCREEN_WIDTH_MAX}) {
    display: block;
  }
`;

const Banner = styled.div`
  background-color: ${props => props.theme.palette.BRAND_BACKGROUND};
  height: ${44 / 16}rem;
  width: 100%;
  padding: 0 ${GEL_SPACING};

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    height: ${56 / 16}rem;
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    height: ${64 / 16}rem;
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

const StyledBrand = ({ linkId, product, serviceLocalisedName, svg }) => (
  <>
    {svg && (
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
  svg: shape({
    group: node.isRequired,
    ratio: number.isRequired,
    viewbox: shape({
      height: number.isRequired,
      width: number.isRequired,
    }).isRequired,
  }).isRequired,
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
      scriptLink={scriptLink}
      {...rest}
    >
      <SvgWrapper ref={ref}>
        {url ? (
          <StyledLink
            href={url}
            id={linkId}
            className="focusIndicatorRemove"
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
