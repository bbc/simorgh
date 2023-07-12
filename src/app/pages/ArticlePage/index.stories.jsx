import React from 'react';
import { MemoryRouter } from 'react-router';
import { withKnobs } from '@storybook/addon-knobs';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { UserContextProvider } from '#contexts/UserContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import articleData from '#data/news/articles/c0g992jmmkko.json';
import articleDataWithRelatedContent from '#data/afrique/articles/c7yn6nznljdo.json';
import articleDataWithSingleRelatedContent from '#data/afrique/articles/cz216x22106o.json';
import articleDataWithPodcastPromo from '#data/russian/articles/c61q94n3rm3o.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ArticlePageComponent from './ArticlePage';
import latin from '#app/components/ThemeProvider/fontScripts/latin';
import { service } from '#app/lib/config/services/news';

const PageWithOptimizely = withOptimizelyProvider(ArticlePageComponent);
const Page = withPageWrapper(PageWithOptimizely);

const serviceContextMock = {
  ...service.default,
  service: 'news',
  script: latin,
  dir: 'ltr',
  podcastPromo: {
    title: 'Podcast',
    brandTitle: 'Sounds of the 90s with Fearne Cotton',
    brandDescription:
      'Join Fearne for a nostalgia drenched celebration of the best music and pop culture from the 90s.',
    image: {
      src: 'https://ichef.bbci.co.uk/images/ic/400x400/p098vtc3.jpg',
      alt: 'Picture of Spice Girls',
    },
    linkLabel: {
      href: 'https://www.bbc.co.uk/sounds/brand/m000gkf5',
      text: 'Episodes',
    },
    skipLink: {
      text: 'Skip podcast and continue reading',
      endTextVisuallyHidden: 'End of story podcast',
    },
  },
};

const ComponentWithContext = ({
  data: { data },
  service = 'news',
  podcastEnabled = false,
  value,
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
      <ServiceContext.Provider value={serviceContextMock}>
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
      </ServiceContext.Provider>
    </ToggleContextProvider>
  );
};

export default {
  Component: ComponentWithContext,
  title: 'Pages/Article Page',
  decorators: [withKnobs],
  parameters: { layout: 'fullscreen' },
};

export const ArticlePageWithPodcastNews = props => (
  <ComponentWithContext
    {...props}
    data={articleDataWithPodcastPromo}
    service="arabic"
    podcastEnabled
  />
);
