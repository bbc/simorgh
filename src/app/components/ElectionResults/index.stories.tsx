import ElectionResults from '.';
import wireframeFixture from './fixtures';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Components/ElectionResults',
  component: ElectionResults,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Default = () => (
  <ElectionResults results={wireframeFixture} />
);
