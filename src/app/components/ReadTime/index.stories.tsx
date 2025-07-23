import React from 'react';
import ReadTime from '.';
import readme from './README.md';

const Component = ({ readTimeValue }: { readTimeValue: number }) => (
  <ReadTime readTimeValue={readTimeValue} />
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
  },
};

export const ExampleReadTimeOver1Minute = () => <ReadTime readTimeValue={7} />;
export const Example1MinuteReadTime = () => <ReadTime readTimeValue={1} />;
