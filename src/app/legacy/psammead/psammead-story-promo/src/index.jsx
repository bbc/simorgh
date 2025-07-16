import React from 'react';
import {
  getParagon,
  getLongPrimer,
  getPica,
  getDoublePica,
} from '#psammead/gel-foundations/src/typography';
import {
  getSansRegular,
  getSerifMedium,
} from '#psammead/psammead-styles/src/font-styles';
import { grid } from '#psammead/psammead-styles/src/detection';
import ImageGridItem from './ImageStyles';
import TextGridItem from './TextStyles';

const wrapperStyles = {
  top: 'group-5:grid-cols-12',
  regular: 'group-4:block',
  leading: '',
};

const StoryPromoWrapper = ({ promoType, children, ...props }) => {
  const wrapperClasses = `relative grid grid-cols-6 gap-double group-3:gap-double ${wrapperStyles[promoType] || ''}`;
  
  return (
    <div className={wrapperClasses} {...props}>
      {children}
    </div>
  );
};

const ImageContentsWrapper = ({ children }) => (
  <div className="relative">
    {children}
  </div>
);

const mediaIndicatorStyles = {
  top: 'absolute bottom-0 [&>*]:h-quad [&>*]:py-double [&>*]:px-half',
  regular: 'group-2:absolute group-2:bottom-0 [&>*]:max-group-1:h-5 [&>*]:max-group-1:py-half [&>*]:max-group-1:px-half [&>*]:max-group-1:pt-half [&>*]:h-quad [&>*]:py-double [&>*]:px-half',
  leading: 'absolute bottom-0 [&>*]:h-quad [&>*]:py-double [&>*]:px-half',
};

const ImageOverlayWrapper = ({ promoType, children, ...props }) => {
  const overlayClasses = mediaIndicatorStyles[promoType] || mediaIndicatorStyles.regular;
  
  return (
    <div className={overlayClasses} {...props}>
      {children}
    </div>
  );
};

const headlineTypography = script => ({
  top: script ? getParagon(script) : {},
  regular: script ? getPica(script) : {},
  leading: script ? getDoublePica(script) : {},
});

export const Headline = ({ script, service, promoType = 'regular', promoHasImage = true, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? headlineTypography(script)[promoType] : {};
  const serviceStyles = service ? getSerifMedium(service) : {};
  
  const displayClasses = !promoHasImage ? 'inline-block' : '';
  
  return (
    <h3
      className={`text-ebon m-0 pb-double ${displayClasses} ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </h3>
  );
};

Headline.defaultProps = {
  promoHasImage: true,
  promoType: 'regular',
};

const summaryStyles = {
  top: 'group-3:max-group-3:hidden group-3:max-group-3:invisible',
  regular: 'max-group-2:hidden max-group-2:invisible group-4:hidden group-4:invisible',
  leading: 'max-group-2:hidden max-group-2:invisible group-4:hidden group-4:invisible',
};

export const Summary = ({ script, service, promoType = 'regular', promoHasImage = true, children, className = '', ...props }) => {
  // Get dynamic styles for script and service
  const scriptStyles = script ? getLongPrimer(script) : {};
  const serviceStyles = service ? getSansRegular(service) : {};
  
  const hiddenClasses = summaryStyles[promoType] || summaryStyles.regular;
  const paddingClasses = !promoHasImage ? 'pt-double' : '';
  
  return (
    <p
      className={`text-shadow m-0 pb-double ${paddingClasses} ${hiddenClasses} ${className}`}
      style={{
        ...scriptStyles,
        ...serviceStyles
      }}
      {...props}
    >
      {children}
    </p>
  );
};

Summary.defaultProps = {
  promoHasImage: true,
  promoType: 'regular',
};

// `display: inline-block` has been used to resolve Focus Indicator bug in Firefox high contrast mode.
export const Link = ({ children, className = '', ...props }) => (
  <a
    className={`static text-ebon no-underline break-words inline-block before:content-[''] before:bottom-0 before:left-0 before:overflow-hidden before:absolute before:right-0 before:top-0 before:whitespace-nowrap before:z-10 hover:underline focus:underline visited:text-metal ${className}`}
    {...props}
  >
    {children}
  </a>
);

const StoryPromo = ({
  image,
  info,
  promoType = 'regular',
  dir = 'ltr',
  displayImage = true,
  mediaIndicator = null,
  mediaIndicatorIsInline = false,
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

export default StoryPromo;
