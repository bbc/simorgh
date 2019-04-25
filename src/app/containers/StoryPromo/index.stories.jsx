import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoConatiner from '.';
import fixture from '../../../../data/prod/pidgin/frontpage';
import deepGet from '../../helpers/json/deepGet';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

const StoryName = 'Story Promo';

storiesOf(StoryName, module).add('Canonical', () => (
  <ServiceContextProvider service="news">
    <RequestContextProvider platform="canonical">
      <StoryPromoConatiner
        item={deepGet(['content', 'groups', '0', 'items', '0'], fixture)}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
));

storiesOf(StoryName, module)
  .addDecorator(AmpDecorator)
  .add('Amp', () => (
    <ServiceContextProvider service="news">
      <RequestContextProvider platform="amp">
        <StoryPromoConatiner
          item={deepGet(['content', 'groups', '0', 'items', '0'], fixture)}
        />
      </RequestContextProvider>
    </ServiceContextProvider>
  ));
