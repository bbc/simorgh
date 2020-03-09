import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import ArticlePage from '.';

// article c5jje4ejkqvo contains a Headline, a Paragraph, a timestamp
// a Portrait Image with Caption, a Landscape Image with Caption and Square Image with Caption.
import articleData from '#data/news/articles/c5jje4ejkqvo';

// Not all services have fixtures for article data yet
// the service selector will be constrained to services that have article fixtures:

storiesOf('Pages|Article Page', module)
  .addDecorator(withKnobs)
  .add('Articles', () => (
    <ToggleContextProvider service="pidgin">
      {/* Service set to pidgin to enable most read. Article data is in english */}
      <ServiceContextProvider service="pidgin">
        <RequestContextProvider
          isAmp={false}
          pageType="article"
          service="pidgin"
        >
          <UserContextProvider>
            <ArticlePage
              pageData={articleData}
              mostReadEndpointOverride="./data/news/mostRead/index.json"
            />
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
