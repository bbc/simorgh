import { forwardRef } from 'react';
import styled from '@emotion/styled';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import Image from '#app/components/Image';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX = '2.625rem';

const SvgWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX};
  margin: 0 auto;
  column-gap: ${GEL_SPACING_HLF};
`;

const Banner = styled.div`
  background-color: ${props => props.theme.palette.BRAND_BACKGROUND};
  min-height: ${44 / 16}rem;
  width: 100%;
  padding: 0 ${GEL_SPACING};
  display: flex;
  align-items: stretch;

  @media (min-width: ${GEL_GROUP_1_SCREEN_WIDTH_MIN}) {
    min-height: ${60 / 16}rem;
    padding: 0 ${GEL_SPACING};
  }

  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    min-height: ${60 / 16}rem;
    padding: 0 ${GEL_SPACING_DBL};
  }

  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
    min-height: ${64 / 16}rem;
  }
`;

const StyledLink = styled.a`
  align-self: stretch;
  display: flex;
  align-items: center;
  position: relative;
  min-height: ${SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX};

  &:hover::before,
  &:focus::before {
    content: '';
    position: absolute;
    inset: 0;
    border-bottom: ${GEL_SPACING_HLF} solid
      ${props => props.theme.palette.BRAND_LOGO};
  }

  /* Custom focus indicator styling applied to pseudo-element. Global focus indicator styling has been removed. */
  &:focus-visible::after {
    content: '';
    position: absolute;
    inset: 0px -${GEL_SPACING};
    outline: ${GEL_SPACING_HLF} solid ${props => props.theme.palette.BRAND_LOGO};
    outline-offset: -${GEL_SPACING_HLF};
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
  aspectRatio,
  serviceLocalisedName = null,
  svg,
}) => {
  return svg ? (
    <>
      <Image
        id={linkId !== 'footer' ? 'brandSvgHeader' : 'brandSvgFooter'}
        preload={linkId !== 'footer'}
        fetchPriority={linkId !== 'footer' ? 'high' : 'low'}
        lazyLoad={linkId === 'footer'}
        src={svg}
        alt={product}
        focusable="false"
        aria-hidden="true"
        height="30"
        width={aspectRatio ? aspectRatio[0] * (30 / aspectRatio[1]) : 0}
        style={{ marginLeft: '0.5px' }}
        imageSrcSet={false}
        isSvg
        placeholder={false}
        aspectRatio={aspectRatio}
      />
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
    scriptLink = null,
    skipLink = null,
    linkId = null,
    children,
    ...rest
  } = props;

  return (
    <Banner svgHeight={svgHeight} scriptLink={scriptLink} {...rest}>
      <SvgWrapper ref={ref} className="brand-svg-wrapper">
        {url ? (
          <StyledLink
            href={url}
            id={linkId}
            className="brand-link focusIndicatorRemove"
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
        {children}
        {scriptLink && <div className="script-link-wrapper">{scriptLink}</div>}
      </SvgWrapper>
    </Banner>
  );
});

export default Brand;
