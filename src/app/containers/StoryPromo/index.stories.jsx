import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoConatiner from '.';
import fixture from '../../../../data/prod/pidgin/frontpage';
import deepGet from '../../helpers/json/deepGet';

storiesOf('Story Promo', module).add('default', () => (
  <ServiceContextProvider service="news">
    <RequestContextProvider platform="canonical">
      <StoryPromoConatiner
        item={deepGet(['content', 'groups', '0', 'items', '0'], fixture)}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
));
