import React, { useContext } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import Promo from '#components/OptimoPromos';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { LatestMediaItemProp, ImageProp } from '../LatestMediaTypes';
import { ServiceContext } from '../../../../../contexts/ServiceContext';
import {
  StyledPromoContentWrapper,
  StyledPromoMediaIndicator,
  StyledPromoTitle,
  StyledPromoWrapper,
  StyledTimestamp,
  Wrapper,
  ChildWrapper,
} from './index.styles';
import IMAGE from '../../../../../components/Image';

const WEBP_ORIGIN_CODES = ['cpsdevpb', 'cpsprodpb'];

// promos with images via Programmes (which can be of type audio and possibly others) use a different iChef recipe requiring a second set of resolutions
// https://github.com/bbc/programme-images/tree/master/webapp/ichef/recipes
const createSrcSet = (imageUrl: string, suffix = '') => {
  const imageResolutions = [85, 120, 170, 232, 325, 450, 660];

  const resolutions = imageResolutions;

  return resolutions
    .map(res => `${imageUrl.replace(`{width}`, res)}${suffix} ${res}w`)
    .join(', ');
};

const createSizes = (useLargeImages: boolean, isProgrammeImage: boolean) => {
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

const Image = ({ src, useLargeImages, ...rest }: ImageProp) => {
  const isWebPSupported = WEBP_ORIGIN_CODES.some(originCode =>
    src.includes(originCode),
  );
  const isProgrammeImage = src.startsWith(
    'https://ichef.bbci.co.uk/images/ic/',
  );
  const primarySrcSet = createSrcSet(src, isWebPSupported ? '.webp' : '');
  const primaryMediaType = `image/${isWebPSupported ? 'webp' : 'jpeg'}`;
  const fallbackSrcSet = isWebPSupported ? createSrcSet(src, '') : undefined;
  const fallbackMediaType = isWebPSupported ? 'image/jpeg' : undefined;
  const sizes = createSizes(useLargeImages, isProgrammeImage);

  return (
    <Wrapper>
      <IMAGE
        {...rest}
        src={src}
        srcSet={primarySrcSet}
        mediaType={primaryMediaType}
        fallbackSrcSet={fallbackSrcSet}
        fallbackMediaType={fallbackMediaType}
        sizes={sizes}
        aspectRatio={[16, 9]}
        alt="hello"
      />
      {/* {children && <ChildWrapper>{children}</ChildWrapper>} */}
    </Wrapper>
  );
};

const LatestMediaItem = ({
  item,
  ariaLabelledBy,
  eventTrackingData,
  ref,
}: LatestMediaItemProp) => {
  const { script } = useContext(ServiceContext);

  if (!item || isEmpty(item)) return null;

  const timestamp = item.firstPublished;

  const src = item.imageUrl.replace('{width}', '240');

  console.log('hello', src);

  return (
    <div>
      <StyledPromoWrapper ref={ref}>
        <Promo
          to={item.link}
          ariaLabelledBy={ariaLabelledBy}
          mediaType={item.type}
          eventTrackingData={eventTrackingData}
        >
          <Image src={src} useLargeImages />
          <Promo.Link>
            <StyledPromoContentWrapper>
              {item.type && <StyledPromoMediaIndicator />}
              <StyledPromoTitle as="h3" script={script}>
                {item.title}
              </StyledPromoTitle>
            </StyledPromoContentWrapper>
          </Promo.Link>
          <StyledTimestamp>{timestamp}</StyledTimestamp>
        </Promo>
      </StyledPromoWrapper>

      <hr />
    </div>
  );
};

export default LatestMediaItem;
