import React from 'react';
import { storiesOf } from '@storybook/react'; // eslint-disable-line import/no-extraneous-dependencies
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import StoryPromoConatiner from '.';
import fixture from '../../../../data/prod/pidgin/frontpage';
import deepGet from '../../helpers/json/deepGet';
import AmpDecorator from '../../helpers/storybook/ampDecorator';

const StoryName = 'Story Promo';

['canonical', 'amp'].forEach(platform => {
  storiesOf(StoryName, module)
    .addDecorator(AmpDecorator)
    .add(platform, () => (
      <ServiceContextProvider service="news">
        <RequestContextProvider platform={platform}>
          <StoryPromoConatiner
            item={deepGet(['content', 'groups', '0', 'items', '0'], fixture)}
          />
        </RequestContextProvider>
      </ServiceContextProvider>
    ));
});
