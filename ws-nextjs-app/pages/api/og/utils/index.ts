import getBrandedImage from '#app/lib/utilities/getBrandedImage';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { Services } from '#app/models/types/global';

const responseNotFound = () => new Response('Not found', { status: 404 });

const getImages = ({
  service,
  promoImage,
}: {
  service: Services;
  promoImage: { originCode: string; locator: string };
}) => {
  const unbrandedImage =
    buildIChefURL({
      originCode: promoImage?.originCode,
      locator: promoImage?.locator,
      resolution: 800,
    }) || `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

  const brandedImage =
    getBrandedImage(promoImage?.locator, service) ||
    `https://news.files.bbci.co.uk/ws/img/logos/og/${service}.png`;

  return { unbrandedImage, brandedImage };
};

export { responseNotFound, getImages };
