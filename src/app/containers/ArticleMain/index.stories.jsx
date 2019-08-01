import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';

import ArticleMain from '.';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

// Not all services have fixtures for article data yet
// the service selector will be constrained to services that have article fixtures:
const availableFixtures = {
  news: articleDataNews,
  persian: articleDataPersian,
};

storiesOf('Containers|Article/Article Main', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    inputProvider(
      null,
      ({ service }) => {
        return (
          <ServiceContextProvider service={service}>
            <ArticleMain articleData={availableFixtures[service]} />
          </ServiceContextProvider>
        );
      },
      Object.keys(availableFixtures),
    ),
  );
