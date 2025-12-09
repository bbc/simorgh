import PortraitVideoModal from '.';
import blocks from './fixture';
import readme from './README.md';
import metadata from './metadata.json';

const Component = () => {
  return (
    <PortraitVideoModal
      blocks={blocks}
      selectedVideoIndex={0}
      onClose={() => null}
      eventTrackingData={{
        componentName: 'portrait-video-modal',
      }}
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
