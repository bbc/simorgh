import React from 'react';
import MaskedImage from '.';
import metadata from './metadata.json';

const Component = () => {
  return (
    <MaskedImage
      imageUrl="https://ichef.bbci.co.uk/ace/standard/480/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
      imageUrlTemplate="https://ichef.bbci.co.uk/ace/standard/{width}/cpsdevpb/1d5b/test/5f969ec0-c4d8-11ed-8319-9b394d8ed0dd.jpg"
      imageWidth={660}
    />
  );
};

export default {
  title: 'Components/Masked Image',
  Component,
  parameters: {
    chromatic: { disable: false },
    metadata,
  },
};

export const Example = Component;
