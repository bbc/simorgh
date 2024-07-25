import React from 'react';
import styled from '@emotion/styled';
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

// promos with images via Programmes (which can be of type audio and possibly others) use a different iChef recipe requiring a second set of resolutions
// https://github.com/bbc/programme-images/tree/master/webapp/ichef/recipes
const createSrcSet = (imageUrl, suffix = '', isProgrammeImage) => {
  const imageResolutions = [85, 120, 170, 232, 325, 450, 660, 800];
  const imageResolutionsProgrammes = [96, 128, 176, 240, 352, 464, 672, 800];

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
    ? `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 800px`
    : `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 232px`;

  const DESKTOP_SIZE_PROGRAMMES = useLargeImages
    ? `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 800px`
    : `(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) 240px`;

  // 2 columns of 50% screen width - images are 100% of the column
  const TABLET_SIZE = useLargeImages
    ? `(min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) 66vw`
    : `(min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) 50vw`;

  // 1 column of 100% screen width - images are 33% of the column
  const MOBILE_SIZE = useLargeImages ? `100vw` : `33vw`;

  return [
    isProgrammeImage ? DESKTOP_SIZE_PROGRAMMES : DESKTOP_SIZE,
    TABLET_SIZE,
    MOBILE_SIZE,
  ].join(', ');
};

const Image = props => {
  const { children = null, src, useLargeImages = false, ...rest } = props;
  const isProgrammeImage = src.startsWith(
    'https://ichef.bbci.co.uk/images/ic/',
  );
  const suffix = src.endsWith('.webp') ? '' : '.webp';
  const primarySrcSet = createSrcSet(src, suffix, isProgrammeImage);

  const fallbackSrcSet = createSrcSet(src, '', isProgrammeImage).replaceAll(
    '.webp',
    '',
  );

  const sizes = createSizes(useLargeImages, isProgrammeImage);
  return (
    <Wrapper>
      <IMAGE
        {...rest}
        src={src.replace('{width}', 240)}
        srcSet={primarySrcSet}
        mediaType="image/webp"
        fallbackSrcSet={fallbackSrcSet}
        fallbackMediaType="image/jpeg"
        sizes={sizes}
        aspectRatio={[16, 9]}
      />
      {children && <ChildWrapper>{children}</ChildWrapper>}
    </Wrapper>
  );
};

export default Image;
