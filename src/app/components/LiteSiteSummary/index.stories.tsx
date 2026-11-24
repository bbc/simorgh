import LiteSiteSummary from '.';
import metadata from './metadata.json';
import readme from './README.md';

export const Component = () => <LiteSiteSummary />;

export default {
  title: 'Components/Lite Site Summary',
  Component,
  parameters: {
    metadata,
    docs: { readme },
  },
};
