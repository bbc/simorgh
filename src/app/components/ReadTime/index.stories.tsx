import { ReadTimeArticleExperiment as ReadTime } from '.';
import readme from './README.md';
import metadata from './metadata.json';

const Component = ({ readTime }: { readTime: number }) => (
  <ReadTime readTimeValue={readTime} />
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Example = () => (
  <ReadTime readTimeValue={7} readTimeVariant="foo" />
);
export const OneMinuteReadTime = () => (
  <ReadTime readTimeValue={1} readTimeVariant="foo" />
);
