import React, { useContext } from 'react';
import path from 'ramda/src/path';
import mergeDeepLeft from 'ramda/src/mergeDeepLeft';
import PromoComponent from './components';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import { createSrcset } from '#lib/utilities/srcSet';
import getOriginCode from '#lib/utilities/imageSrcHelpers/originCode';
import getLocator from '#lib/utilities/imageSrcHelpers/locator';

// const getSrcFromSize = (url, size) => {
//   const src = url.replace('$recipe', `${size}x${size}`);
//   return `${src} ${size}w`;
// };

// const getSrcSet = (url, sizes) =>
//   sizes.map(size => getSrcFromSize(url, size)).join(',');

const Promo = props => {
  const { podcastPromo, script, service } = useContext(ServiceContext);

  const data = mergeDeepLeft(props, podcastPromo);
  const podcastPromoTitle = path(['title'], data);
  const podcastBrandTitle = path(['brandTitle'], data);
  const description = path(['brandDescription'], data);
  const imgPath = path(['image', 'path'], data);
  const imgWidth = path(['image', 'width'], data);
  const alt = path(['image', 'alt'], data);
  const ichefPath = path(['image', 'ichefPath'], data);
  const url = path(['linkLabel', 'href'], data);
  const label = path(['linkLabel', 'text'], data);
  const isHorizontal = path(['isHorizontal'], data);
  const isIchefImage = Boolean(ichefPath);

  const showPromo = [
    podcastBrandTitle,
    podcastPromoTitle,
    description,
    imgPath || ichefPath,
    alt,
    url,
    label,
  ].every(Boolean);
  if (!showPromo) {
    return null;
  }

  const originCode = getOriginCode(imgPath);
  const locator = getLocator(imgPath);
  const imageResolutions = [70, 95, 144, 183, 240, 320, 660];
  const DEFAULT_IMAGE_RES = 660;
  const imgSrc = isIchefImage
    ? ichefPath.replace('$recipe', '512x512')
    : `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${imgPath}`;
  const srcset = isIchefImage
    ? ichefPath.replace('$recipe', '512x512')
    : createSrcset(originCode, locator, imgWidth, imageResolutions);
  const sizes =
    '@media (min-width: 600px) 178px,  @media (min-width: 1008px) 232px, 109px';

  return (
    <PromoComponent
      script={script}
      service={service}
      isHorizontal={isHorizontal}
      role="region"
      aria-labelledby="podcast-promo"
      data-testid="podcast-promo"
    >
      <PromoComponent.Blah>
        <PromoComponent.Title id="podcast-promo">
          {podcastPromoTitle}
        </PromoComponent.Title>

        <PromoComponent.Card isHorizontal={isHorizontal}>
          <PromoComponent.Card.ImageWrapper>
            <ImageWithPlaceholder
              src={imgSrc}
              srcset={srcset}
              sizes={sizes}
              alt={alt}
              height={1}
              width={1}
              ratio={100}
              lazyLoad
            />
          </PromoComponent.Card.ImageWrapper>
          <PromoComponent.Card.Content>
            <PromoComponent.Card.Title>
              <PromoComponent.Card.Link href={url}>
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {podcastBrandTitle}
                </span>
              </PromoComponent.Card.Link>
            </PromoComponent.Card.Title>
            <PromoComponent.Card.Description>
              {description}
            </PromoComponent.Card.Description>
            <PromoComponent.Card.EpisodesText>
              {label}
            </PromoComponent.Card.EpisodesText>
          </PromoComponent.Card.Content>
        </PromoComponent.Card>
      </PromoComponent.Blah>
    </PromoComponent>
  );
};

export default Promo;
