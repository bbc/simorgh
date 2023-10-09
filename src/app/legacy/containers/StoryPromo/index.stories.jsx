import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import ThemeProvider from '../../../components/ThemeProvider';
import { ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import fixture from './helpers/storiesFixture';
import StoryPromoContainer from '.';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import { guideLinkItem } from './helpers/fixtureData';

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

const audioFixture = mediaFixture('audio');
const videoFixture = mediaFixture('video');
const standardPromo = promoFixture('Text');
const videoPromo = promoFixture('Video');
const featurePromo = promoFixture('Feature');
const audioPromo = promoFixture('Audio');
const galleryPromo = promoFixture('Gallery');
const podcastPromo = promoFixture('Podcast');

/* eslint-disable react/prop-types */
const Component = ({
  isAmp = false,
  item = audioFixture,
  promoType = 'regular',
  isSingleColumnLayout = false,
}) => {
  return (
    <ThemeProvider service="news">
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
    </ThemeProvider>
  );
};

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
