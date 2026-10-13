import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ArticleElectionResults from '.';
import electionResultsFixture from './fixtures';
import readme from './README.md';
import metadata from './metadata.json';

export default {
  title: 'Pages/Article Page/ArticleElectionResults',
  component: ArticleElectionResults,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Default = () => (
  <ServiceContextProvider service="hausa">
    <ArticleElectionResults results={electionResultsFixture} />
  </ServiceContextProvider>
);

export const RightToLeft = () => (
  <ServiceContextProvider service="arabic">
    <ArticleElectionResults results={electionResultsFixture} />
  </ServiceContextProvider>
);
