import React from 'react';
import { storiesOf } from '@storybook/react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import StoryPromoContainer from '.';
import fixture from '#data/pidgin/frontpage';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const mediaFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['cpsType'], item) === 'MAP' &&
        pathOr(null, ['media', 'format'], item) === type,
    );

const storyFixture = () =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(item => pathOr(null, ['cpsType'], item) === 'STY');

const promoFixture = type =>
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
  fixture,
);

firstFixture.timestamp = Date.now();

const audioFixture = mediaFixture('audio');
const videoFixture = mediaFixture('video');
const standardPromo = promoFixture('Text');
const videoPromo = promoFixture('Video');
const featurePromo = promoFixture('Feature');
const audioPromo = promoFixture('Audio');
const galleryPromo = promoFixture('Gallery');
const podcastPromo = promoFixture('Podcast');
const recommendationPromo = storyFixture();

const getStoryPromo = (platform, item, promoType, isRecommendation) => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pathname="/pathname"
      pageType="article"
      service="news"
    >
      <StoryPromoContainer
        item={item}
        promoType={promoType}
        isRecommendation={isRecommendation}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalStoryPromo = (
  item,
  promoType = 'regular',
  isRecommendation = false,
) => getStoryPromo('canonical', item, promoType, isRecommendation);

const getAmpStoryPromo = (
  item,
  promoType = 'regular',
  isRecommendation = false,
) => getStoryPromo('amp', item, promoType, isRecommendation);

storiesOf('Containers|Story Promo/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('Audio fixture', () => getCanonicalStoryPromo(audioFixture))
  .add('Video fixture', () => getCanonicalStoryPromo(videoFixture))
  .add('Standard link promo', () => getCanonicalStoryPromo(standardPromo))
  .add('Feature link promo', () => getCanonicalStoryPromo(featurePromo))
  .add('Video link promo', () => getCanonicalStoryPromo(videoPromo))
  .add('Audio link promo', () => getCanonicalStoryPromo(audioPromo))
  .add('Gallery link promo', () => getCanonicalStoryPromo(galleryPromo))
  .add('Podcast link promo', () => getCanonicalStoryPromo(podcastPromo))
  .add('Regular', () => getCanonicalStoryPromo(firstFixture))
  .add('Leading', () => getCanonicalStoryPromo(firstFixture, 'leading'))
  .add('Top', () => getCanonicalStoryPromo(firstFixture, 'top'))
  .add('Recommendation', () =>
    getCanonicalStoryPromo(recommendationPromo, 'regular', true),
  );

storiesOf('Containers|Story Promo/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('Audio fixture', () => getAmpStoryPromo(audioFixture))
  .add('Video fixture', () => getAmpStoryPromo(videoFixture))
  .add('Standard link promo', () => getAmpStoryPromo(standardPromo))
  .add('Video link promo', () => getAmpStoryPromo(videoPromo))
  .add('Feature link promo', () => getAmpStoryPromo(featurePromo))
  .add('Audio link promo', () => getAmpStoryPromo(audioPromo))
  .add('Gallery link promo', () => getAmpStoryPromo(galleryPromo))
  .add('Podcast link promo', () => getAmpStoryPromo(podcastPromo))
  .add('Regular', () => getAmpStoryPromo(firstFixture))
  .add('Leading', () => getAmpStoryPromo(firstFixture, 'leading'))
  .add('Top', () => getAmpStoryPromo(firstFixture, 'top'))
  .add('Recommendation', () =>
    getAmpStoryPromo(recommendationPromo, 'regular', true),
  );
