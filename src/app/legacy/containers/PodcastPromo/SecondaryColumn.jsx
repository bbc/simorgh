import React, { useContext } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
} from '#psammead/gel-foundations/src/spacings';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#psammead/gel-foundations/src/breakpoints';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

import ImageWithPlaceholder from '#containers/ImageWithPlaceholder';
import { ServiceContext } from '../../../contexts/ServiceContext';
import PromoComponent from './components';
import getPromo from './shared';

const ResponsivePodcastPromoWrapper = styled.div`
  margin-top: ${GEL_SPACING_TRPL};
  margin-bottom: ${GEL_SPACING_TRPL};
  @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
    margin-top: 0;
    margin-bottom: ${GEL_SPACING};
    padding: ${GEL_SPACING_DBL};
  }
`;

const Promo = () => {
  const { podcastPromo, script, service, dir } = useContext(ServiceContext);

  const {
    podcastPromoTitle,
    podcastBrandTitle,
    description,
    imgSrc,
    alt,
    url,
    label,
    showPromo,
    eventTrackingData,
    sizes,
    srcset,
    primaryMimeType,
  } = getPromo(podcastPromo);

  const viewTrackerRef = useViewTracker(eventTrackingData);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  if (!showPromo) {
    return null;
  }

  return (
    <ResponsivePodcastPromoWrapper {...viewTrackerRef} data-e2e="podcast-promo">
      <PromoComponent
        script={script}
        service={service}
        role="region"
        aria-labelledby="podcast-promo"
      >
        <PromoComponent.Title id="podcast-promo" dir={dir}>
          {podcastPromoTitle}
        </PromoComponent.Title>
        <PromoComponent.Card>
          <PromoComponent.Card.ImageWrapper>
            <ImageWithPlaceholder
              src={imgSrc}
              srcset={srcset}
              primaryMimeType={primaryMimeType}
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
              <PromoComponent.Card.Link href={url} onClick={clickTrackerRef}>
                <span className="podcast-promo--hover podcast-promo--focus podcast-promo--visited">
                  {podcastBrandTitle}
                </span>
              </PromoComponent.Card.Link>
            </PromoComponent.Card.Title>
            <PromoComponent.Card.Description>
              {description}
            </PromoComponent.Card.Description>
            <PromoComponent.Card.EpisodesText dir={dir}>
              {label}
            </PromoComponent.Card.EpisodesText>
          </PromoComponent.Card.Content>
        </PromoComponent.Card>
      </PromoComponent>
    </ResponsivePodcastPromoWrapper>
  );
};

export default Promo;
