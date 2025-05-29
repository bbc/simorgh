import React from 'react';
import { StoryArgs, StoryProps } from '../../models/types/storybook';
import PortraitVideoModal from '.';
import portraitVideoFixture from '../PortraitVideoCarousel/fixture';
import readme from './README.md';
import metadata from './metadata.json';

// Suppressing for now but might require this later
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends StoryProps {}

const Component = (_: StoryArgs, __: Props) => {
  const flattenedItems = portraitVideoFixture.items.map(item => ({
    ...item,
    ...item.video.version,
    images: item.images,
  }));
  return (
    <PortraitVideoModal
      items={flattenedItems}
      initialVideoIndex={0}
      onClose={() => console.log('Modal closed')}
    />
  );
};

export default {
  title: 'Components/PortraitVideoModal',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = Component;
