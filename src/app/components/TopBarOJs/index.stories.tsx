import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import {
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
} from './helpers/fixtureData';
import metadata from './metadata.json';
import readme from './README.md';
import TopBarOJs from '.';
import { StoryArgs } from '../../models/types/storybook';

interface Props {
  blocks: TopStoryItem[];
  id?: string;
}

const Component = ({ blocks }: Props) => {
  return <TopBarOJs blocks={blocks} />;
};

export default {
  title: 'Components/TopBarOJs',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = (_: StoryArgs, globalArgs: Props) => {
  const { id } = globalArgs;
  // @ts-expect-error partial data for storybook
  return <Component blocks={topStoriesBlocks} id={id} />;
};

export const OJTopBarTopStoriesWithLiveLabel = (
  _: StoryArgs,
  globalArgs: Props,
) => {
  const { id } = globalArgs;
  // @ts-expect-error partial data for storybook
  return <Component blocks={topStoriesBlocksWithLiveItem} id={id} />;
};
