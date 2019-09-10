import React from 'react';
import { storiesOf } from '@storybook/react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import ArticleMain from '.';
import { articleDataNews, articleDataPersian } from '../Article/fixtureData';

// article c5jje4ejkqvo contains a Headline, a Paragraph, a timestamp
// a Portrait Image with Caption, a Landscape Image with Caption and Square Image with Caption.
import articleData from '../../../../data/news/articles/c5jje4ejkqvo';

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
    inputProvider({
      // eslint-disable-next-line react/prop-types
      componentFunction: ({ service }) => {
        return (
          <ToggleContextProvider>
            <ServiceContextProvider service={service}>
              <RequestContextProvider
                isAmp={false}
                pageType="article"
                service={service}
              >
                <ArticleMain articleData={availableFixtures[service]} />
              </RequestContextProvider>
            </ServiceContextProvider>
          </ToggleContextProvider>
        );
      },
      services: Object.keys(availableFixtures),
    }),
  )
  .add('Grid Layout', () => (
    <ToggleContextProvider>
      <ServiceContextProvider service="news">
        <RequestContextProvider isAmp={false} pageType="article" service="news">
          <ArticleMain articleData={articleData} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
