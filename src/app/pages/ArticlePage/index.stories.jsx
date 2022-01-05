import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/news/articles/c5jje4ejkqvo';
import secondaryColumn from '#data/news/secondaryColumn';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import ArticlePageComponent from './ArticlePage';

const Page = withPageWrapper(ArticlePageComponent);

const ComponentWithContext = () => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
      frostedPromo: { enabled: true, value: 1 },
    }}
  >
    {/* Service set to pidgin to enable most read. Article data is in english */}
    <ServiceContextProvider service="news">
      <RequestContextProvider
        isAmp={false}
        pageType={ARTICLE_PAGE}
        service="news"
      >
        <UserContextProvider>
          <MemoryRouter>
            <Page
              pageData={{ ...articleData, secondaryColumn }}
              mostReadEndpointOverride="./data/news/mostRead/index.json"
            />
          </MemoryRouter>
        </UserContextProvider>
      </RequestContextProvider>
    </ServiceContextProvider>
  </ToggleContextProvider>
);

export default {
  Component: ComponentWithContext,
  title: 'Pages/Article Page',
  decorators: [withKnobs],
};

export const ArticlePage = ComponentWithContext;
