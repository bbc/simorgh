import React from 'react';
import styled from '@emotion/styled';
import { string, node } from 'prop-types';
import { GEL_SPACING } from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import IMAGE from '../../../components/Image';

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
  const primarySrcSet = createSrcSet(src, isWebPSupported ? '.webp' : '');
  const primaryMediaType = `image/${isWebPSupported ? 'webp' : 'jpeg'}`;
  const fallbackSrcSet = isWebPSupported ? createSrcSet(src) : undefined;
  const fallbackMediaType = isWebPSupported ? 'image/jpeg' : undefined;
  const sizes = createSizes();

  return (
    <Wrapper>
      <IMAGE
        {...rest}
        src={src.replace('{width}', 240)}
        srcSet={primarySrcSet}
        mediaType={primaryMediaType}
        fallbackSrcSet={fallbackSrcSet}
        fallbackMediaType={fallbackMediaType}
        sizes={sizes}
        aspectRatio={[16, 9]}
      />
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
