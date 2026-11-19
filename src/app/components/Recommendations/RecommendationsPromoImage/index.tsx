import { createIchefSrcSet } from '#app/utilities/imageSrcSets';
import Image from '#app/components/Image';
import { Recommendation } from '#models/types/onwardJourney';

const RecommendationsImage = ({
  image,
  lazyLoad = false,
}: {
  image?: Recommendation['image'] | null;
  lazyLoad?: boolean;
}) => {
  if (!image) return null;

  const { height, width, altText, copyrightHolder, originCode, locator } =
    image;

  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const DEFAULT_IMAGE_RES = 660;
  const { primarySrcset, fallbackSrcset, src } = createIchefSrcSet({
    originCode,
    locator,
    originalImageWidth: width,
    imageResolutions,
    srcResolution: DEFAULT_IMAGE_RES,
  });

  return (
    <Image
      alt={altText}
      aspectRatio={[width, height]}
      src={src}
      attribution={copyrightHolder}
      srcSet={primarySrcset}
      fallbackSrcSet={fallbackSrcset}
      lazyLoad={lazyLoad}
    />
  );
};

export default RecommendationsImage;
