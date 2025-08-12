import getBrandedImage from '#app/lib/utilities/getBrandedImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { Services } from '#app/models/types/global';

const responseNotFound = () => new Response('Not found', { status: 404 });

const getImages = ({
  service,
  promoImage,
}: {
  service: Services;
  promoImage: {
    originCode: string;
    locator: string;
    suitableForSyndication: boolean;
  };
}) => {
  const defaultImage = `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

  if (!promoImage?.suitableForSyndication)
    return { unbrandedImage: defaultImage, brandedImage: defaultImage };

  const unbrandedImage =
    buildIChefURL({
      originCode: promoImage?.originCode,
      locator: promoImage?.locator,
      resolution: 800,
    }) || defaultImage;

  const brandedImage =
    getBrandedImage(promoImage?.locator, service) || defaultImage;

  return { unbrandedImage, brandedImage };
};

export { responseNotFound, getImages };
