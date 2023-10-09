import React from 'react';
import styled from '@emotion/styled';
import { string, node, boolean } from 'prop-types';
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

// promos with images via Programmes (which can be of type audio and possibly others) use a different iChef recipe requiring a second set of resolutions
// https://github.com/bbc/programme-images/tree/master/webapp/ichef/recipes
const createSrcSet = (imageUrl, suffix = '', isProgrammeImage) => {
  const imageResolutions = [85, 120, 170, 232, 325, 450, 660];
  const imageResolutionsProgrammes = [96, 128, 176, 240, 352, 464, 672];

  const resolutions = isProgrammeImage
    ? imageResolutionsProgrammes
    : imageResolutions;

  return resolutions
    .map(res => `${imageUrl.replace(`{width}`, res)}${suffix} ${res}w`)
    .join(', ');
};

const createSizes = (useLargeImages, isProgrammeImage) => {
  // 4 columns of fixed width
  const DESKTOP_SIZE = useLargeImages
    ? `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 660px`
    : `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 232px`;

  const DESKTOP_SIZE_PROGRAMMES = useLargeImages
    ? `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 672px`
    : `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 240px`;

  // 2 columns of 50% screen width - images are 100% of the column
  const TABLET_SIZE = `(min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) 50vw`;

  // 1 column of 100% screen width - images are 33% of the column
  const MOBILE_SIZE = `33vw`;

  return [
    isProgrammeImage ? DESKTOP_SIZE_PROGRAMMES : DESKTOP_SIZE,
    TABLET_SIZE,
    MOBILE_SIZE,
  ].join(', ');
};

const Image = props => {
  const { children, src, useLargeImages, ...rest } = props;
  const isWebPSupported = WEBP_ORIGIN_CODES.some(originCode =>
    src.includes(originCode),
  );
  const isProgrammeImage = src.startsWith(
    'https://ichef.bbci.co.uk/images/ic/',
  );
  const primarySrcSet = createSrcSet(
    src,
    isWebPSupported ? '.webp' : '',
    isProgrammeImage,
  );
  const primaryMediaType = `image/${isWebPSupported ? 'webp' : 'jpeg'}`;
  const fallbackSrcSet = isWebPSupported
    ? createSrcSet(src, '', isProgrammeImage)
    : undefined;
  const fallbackMediaType = isWebPSupported ? 'image/jpeg' : undefined;
  const sizes = createSizes(useLargeImages, isProgrammeImage);

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
  useLargeImages: boolean,
  children: node,
};

Image.defaultProps = {
  useLargeImages: false,
  children: null,
};

export default Image;
