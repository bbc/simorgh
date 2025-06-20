import { RequestContextProvider } from '#app/contexts/RequestContext';
import { PlaceholderMode } from '#app/hooks/useDeterminePlaceholderMode';
import { PageTypes, Services } from '#app/models/types/global';
import React from 'react';
import MediaLoaderComponent from '.';
import {
  aresMediaBlocks,
  aresMediaPortraitBlocks,
  videoClipMediaBlocks,
  legacyMediaBlock,
} from './fixture';
import readme from './README.md';
import { MediaBlock } from './types';

type Props = {
  pageType: PageTypes;
  service: Services;
  blocks: MediaBlock[];
  placeholderMode?: PlaceholderMode;
};

const Component = ({ service, pageType, blocks, placeholderMode }: Props) => (
  <RequestContextProvider
    id="testID"
    isAmp={false}
    isApp={false}
    pageType={pageType}
    pathname=""
    service={service}
  >
    <MediaLoaderComponent blocks={blocks} placeholderMode={placeholderMode} />
  </RequestContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  argTypes: {
    placeholderMode: {
      options: [
        PlaceholderMode.SHOW_SUSTAINABILITY_MSG,
        PlaceholderMode.DEFAULT,
        PlaceholderMode.NO_JS,
      ],
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: { readme },
  },
};

export const MediaLoaderWithTranscript = ({ placeholderMode }: Props) => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaBlocks as MediaBlock[]}
    placeholderMode={placeholderMode}
  />
);

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
    blocks={videoClipMediaBlocks as MediaBlock[]}
  />
);
