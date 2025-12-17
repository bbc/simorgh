import ReadTimeArticle from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import readme from './README.md';
import metadata from './metadata.json';

// Example for pidgin service and default variant
const service = 'pidgin';
const variant = 'default';

const Component = ({ readTime }: { readTime: number }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <ReadTimeArticle readTimeValue={readTime} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const SevenMinuteReadTime = () => <Component readTime={7} />;
export const OneMinuteReadTime = () => <Component readTime={1} />;
