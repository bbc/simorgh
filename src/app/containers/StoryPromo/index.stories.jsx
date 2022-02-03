import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
// import fixture from '#data/news/frontpage';
import fixture from './helpers/storiesFixture';
import StoryPromoContainer from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { guideLinkItem } from './helpers/fixtureData'; // done

const mediaFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['cpsType'], item) === MEDIA_ASSET_PAGE &&
        pathOr(null, ['media', 'format'], item) === type,
    );

const promoFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type,
    );

// missing data
const firstFixture = pathOr(
  null,
  ['content', 'groups', '0', 'items', '0'],
  fixture,
);

firstFixture.timestamp = Date.now();
// Maybe is better if we fetch the news page and we add the promos that we miss from pidgin. This will result in less translation :D
const audioFixture = mediaFixture('audio'); // done
const videoFixture = mediaFixture('video'); // done
const standardPromo = promoFixture('Text'); // translation needed
const videoPromo = promoFixture('Video'); // translation needed
const featurePromo = promoFixture('Feature'); // translation needed
const audioPromo = promoFixture('Audio'); // done
const galleryPromo = promoFixture('Gallery'); // translation needed
const podcastPromo = promoFixture('Podcast'); // missing data

/* eslint-disable react/prop-types */
const Component = ({
  isAmp = false,
  item = audioFixture,
  promoType = 'regular',
  isSingleColumnLayout = false,
}) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={isAmp}
      pathname="/pathname"
      pageType={ARTICLE_PAGE}
      service="news"
    >
      <ToggleContextProvider
        toggles={{
          eventTracking: { enabled: false },
        }}
      >
        <StoryPromoContainer
          item={item}
          promoType={promoType}
          isSingleColumnLayout={isSingleColumnLayout}
        />
      </ToggleContextProvider>
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Containers/Story Promo',
  Component,
  parameters: { chromatic: { disable: true } },
};

// Canonical
export const Promo = () => {
  return (
    <Component
      item={select(
        'type',
        {
          audioFixture,
          videoFixture,
          standardPromo,
          featurePromo,
          videoPromo,
          audioPromo,
          galleryPromo,
          podcastPromo,
          firstFixture,
          guideLinkItem,
        },
        audioFixture,
      )}
      promoType={select(
        'Promo Type',
        {
          regular: 'regular',
          leading: 'leading',
          top: 'top',
        },
        'regular',
      )}
      isAmp={false}
      isSingleColumnLayout={boolean('isSingleColumnLayout', false)}
    />
  );
};
Promo.decorators = [withKnobs];

// Amp
export const PromoAmp = () => {
  return (
    <Component
      item={select(
        'type',
        {
          audioFixture,
          videoFixture,
          standardPromo,
          featurePromo,
          videoPromo,
          audioPromo,
          galleryPromo,
          podcastPromo,
          firstFixture,
          guideLinkItem,
        },
        audioFixture,
      )}
      promoType={select(
        'Promo Type',
        {
          regular: 'regular',
          leading: 'leading',
          top: 'top',
        },
        'regular',
      )}
      isAmp
      isSingleColumnLayout={boolean('isSingleColumnLayout', false)}
    />
  );
};
PromoAmp.decorators = [withKnobs, AmpDecorator];
