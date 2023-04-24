import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/hausa/articles/cw43vy8zdjvo.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import MediaArticlePageComponent from './MediaArticlePage';

const PageWithOptimizely = withOptimizelyProvider(MediaArticlePageComponent);
const Page = withPageWrapper(PageWithOptimizely);

// eslint-disable-next-line react/prop-types
const ComponentWithContext = ({ data: { data } }) => {
  return (
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
          pageType={MEDIA_ARTICLE_PAGE}
          service="news"
        >
          <UserContextProvider>
            <MemoryRouter>
              <Page
                pageData={{
                  ...data.article,
                  secondaryColumn: data.secondaryData,
                }}
                mostReadEndpointOverride="./data/news/mostRead/index.json"
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
  title: 'Pages/Media Article Page',
  decorators: [withKnobs],
  parameters: { layout: 'fullscreen' },
};

export const MediaArticlePage = props => (
  <ComponentWithContext {...props} data={articleData} />
);
