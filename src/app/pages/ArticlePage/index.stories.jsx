import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/news/articles/c0g992jmmkko.json';
import articleDataWithRelatedContent from '#data/afrique/articles/c7yn6nznljdo.json';
import articleDataWithSingleRelatedContent from '#data/afrique/articles/cz216x22106o.json';
import articleDataWithPodcastPromo from '#data/russian/articles/c61q94n3rm3o.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ArticlePageComponent from './ArticlePage';

const PageWithOptimizely = withOptimizelyProvider(ArticlePageComponent);
const Page = withPageWrapper(PageWithOptimizely);

const ComponentWithContext = ({
  data: { data },
  service = 'news',
  podcastEnabled = false,
}) => {
  return (
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
        mostRead: { enabled: true },
        frostedPromo: { enabled: true, value: 1 },
        podcastPromo: { enabled: podcastEnabled },
      }}
    >
      {/* Service set to news to enable most read. Article data is in english */}
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          isAmp={false}
          pageType={ARTICLE_PAGE}
          service={service}
        >
          <UserContextProvider>
            <MemoryRouter>
              <Page
                pageData={{
                  ...data.article,
                  secondaryColumn: data.secondaryData,
                  mostRead: data.secondaryData.mostRead,
                }}
              />
            </MemoryRouter>
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component: ComponentWithContext,
  title: 'Pages/Article Page',
  decorators: [withKnobs],
  parameters: { layout: 'fullscreen' },
};

export const ArticlePage = props => (
  <ComponentWithContext {...props} data={articleData} />
);

export const ArticlePageWithRelatedContent = props => (
  <ComponentWithContext {...props} data={articleDataWithRelatedContent} />
);

export const ArticlePageWithSingleRelatedContent = props => (
  <ComponentWithContext {...props} data={articleDataWithSingleRelatedContent} />
);

export const ArticlePageWithPodcastPromo = props => (
  <ComponentWithContext
    {...props}
    data={articleDataWithPodcastPromo}
    service="russian"
    podcastEnabled
  />
);

export const ArticlePageWithPodcastPromoRightToLeft = props => (
  <ComponentWithContext
    {...props}
    data={articleDataWithPodcastPromo}
    service="arabic"
    podcastEnabled
  />
);
