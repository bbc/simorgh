import React from 'react';
import ReadTime from '.';
import readme from './README.md';

const Component = ({ readTime }: { readTime: number }) => (
  <ReadTime readTime={readTime} />
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const ExampleReadTimeOver1Minute = () => <ReadTime readTime={7} />;
export const Example1MinuteReadTime = () => <ReadTime readTime={1} />;
