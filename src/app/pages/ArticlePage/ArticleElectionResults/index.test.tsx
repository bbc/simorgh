import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import electionResultsFixture from '#app/components/ElectionResults/fixtures';
import ArticleElectionResults from '.';

const ELECTION_THING_ID = 'c5f2a1d4-0000-4000-8000-000000000001';

const electionAboutTags = [
  { thingId: ELECTION_THING_ID, thingLabel: 'Election 2027' },
] as Tag[];

const otherAboutTags = [
  { thingId: 'c5f2a1d4-0000-4000-8000-000000000002', thingLabel: 'Football' },
] as Tag[];

const taggings: MetadataTaggings = [];

const sensitiveTaggings: MetadataTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/editorialSensitivity',
    value:
      'http://www.bbc.co.uk/things/f2b5dd0e-dda0-454c-893d-792d46ff48c3#id',
  },
];

const renderWithConfig = ({
  aboutTags = electionAboutTags,
  articleTaggings = taggings,
  results = electionResultsFixture,
  toggleEnabled = true,
  isLite = false,
  isAmp = false,
}: {
  aboutTags?: Tag[];
  articleTaggings?: MetadataTaggings;
  results?: typeof electionResultsFixture | null;
  toggleEnabled?: boolean;
  isLite?: boolean;
  isAmp?: boolean;
} = {}) =>
  render(
    <ServiceContext.Provider
      value={
        {
          service: 'news',
          translations: {},
          electionResults: { thingIds: [ELECTION_THING_ID] },
        } as unknown as ServiceConfig
      }
    >
      <ArticleElectionResults
        results={results}
        aboutTags={aboutTags}
        taggings={articleTaggings}
      />
    </ServiceContext.Provider>,
    {
      toggles: { electionBanner: { enabled: toggleEnabled } },
      isLite,
      isAmp,
    },
  );

describe('ArticleElectionResults', () => {
  it('should render when the article is tagged with a configured election', () => {
    renderWithConfig();

    expect(screen.getByTestId('article-election-results')).toBeInTheDocument();
  });

  it('should not render when no about-tag matches', () => {
    renderWithConfig({ aboutTags: otherAboutTags });

    expect(
      screen.queryByTestId('article-election-results'),
    ).not.toBeInTheDocument();
  });

  it('should not render when the BFF sends no results', () => {
    renderWithConfig({ results: null });

    expect(
      screen.queryByTestId('article-election-results'),
    ).not.toBeInTheDocument();
  });

  it('should not render when the electionBanner toggle is off', () => {
    renderWithConfig({ toggleEnabled: false });

    expect(
      screen.queryByTestId('article-election-results'),
    ).not.toBeInTheDocument();
  });

  it('should not render on editorially sensitive articles', () => {
    renderWithConfig({ articleTaggings: sensitiveTaggings });

    expect(
      screen.queryByTestId('article-election-results'),
    ).not.toBeInTheDocument();
  });

  it.each([
    ['Lite', { isLite: true }],
    ['AMP', { isAmp: true }],
  ])('should not render on %s', (_, options) => {
    renderWithConfig(options);

    expect(
      screen.queryByTestId('article-election-results'),
    ).not.toBeInTheDocument();
  });
});
