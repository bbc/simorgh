import React from 'react';
import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { Stages } from '#app/hooks/useExperimentHook';
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
  experimentStage?: Stages;
};

const Component = ({ service, pageType, blocks, experimentStage }: Props) => (
  <RequestContextProvider
    id="testID"
    isAmp={false}
    isApp={false}
    pageType={pageType}
    pathname=""
    service={service}
  >
    <MediaLoaderComponent blocks={blocks} experimentStage={experimentStage} />
  </RequestContextProvider>
);

export default {
  title: 'Components/MediaLoader',
  Component,
  argTypes: {
    experimentStage: {
      options: [Stages.DEFAULT, Stages.STAGE_1, Stages.STAGE_2, Stages.STAGE_3],
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: { readme },
  },
};

export const ExperimentMediaLoader = ({ experimentStage }: Props) => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaBlocks as MediaBlock[]}
    experimentStage={experimentStage}
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
