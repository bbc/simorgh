import React, { forwardRef } from 'react';
import VisuallyHiddenText from '../../../../components/VisuallyHiddenText';

const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';
const SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX = '2.625rem';

const SvgWrapper = forwardRef(({ isLongBrand, children, ...props }, ref) => {
  const displayClasses = isLongBrand
    ? 'group-1:block max-group-1:block'
    : 'group-0:block max-group-0:block';
  
  return (
    <div
      ref={ref}
      className={`h-full relative flex justify-between items-center flex-wrap mx-auto ${displayClasses}`}
      style={{ maxWidth: SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX }}
      {...props}
    >
      {children}
    </div>
  );
});

const Banner = ({ borderTop, borderBottom, scriptLink, children, ...props }) => {
  const borderTopClass = borderTop ? 'border-t border-transparent' : '';
  const borderBottomClass = borderBottom ? 'border-b border-transparent' : '';
  const scriptLinkHeight = scriptLink ? 'max-group-1:h-auto' : '';
  
  return (
    <div
      className={`bg-brand-background h-11 group-1:h-15 group-2:h-15 group-3:h-16 w-full px-double group-2:px-double ${borderTopClass} ${borderBottomClass} ${scriptLinkHeight}`}
      {...props}
    >
      {children}
    </div>
  );
};

const StyledLink = ({ scriptLink, children, className = '', ...props }) => {
  const scriptLinkHeight = scriptLink ? `max-group-1:h-[${SIZE_OF_BRAND_LINK_WITH_VARIANT_BELOW_239PX}]` : '';
  
  return (
    <a
      className={`h-full flex items-center relative -bottom-0.5 pt-0.5 hover:no-underline hover:border-b-2 hover:border-brand-logo hover:-mb-0.5 focus:no-underline focus:border-b-2 focus:border-brand-logo focus:-mb-0.5 focusIndicatorRemove focus-visible:after:content-[''] focus-visible:after:absolute focus-visible:after:top-0 focus-visible:after:-left-1 focus-visible:after:bottom-0 focus-visible:after:-right-1 focus-visible:after:border-t-2 focus-visible:after:border-brand-logo focus-visible:after:outline-2 focus-visible:after:outline-brand-logo ${scriptLinkHeight} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
};

// `currentColor` has been used to address high contrast mode in Firefox.
const BrandSvg = ({ isLongBrand, children, ...props }) => {
  return (
    <svg
      className="box-content text-brand-logo fill-current h-5 group-2:h-6 group-3:h-7.5 screen-ms-high-contrast:fill-windowtext print:fill-windowtext"
      {...props}
    >
      {children}
    </svg>
  );
};

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
