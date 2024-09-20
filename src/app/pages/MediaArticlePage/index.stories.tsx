import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import ThemeProvider from '#app/components/ThemeProvider';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { UserContextProvider } from '../../contexts/UserContext';
import { MEDIA_ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import articleData from '../../../../data/hausa/articles/cw43vy8zdjvo.json';
import tamilArticle from '../../../../data/tamil/articles/c84m2jl4dpzo.json';
import pidginArticle from '../../../../data/pidgin/articles/cw0x29n2pvqo.json';
import arabicLiveTv from '../../../../data/arabic/cpsAssets/media-49522519.json';
import withPageWrapper from '../../legacy/containers/PageHandlers/withPageWrapper';
import withOptimizelyProvider from '../../legacy/containers/PageHandlers/withOptimizelyProvider';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MediaArticlePageComponent from './MediaArticlePage';

const PageWithOptimizely = withOptimizelyProvider(MediaArticlePageComponent);
const Page = withPageWrapper(PageWithOptimizely);

// @ts-expect-error - passing in partial data
const ComponentWithContext = ({ data: { data }, isLite }) => {
  return (
    <ToggleContextProvider
      toggles={{
        eventTracking: { enabled: true },
        frostedPromo: { enabled: true, value: 1 },
      }}
    >
      <ServiceContextProvider service="news">
        <RequestContextProvider
          isAmp={false}
          isApp={false}
          isLite={isLite}
          pageType={MEDIA_ARTICLE_PAGE}
          service="news"
          pathname="/news/articles/c000000000o"
          isUK
          id="c000000000o"
        >
          <UserContextProvider>
            <ThemeProvider service="news">
              <MemoryRouter>
                <Page
                  pageData={{
                    ...data.article,
                    secondaryColumn: data.secondaryData,
                  }}
                />
              </MemoryRouter>
            </ThemeProvider>
          </UserContextProvider>
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component: ComponentWithContext,
  title: 'Pages/Media Article Page',
  parameters: { layout: 'fullscreen' },
};

export const MediaArticlePage = (_: StoryArgs, { isLite }: StoryProps) => (
  <ComponentWithContext data={articleData} isLite={isLite} />
);

export const MediaArticlePageWithLatestMediaImages = (
  _: StoryArgs,
  { isLite }: StoryProps,
) => <ComponentWithContext data={pidginArticle} isLite={isLite} />;

export const MediaArticlePageWithSingleLatestMedia = (
  _: StoryArgs,
  { isLite }: StoryProps,
) => <ComponentWithContext data={tamilArticle} isLite={isLite} />;

export const MediaArticlePageWithLiveTv = (
  _: StoryArgs,
  { isLite }: StoryProps,
) => <ComponentWithContext data={arabicLiveTv} isLite={isLite} />;
