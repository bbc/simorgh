import React, { use } from 'react';
import { RequestContext } from '../../../../contexts/RequestContext';
import { HOME_PAGE } from '../../../../routes/utils/pageTypes';

export { default as AmpImg } from './index.amp';

const StyledPicture = ({ fade, onLoad, children, ...props }) => {
  const fadeClasses = fade ? 'animate-fade-in transition-opacity duration-200' : '';
  return (
    <picture
      className={`block w-full visible ${fadeClasses}`}
      onLoad={onLoad}
      {...props}
    >
      {children}
    </picture>
  );
};

const StyledImg = ({ className = '', ...props }) => {
  return (
    <img
      className={`block w-full ${className}`}
      {...props}
    />
  );
};

export const Img = props => {
  const {
    src,
    srcset = null,
    sizes = null,
    fallbackSrcset = null,
    primaryMimeType = 'image/jpeg',
    fallbackMimeType = 'image/jpeg',
    onLoad = () => {},
    ...otherProps
  } = props;

  const { pageType } = use(RequestContext);
  return (
    <>
      {pageType === HOME_PAGE && (
        <StyledPicture onLoad={onLoad}>
          {srcset && (
            <source srcSet={srcset} type={primaryMimeType} sizes={sizes} />
          )}
          {fallbackSrcset && (
            <source
              srcSet={fallbackSrcset}
              type={fallbackMimeType}
              sizes={sizes}
            />
          )}
          <StyledImg src={src} {...otherProps} />
        </StyledPicture>
      )}

      {pageType !== HOME_PAGE && (
        <StyledImg
          sizes={sizes}
          srcSet={fallbackSrcset}
          src={src}
          {...otherProps}
        />
      )}
    </>
  );
};

export default Img;
