import { PageTypes, Services } from '#app/models/types/global';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import MediaLoaderComponent from '.';
import {
  aresMediaBlocks,
  aresMediaPortraitBlocks,
  videoClipMediaBlocks,
  legacyMediaBlock,
  aresMediaBlockWithTranscript,
} from './fixture';
import readme from './README.md';
import { MediaBlock } from './types';

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
  argTypes: {
    hasTranscript: {
      options: [true, false],
      control: { type: 'radio' },
    },
  },
  parameters: {
    docs: { readme },
  },
};

export const MediaLoaderWithTranscript = () => (
  <Component
    service="pidgin"
    pageType="article"
    blocks={aresMediaBlockWithTranscript as MediaBlock[]}
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
