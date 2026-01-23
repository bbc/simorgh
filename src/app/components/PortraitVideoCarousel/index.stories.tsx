import { StoryArgs, StoryProps } from '../../models/types/storybook';
import PortraitVideoCarousel from '.';
import readme from './README.md';
import metadata from './metadata.json';
import portraitVideoFixture from './fixture';

// Suppressing for now but might require this later
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends StoryProps {}

const Component = (_: StoryArgs, __: Props) => {
  return (
    <PortraitVideoCarousel
      title={portraitVideoFixture.title}
      blocks={portraitVideoFixture.blocks}
      eventTrackingData={{
        componentName: 'portrait-video-carousel',
      }}
    />
  );
};

export default {
  title: 'Components/PortraitVideoCarousel',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = Component;
