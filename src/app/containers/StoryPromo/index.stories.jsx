import React from 'react';
import { storiesOf } from '@storybook/react';
import pathOr from 'ramda/src/pathOr';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoContainer from '.';
import fixture from '../../../../data/pidgin/frontpage';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const mediaFixture = type =>
  pathOr(null, ['content', 'groups'], fixture)
    .flatMap(group => pathOr(null, ['items'], group))
    .find(
      item =>
        pathOr(null, ['cpsType'], item) === 'MAP' &&
        pathOr(null, ['media', 'format'], item) === type,
    );

const firstFixture = pathOr(
  null,
  ['content', 'groups', '0', 'items', '0'],
  fixture,
);
const audioFixture = mediaFixture('audio');
const videoFixture = mediaFixture('video');

const getStoryPromo = platform => item => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      bbcOrigin="https://www.test.bbc.co.uk"
      id="c0000000000o"
      isAmp={platform === 'amp'}
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
  .add('canonical', () => getCanonicalStoryPromo(firstFixture))
  .add('audio promo', () => getCanonicalStoryPromo(audioFixture))
  .add('video promo', () => getCanonicalStoryPromo(videoFixture));

storiesOf('Containers|Story Promo/AMP', module)
  .addDecorator(AmpDecorator)
  .add('amp', () => getAmpStoryPromo(firstFixture))
  .add('audio promo - amp', () => getAmpStoryPromo(audioFixture))
  .add('video promo - amp', () => getAmpStoryPromo(videoFixture));
