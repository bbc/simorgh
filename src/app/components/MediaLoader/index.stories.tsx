import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import MediaLoaderComponent from '.';
import {
  aresMediaBlocks,
  aresMediaPortraitBlocks,
  clipMediaBlocks,
  legacyMediaBlock,
} from './fixture';
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

export const Landscape = () => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaBlocks as MediaBlock[]}
  />
);

export const Portrait = () => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaPortraitBlocks as MediaBlock[]}
  />
);

export const LegacyMediaLoader = () => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={legacyMediaBlock as MediaBlock[]}
  />
);

export const LivePageMedia = () => (
  <Component
    service="pidgin"
    pageType="live"
    blocks={clipMediaBlocks as MediaBlock[]}
  />
);
