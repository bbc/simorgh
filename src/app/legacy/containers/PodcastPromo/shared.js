import path from 'ramda/src/path';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import { getMimeType } from '#lib/utilities/srcSet';

const getSrcFromSize = (url, size) => {
  const src = url.replace('$recipe', `${size}x${size}`);
  return `${src} ${size}w`;
};

const getSrcSet = (url, sizes) =>
  sizes.map(size => getSrcFromSize(url, size)).join(',');

const getPromo = podcastPromo => {
  if (!podcastPromo) {
    return {};
  }

  const podcastPromoTitle = path(['title'], podcastPromo);
  const podcastBrandTitle = path(['brandTitle'], podcastPromo);
  const description = path(['brandDescription'], podcastPromo);
  const img = path(['image', 'src'], podcastPromo);
  const alt = path(['image', 'alt'], podcastPromo);
  const url = makeRelativeUrlPath(path(['linkLabel', 'href'], podcastPromo));
  const label = path(['linkLabel', 'text'], podcastPromo);

  const showPromo = [
    podcastBrandTitle,
    podcastPromoTitle,
    description,
    img,
    alt,
    url,
    label,
  ].every(Boolean);

  const eventTrackingData = {
    componentName: 'promo-podcast',
  };

  const imgReplacedRecipe = img.replace('$recipe', '512x512');
  const imgSrc = imgReplacedRecipe.endsWith('.webp')
    ? imgReplacedRecipe
    : `${imgReplacedRecipe}.webp`;
  const srcset = getSrcSet(img, [128, 240, 480]);
  const primaryMimeType = getMimeType(srcset);
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return {
    podcastPromoTitle,
    podcastBrandTitle,
    description,
    imgSrc,
    srcset,
    primaryMimeType,
    sizes,
    alt,
    url,
    label,
    showPromo,
    eventTrackingData,
  };
};

export default getPromo;
