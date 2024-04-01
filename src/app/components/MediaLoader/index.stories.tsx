import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import MediaLoaderComponent from '.';
import { aresMediaBlocks, clipMediaBlocks } from './fixture';
import { MediaBlock } from './types';
import readme from './README.md';

type Props = {
  pageType: PageTypes;
  service: Services;
  blocks: MediaBlock[];
};

const Component = ({ service, pageType, blocks }: Props) => (
  <RequestContextProvider
    id="testID"
    isAmp={false}
    isApp={false}
    pageType={pageType}
    pathname=""
    service={service}
    counterName="testCounterName"
  >
    <MediaLoaderComponent blocks={blocks} />
  </RequestContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  parameters: {
    docs: { readme },
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
