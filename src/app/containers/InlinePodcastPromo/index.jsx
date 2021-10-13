import React, { useContext } from 'react';
import path from 'ramda/src/path';
import styled from '@emotion/styled';

import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import PromoComponent from './components';

import { ServiceContext } from '#contexts/ServiceContext';
import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

const getSrcFromSize = (url, size) => {
  const src = url.replace('$recipe', `${size}x${size}`);
  return `${src} ${size}w`;
};

const getSrcSet = (url, sizes) =>
  sizes.map(size => getSrcFromSize(url, size)).join(',');

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);
  const podcastPromoTitle = path(['title'], podcastPromo);
  const podcastBrandTitle = path(['brandTitle'], podcastPromo);
  const description = path(['brandDescription'], podcastPromo);
  const img = path(['image', 'src'], podcastPromo);
  const alt = path(['image', 'alt'], podcastPromo);
  const url = path(['linkLabel', 'href'], podcastPromo);
  const label = path(['linkLabel', 'text'], podcastPromo);
  // const { text, endTextVisuallyHidden } = path(['skipLink'], podcastPromo);

  const terms = {
    '%title%': podcastPromoTitle,
  };

  const skipLink = {
    endTextId: `end-of-podcasts`,
    terms,
    text: 'this is a test',
    endTextVisuallyHidden: 'test',
  };

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

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  if (!showPromo) {
    return null;
  }

  const imgSrc = img.replace('$recipe', '512x512');
  const srcset = getSrcSet(img, [128, 240, 480]);
  const sizes = '(min-width: 1008px) 228px, 30vw';

  return (
    <PromoComponent
      ref={viewTrackerRef}
      script={script}
      service={service}
      role="region"
      aria-labelledby="podcast-promo"
      dir={dir}
    >
      <SkipLinkWrapper service={service} {...skipLink}>
        <PromoComponent.Title id="podcast-promo" dir={dir}>
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
            <PromoComponent.Card.Link href={url} onClick={clickTrackerRef}>
              <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                {podcastBrandTitle}
              </span>
            </PromoComponent.Card.Link>
            <PromoComponent.Card.Description>
              {description}
            </PromoComponent.Card.Description>
            <PromoComponent.Card.EpisodesText dir={dir}>
              {label}
            </PromoComponent.Card.EpisodesText>
          </PromoComponent.Card.Content>
        </PromoComponent.Card>
      </SkipLinkWrapper>
    </PromoComponent>
  );
};

export default Promo;
