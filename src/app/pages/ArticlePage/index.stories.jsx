import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import ArticlePageComponent from './ArticlePage';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/news/articles/c5jje4ejkqvo';

const ComponentWithContext = () => (
  <ToggleContextProvider>
    {/* Service set to pidgin to enable most read. Article data is in english */}
    <ServiceContextProvider service="pidgin">
      <RequestContextProvider
        isAmp={false}
        pageType={ARTICLE_PAGE}
        service="pidgin"
      >
        <UserContextProvider>
          <MemoryRouter>
            <ArticlePageComponent
              pageData={articleData}
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
ArticlePage.storyName = 'Pages/Article Page';
