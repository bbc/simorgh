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

const getStoryPromo = platform => item => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
      pathname="/pathname"
      pageType="article"
      service="news"
    >
      <StoryPromoContainer item={item} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalStoryPromo = getStoryPromo('canonical');
const getAmpStoryPromo = getStoryPromo('amp');

storiesOf('Containers|Story Promo/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .add('canonical', () => getCanonicalStoryPromo(firstFixture))
  .add('audio fixture', () => getCanonicalStoryPromo(audioFixture))
  .add('video fixture', () => getCanonicalStoryPromo(videoFixture))
  .add('standard link promo', () => getCanonicalStoryPromo(standardPromo))
  .add('feature link promo', () => getCanonicalStoryPromo(featurePromo))
  .add('video link promo', () => getCanonicalStoryPromo(videoPromo))
  .add('audio link promo', () => getCanonicalStoryPromo(audioPromo))
  .add('gallery link promo', () => getCanonicalStoryPromo(galleryPromo))
  .add('podcast link promo', () => getCanonicalStoryPromo(podcastPromo));

storiesOf('Containers|Story Promo/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(AmpDecorator)
  .add('amp', () => getAmpStoryPromo(firstFixture))
  .add('audio fixture - amp', () => getAmpStoryPromo(audioFixture))
  .add('video fixture - amp', () => getAmpStoryPromo(videoFixture))
  .add('standard link promo - amp', () => getAmpStoryPromo(standardPromo))
  .add('video link promo - amp', () => getAmpStoryPromo(videoPromo))
  .add('feature link promo - amp', () => getAmpStoryPromo(featurePromo))
  .add('audio link promo - amp', () => getAmpStoryPromo(audioPromo))
  .add('gallery link promo - amp', () => getAmpStoryPromo(galleryPromo))
  .add('podcast link promo - amp', () => getAmpStoryPromo(podcastPromo));
