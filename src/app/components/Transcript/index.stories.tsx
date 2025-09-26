import React from 'react';
import ThemeProvider from '#app/components/ThemeProvider';
import { PageTypes } from '#app/models/types/global';
import Transcript from '.';
import transcriptFixture from './fixture.json';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE, ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import metadata from './metadata.json';

type Props = {
  pageType: PageTypes;
};

const ComponentWithContext = ({ pageType }: Props) => {
  return (
    <RequestContextProvider
      isAmp={false}
      isApp={false}
      pageType={pageType}
      service="news"
      pathname=""
    >
      <ThemeProvider service="news">
        <Transcript transcript={transcriptFixture} title="Title of my video" />
      </ThemeProvider>
    </RequestContextProvider>
  );
};

export default {
  title: 'Components/Transcript',
  ComponentWithContext,
  parameters: {
    metadata,
    backgrounds: {
      default: 'Optimo',
    },
  },
};

export const ArticlePageTranscript = () => (
  <ComponentWithContext pageType={ARTICLE_PAGE} />
);

export const MediaArticlePageTranscript = () => (
  <ComponentWithContext pageType={MEDIA_ARTICLE_PAGE} />
);
