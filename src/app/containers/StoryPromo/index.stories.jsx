import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoConatiner from '.';
import fixture from '../../../../data/prod/pidgin/frontpage';
import deepGet from '../../helpers/json/deepGet';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

const getStoryPromo = platform => (
  <ServiceContextProvider service="news">
    <RequestContextProvider
      platform={platform}
      isUK
      origin="https://www.bbc.co.uk"
      id="c0000000000o"
      statsDestination="NEWS_PS_TEST"
      statsPageIdentifier="news.articles.c0000000000o"
    >
      <StoryPromoConatiner
        item={deepGet(['content', 'groups', '0', 'items', '0'], fixture)}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

storiesOf('Story Promo', module).add('canonical', () =>
  getStoryPromo('canonical'),
);

storiesOf('Story Promo', module)
  .addDecorator(AmpDecorator)
  .add('amp', () => getStoryPromo('amp'));
