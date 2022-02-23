import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { string, node } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Wrapper = styled.div`
  margin-bottom: ${GEL_SPACING};
  position: relative;
`;

const ChildWrapper = styled.div`
  position: absolute;
  bottom: 0;
`;

const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

const createSrcSet = (imageUrl, suffix = '') => {
  const imageResolutions = [70, 95, 144, 183, 240, 320];
  return imageResolutions
    .map(res => `${imageUrl.replace(`{width}`, res)}${suffix} ${res}w`)
    .join(', ');
};

const Image = props => {
  const { children, src, ...rest } = props;
  const sizes = '(max-width: 1008px) 33vw, 321px';
  const isWebPSupported = WEBP_ORIGIN_CODES.some(originCode =>
    src.includes(originCode),
  );
  return (
    <Wrapper>
      <ImagePlaceholder ratio={56.25}>
        <picture>
          {isWebPSupported && (
            <source
              srcSet={createSrcSet(src, '.webp')}
              type="image/webp"
              sizes={sizes}
            />
          )}
          <source srcSet={createSrcSet(src)} type="image/jpeg" sizes={sizes} />
          <Img {...rest} src={src.replace('{width}', 300)} />
        </picture>
      </ImagePlaceholder>
      {children && <ChildWrapper>{children}</ChildWrapper>}
    </Wrapper>
  );
};

Image.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  children: node,
};

Image.defaultProps = {
  children: null,
};

export default Image;
