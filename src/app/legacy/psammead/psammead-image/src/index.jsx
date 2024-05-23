import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';
import { RequestContext } from '../../../../contexts/RequestContext';
import { FRONT_PAGE, HOME_PAGE } from '../../../../routes/utils/pageTypes';

export { default as AmpImg } from './index.amp';

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const fadeIn = css`
  animation: ${fadeInKeyframes} 0.2s linear;
  transition: visibility 0.2s linear;
`;

const StyledPicture = styled.picture`
  display: block;
  width: 100%;
  visibility: visible;
  ${props => props.fade && fadeIn};
`;

const StyledImg = styled.img`
  display: block;
  width: 100%;
`;

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

  const { pageType } = useContext(RequestContext);
  return (
    <>
      {[FRONT_PAGE, HOME_PAGE].includes(pageType) && (
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

      {![FRONT_PAGE, HOME_PAGE].includes(pageType) && (
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
