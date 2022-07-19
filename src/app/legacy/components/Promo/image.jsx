import React from 'react';
import styled from '@emotion/styled';
import ImagePlaceholder from '#legacy/psammead-image-placeholder/src';
import { string, node } from 'prop-types';
import { GEL_SPACING } from '#legacy/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/src/breakpoints';

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
  const imageResolutions = [85, 120, 170, 232, 325, 450];

  return imageResolutions
    .map(res => `${imageUrl.replace(`{width}`, res)}${suffix} ${res}w`)
    .join(', ');
};

const createSizes = () => {
  // 4 columns of fixed width
  const DESKTOP_SIZE = `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 232px`;

  // 2 columns of 50% screen width - images are 100% of the column
  const TABLET_SIZE = `(min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) 50vw`;

  // 1 column of 100% screen width - images are 33% of the column
  const MOBILE_SIZE = `33vw`;
  return [DESKTOP_SIZE, TABLET_SIZE, MOBILE_SIZE].join(', ');
};

const Image = props => {
  const { children, src, ...rest } = props;

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
              sizes={createSizes()}
            />
          )}
          <source
            srcSet={createSrcSet(src)}
            type="image/jpeg"
            sizes={createSizes()}
          />
          <Img {...rest} src={src.replace('{width}', 240)} />
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
