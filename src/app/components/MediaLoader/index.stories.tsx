import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import MediaLoaderComponent from '.';
import ThemeProvider from '../ThemeProvider';
import md from './README.md';
import { aresMediaBlocks, clipMediaBlocks } from './fixture';
import { MediaBlock } from './types';

type Props = {
  pageType: PageTypes;
  service: Services;
  blocks: MediaBlock[];
};

const Component = ({ service, pageType, blocks }: Props) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      id="testID"
      isAmp={false}
      isApp={false}
      pageType={pageType}
      pathname=""
      service={service}
      counterName="testCounterName"
    >
      <ThemeProvider service={service}>
        <MediaLoaderComponent blocks={blocks} />
      </ThemeProvider>
    </RequestContextProvider>
  </ServiceContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  parameters: {
    docs: {
      component: {
        title: 'MediaLoader',
      },
      page: md,
    },
  },
};

export const ArticleMediaLoader = () => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaBlocks as MediaBlock[]}
  />
);

export const LivePageMediaLoader = () => (
  <Component
    service="pidgin"
    pageType="live"
    blocks={clipMediaBlocks as MediaBlock[]}
  />
);
