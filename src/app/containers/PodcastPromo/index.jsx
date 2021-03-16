import React, { useContext } from 'react';
import path from 'ramda/src/path';
import PromoComponent from './components';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';

const getSrcFromSize = (url, size) => {
  const src = url.replace('$recipe', `${size}x${size}`);
  return `${src} ${size}w`;
};

const getSrcSet = (url, sizes) =>
  sizes.map(size => getSrcFromSize(url, size)).join(',');

const Promo = () => {
  const { podcastPromo, script, service } = useContext(ServiceContext);
  const podcastPromoTitle = path(['title'], podcastPromo);
  const podcastBrandTitle = path(['brandTitle'], podcastPromo);
  const description = path(['brandDescription'], podcastPromo);
  const img = path(['image', 'src'], podcastPromo);
  const alt = path(['image', 'alt'], podcastPromo);
  const url = path(['linkLabel', 'href'], podcastPromo);
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
  if (!showPromo) {
    return null;
  }

  const imgSrc = img.replace('$recipe', '512x512');
  const srcset = getSrcSet(img, [128, 240, 480]);
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return (
    <PromoComponent
      script={script}
      service={service}
      role="region"
      aria-labelledby="podcast-promo"
    >
      <PromoComponent.Title id="podcast-promo">
        {podcastPromoTitle}
      </PromoComponent.Title>
      <PromoComponent.Card>
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
    </PromoComponent>
  );
};

export default Promo;
