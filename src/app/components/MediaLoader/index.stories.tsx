import { RequestContextProvider } from '#app/contexts/RequestContext';
import { Mode } from '#app/hooks/useDeterminePlaceholderMode';
import { PageTypes, Services } from '#app/models/types/global';
import React from 'react';
import MediaLoaderComponent from '.';
import {
  aresMediaBlocks,
  aresMediaPortraitBlocks,
  clipMediaBlocks,
  legacyMediaBlock,
} from './fixture';
import readme from './README.md';
import { MediaBlock } from './types';

type Props = {
  pageType: PageTypes;
  service: Services;
  blocks: MediaBlock[];
  placeholderMode?: Mode;
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
    <MediaLoaderComponent
      blocks={blocks}
      forcePlaceholderMode={placeholderMode}
    />
  </RequestContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  argTypes: {
    placeholderMode: {
      options: [Mode.SHOW_SUSTAINABILITY_MSG, Mode.DEFAULT],
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
    blocks={clipMediaBlocks as MediaBlock[]}
  />
);
