import React from 'react';
import { storiesOf } from '@storybook/react';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoContainer from '.';
import fixture from '../../../../data/prod/pidgin/frontpage';
import deepGet from '../../lib/utilities/deepGet';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const mediaFixture = type =>
  deepGet(['content', 'groups'], fixture)
    .flatMap(group => deepGet(['items'], group))
    .find(
      item =>
        deepGet(['cpsType'], item) === 'MAP' &&
        deepGet(['media', 'format'], item) === type,
    );

const firstFixture = deepGet(['content', 'groups', '0', 'items', '0'], fixture);
const audioFixture = mediaFixture('audio');
const videoFixture = mediaFixture('video');

const getStoryPromo = platform => item => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform={platform}
      isUK
      lang="en-gb"
      origin="https://www.bbc.co.uk"
      pageType="article"
      id="c0000000000o"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <StoryPromoContainer item={item} />
    </RequestContextProvider>
  </ServiceContextProvider>
);

const getCanonicalStoryPromo = getStoryPromo('canonical');
const getAmpStoryPromo = getStoryPromo('amp');

storiesOf('Story Promo', module)
  .add('canonical', () => getCanonicalStoryPromo(firstFixture))
  .add('audio promo', () => getCanonicalStoryPromo(audioFixture))
  .add('video promo', () => getCanonicalStoryPromo(videoFixture));

storiesOf('Story Promo', module)
  .addDecorator(AmpDecorator)
  .add('amp', () => getAmpStoryPromo(firstFixture))
  .add('audio promo - amp', () => getAmpStoryPromo(audioFixture))
  .add('video promo - amp', () => getAmpStoryPromo(videoFixture));
