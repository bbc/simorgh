import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/news/articles/c0g992jmmkko';
import articleDataWithRelatedContent from '#data/afrique/articles/c7yn6nznljdo';
import secondaryColumn from '#data/news/secondaryColumn';
import singleStoryPromo from '#data/news/secondaryColumn/SingleStoryPromo.json';
import articleDataWithSingleRelatedContent from '#data/afrique/articles/cz216x22106o.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import handlePromoData from '#app/routes/article/handlePromoData';
import ArticlePageComponent from './ArticlePage';

const PageWithOptimizely = withOptimizelyProvider(ArticlePageComponent);
const Page = withPageWrapper(PageWithOptimizely);

// eslint-disable-next-line react/prop-types
const ComponentWithContext = ({
  data = articleData,
  secondaryColumn = secondaryColumn,
}) => (
  <ToggleContextProvider
    toggles={{
      eventTracking: { enabled: true },
      frostedPromo: { enabled: true, value: 1 },
    }}
  >
    {/* Service set to news to enable most read. Article data is in english */}
    <ServiceContextProvider service="news">
      <RequestContextProvider
        isAmp={false}
        pageType={ARTICLE_PAGE}
        service="news"
      >
        <UserContextProvider>
          <MemoryRouter>
            <Page
              pageData={{ ...data, secondaryColumn }}
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
  parameters: { layout: 'fullscreen' },
};

export const ArticlePage = props => (
  <ComponentWithContext
    {...props}
    secondaryColumn={secondaryColumn}
    data={handlePromoData(articleData)}
  />
);

export const ArticlePageWithRelatedContent = props => (
  <ComponentWithContext
    {...props}
    data={handlePromoData(articleDataWithRelatedContent)}
  />
);

export const ArticlePageWithSingleRelatedContent = props => (
  <ComponentWithContext
    {...props}
    data={handlePromoData(articleDataWithSingleRelatedContent)}
  />
);

export const ArticlePageWithSingleStoryPromo = props => (
  <ComponentWithContext {...props} secondaryColumn={singleStoryPromo} />
);
