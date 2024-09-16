import React from 'react';
import ThemeProvider from '#components/ThemeProvider';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import articleData from '#data/news/articles/c0g992jmmkko.json';
import articleDataBurmese from '#data/burmese/articles/cn0exdy1jzvo.json';
import articleDataWithRelatedContent from '#data/afrique/articles/c7yn6nznljdo.json';
import articleDataWithSingleRelatedContent from '#data/afrique/articles/cz216x22106o.json';
import articleDataWithPodcastPromo from '#data/russian/articles/c61q94n3rm3o.json';
import articleNewsWithPodcastPromo from '#data/news/articles/crkxdvxzwxk2.json';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '#containers/PageHandlers/withOptimizelyProvider';
import ArticlePageComponent from './ArticlePage';
import { service } from '#app/lib/config/services/news';
import latin from '#components/ThemeProvider/fontScripts/latin';

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
      text: 'Skip podcast promotion and continue reading',
      endTextVisuallyHidden: 'End of podcast promotion',
    },
  },
};

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
          isApp={false}
          pageType={ARTICLE_PAGE}
          service={service}
          pathname="/news/articles/c000000000o"
          id="c000000000o"
          isUK
        >
          <ThemeProvider service={service}>
            <Page
              pageData={{
                ...data.article,
                secondaryColumn: data.secondaryData,
                mostRead: data.secondaryData.mostRead,
              }}
            />
          </ThemeProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

const ComponentWithServiceContext = ({
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
      <ServiceContext.Provider value={{ ...serviceContextMock, service }}>
        <RequestContextProvider
          isAmp={false}
          isApp={false}
          pageType={ARTICLE_PAGE}
          service={service}
          pathname="/news/articles/c000000000o"
          id="c000000000o"
          isUK
        >
          <ThemeProvider service={service}>
            <Page
              pageData={{
                ...data.article,
                secondaryColumn: data.secondaryData,
                mostRead: data.secondaryData.mostRead,
              }}
            />
          </ThemeProvider>
        </RequestContextProvider>
      </ServiceContext.Provider>
    </ToggleContextProvider>
  );
};

export default {
  Component: ComponentWithContext,
  title: 'Pages/Article Page',
  parameters: { layout: 'fullscreen' },
};

export const ArticlePage = () => <ComponentWithContext data={articleData} />;
export const Burmese = () => (
  <ComponentWithServiceContext data={articleDataBurmese} service="burmese" />
);

export const ArticlePageWithRelatedContent = () => (
  <ComponentWithContext data={articleDataWithRelatedContent} />
);

export const ArticlePageWithSingleRelatedContent = () => (
  <ComponentWithContext data={articleDataWithSingleRelatedContent} />
);

export const ArticlePageWithPodcastPromo = () => (
  <ComponentWithContext
    data={articleDataWithPodcastPromo}
    service="russian"
    podcastEnabled
  />
);

export const ArticlePageWithPodcastPromoRightToLeft = () => (
  <ComponentWithContext
    data={articleDataWithPodcastPromo}
    service="arabic"
    podcastEnabled
  />
);

export const ArticlePageWithPodcastNews = () => (
  <ComponentWithServiceContext
    data={articleNewsWithPodcastPromo}
    service="news"
    podcastEnabled
  />
);
