import React from 'react';
import Byline from '.';

interface Props {
  authorName: string;
  jobRole: string;
}

const Component = ({ authorName, jobRole }: Props) => {
  return <Byline authorName={authorName} jobRole={jobRole} />;
};

export default {
  title: 'Components/Byline',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = () => (
  <Component authorName="Dario" jobRole="Software Engineer" />
);
