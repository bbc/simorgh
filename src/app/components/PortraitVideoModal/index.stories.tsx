import React from 'react';
import PortraitVideoModal from '.';
import items from './fixture';
import readme from './README.md';
import metadata from './metadata.json';

const Component = () => {
  return (
    <PortraitVideoModal
      items={items}
      selectedVideoIndex={0}
      onClose={() => null}
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
