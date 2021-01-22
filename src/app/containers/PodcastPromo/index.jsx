import React, { useContext } from 'react';
import path from 'ramda/src/path';
import PodcastPromo from '@bbc/psammead-podcast-promo';

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
    <PodcastPromo
      script={script}
      service={service}
      role="region"
      aria-labelledby="podcast-promo"
    >
      <PodcastPromo.Title id="podcast-promo">
        {podcastPromoTitle}
      </PodcastPromo.Title>
      <PodcastPromo.Card>
        <PodcastPromo.Card.ImageWrapper>
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
        </PodcastPromo.Card.ImageWrapper>
        <PodcastPromo.Card.Content>
          <PodcastPromo.Card.Title>
            <PodcastPromo.Card.Link href={url}>
              <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                {podcastBrandTitle}
              </span>
            </PodcastPromo.Card.Link>
          </PodcastPromo.Card.Title>
          <PodcastPromo.Card.Description>
            {description}
          </PodcastPromo.Card.Description>
          <PodcastPromo.Card.EpisodesText>
            {label}
          </PodcastPromo.Card.EpisodesText>
        </PodcastPromo.Card.Content>
      </PodcastPromo.Card>
    </PodcastPromo>
  );
};

export default Promo;
