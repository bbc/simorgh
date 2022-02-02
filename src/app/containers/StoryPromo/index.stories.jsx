import React from 'react';
import pathOr from 'ramda/src/pathOr';
import { withKnobs, select, boolean } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import pidginFixture from '#data/pidgin/frontpage';
import newsFixture from '#data/news/frontpage';
import { ARTICLE_PAGE, MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import StoryPromoContainer from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import { guideLinkItem } from './helpers/fixtureData';

const mediaFixture = (type, fixture) =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['cpsType'], item) === MEDIA_ASSET_PAGE &&
        pathOr(null, ['media', 'format'], item) === type,
    );

const promoFixture = (type, fixture) =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['assetTypeCode'], item) === 'PRO' &&
        pathOr(null, ['contentType'], item) === type,
    );

const firstFixture = pathOr(
  null,
  ['content', 'groups', '0', 'items', '0'],
  pidginFixture,
);

firstFixture.timestamp = Date.now();

const audioFixture = service =>
  service === 'news'
    ? mediaFixture('audio', newsFixture)
    : mediaFixture('audio', pidginFixture);
const videoFixture = service =>
  service === 'news'
    ? mediaFixture('video', newsFixture)
    : mediaFixture('video', pidginFixture);
const standardPromo = service =>
  service === 'news'
    ? promoFixture('Text', newsFixture)
    : promoFixture('Text', pidginFixture);
const videoPromo = service =>
  service === 'news'
    ? promoFixture('Video', newsFixture)
    : promoFixture('Video', pidginFixture);
const featurePromo = service =>
  service === 'news'
    ? promoFixture('Feature', newsFixture)
    : promoFixture('Feature', pidginFixture);
const audioPromo = service =>
  service === 'news'
    ? promoFixture('Audio', newsFixture)
    : promoFixture('Audio', pidginFixture);
const galleryPromo = service =>
  service === 'news'
    ? promoFixture('Gallery', newsFixture)
    : promoFixture('Gallery', pidginFixture);
const podcastPromo = service =>
  service === 'news'
    ? promoFixture('Podcast', newsFixture)
    : promoFixture('Podcast', pidginFixture);

/* eslint-disable react/prop-types */
const Component = ({
  service,
  isAmp,
  item,
  promoType,
  isSingleColumnLayout,
}) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={isAmp}
      pathname="/pathname"
      pageType={ARTICLE_PAGE}
      service={service}
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
  const selectService = select(
    'service',
    { news: 'news', pidgin: 'pidgin' },
    'news',
  );
  return (
    <Component
      item={select(
        'type',
        {
          audioFixture: audioFixture(selectService),
          videoFixture: videoFixture(selectService),
          standardPromo: standardPromo(selectService),
          featurePromo: featurePromo(selectService),
          videoPromo: videoPromo(selectService),
          audioPromo: audioPromo(selectService),
          galleryPromo: galleryPromo(selectService),
          podcastPromo: podcastPromo(selectService),
          firstFixture,
          guideLinkItem,
        },
        audioFixture,
      )}
      service={selectService}
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
export const PromoAmp = () => (
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
    service={select('service', { news: 'news', pidgin: 'pidgin' }, 'news')}
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
PromoAmp.decorators = [withKnobs, AmpDecorator];
