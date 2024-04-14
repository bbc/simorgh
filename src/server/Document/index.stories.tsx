import React, { PropsWithChildren } from 'react';
import { renderToString } from 'react-dom/server';
import LitePageRenderer from '#server/Document/Renderers/LiteRenderer';

import ArticlePageComponent from '#app/pages/ArticlePage/ArticlePage';
import articleData from '#data/news/articles/c0g992jmmkko.json';

import FrontPageComponent from '#app/pages/FrontPage/FrontPage';
import { data as newsData } from '#data/news/frontpage/index.json';

import TopicPageComponent from '#app/pages/TopicPage/TopicPage';
import defaultTopic from '#data/mundo/topics/c1en6xwmpkvt.json';

import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { Services, Variants } from '#app/models/types/global';
import { StoryArgs, StoryProps } from '#app/models/types/storybook';

type Props = {
  variant?: Variants;
  service?: Services;
};

const Component = ({
  children,
  variant,
  service = 'news',
}: PropsWithChildren<Props>) => {
  const html = renderToString(
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: true,
        },
      }}
    >
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          service={service}
          variant={variant}
          pageType="article"
          isAmp={false}
          pathname="/"
        >
          {children}
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>,
  );

  // @ts-expect-error - Only 'html' is required for Storybook
  return <LitePageRenderer html={html} />;
};

export default {
  title: 'Lite Renderer/Pages',
  Component,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disable: true },
  },
};

export const ArticlePage = (_: StoryArgs, { service, variant }: StoryProps) => {
  const Page = withPageWrapper(ArticlePageComponent);

  return (
    <Component service={service} variant={variant}>
      <Page pageData={{ ...articleData.data.article }} />
    </Component>
  );
};

export const FrontPage = (_: StoryArgs, { service, variant }: StoryProps) => {
  const Page = withPageWrapper(FrontPageComponent);
  return (
    <Component service={service} variant={variant}>
      <Page pageData={{ ...newsData.article }} />
    </Component>
  );
};

export const TopicPage = (_: StoryArgs, { service, variant }: StoryProps) => {
  const Page = withPageWrapper(TopicPageComponent);
  return (
    <Component service={service} variant={variant}>
      <Page pageData={{ ...defaultTopic.data }} />
    </Component>
  );
};
