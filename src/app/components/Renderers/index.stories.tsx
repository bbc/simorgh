import React, { PropsWithChildren } from 'react';
import { renderToString } from 'react-dom/server';
import LitePageRenderer from '#server/Document/LiteRenderer';
import ArticlePageComponent from '#app/pages/ArticlePage/ArticlePage';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import articleData from '#data/news/articles/c0g992jmmkko.json';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { Services, Variants } from '#app/models/types/global';

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
  title: 'Renderers/Lite',
  Component,
  parameters: {
    layout: 'fullscreen',
    chromatic: { disable: true },
  },
};

export const ArticlePage = () => {
  const Page = withPageWrapper(ArticlePageComponent);
  return (
    <Component>
      <Page pageData={{ ...articleData.data.article }} />
    </Component>
  );
};
