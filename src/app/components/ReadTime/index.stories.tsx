import React from 'react';
import ReadTime from '.';
import readme from './README.md';
import metadata from './metadata.json';

const Component = ({ readTime }: { readTime: number }) => (
  <ReadTime readTime={readTime} />
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = () => <ReadTime readTime={7} />;
export const OneMinuteReadTime = () => <ReadTime readTime={1} />;
