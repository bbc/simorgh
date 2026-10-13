import {
  render,
  screen,
  within,
} from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import electionResultsFixture from './fixtures';
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

// TODO: the skipped tests cover checks ArticleElectionResults doesn't do yet
// (topic tag, electionBanner toggle, editorial sensitivity, AMP and Lite).
// Un-skip them when those checks are added back.
describe('ArticleElectionResults', () => {
  it('should render when the article is tagged with a configured election', () => {
    renderWithConfig();

    expect(
      screen.getByTestId('election-results-wireframe'),
    ).toBeInTheDocument();
  });

  it.skip('should not render when no about-tag matches', () => {
    renderWithConfig({ aboutTags: otherAboutTags });

    expect(
      screen.queryByTestId('election-results-wireframe'),
    ).not.toBeInTheDocument();
  });

  it('should not render when the BFF sends no results', () => {
    renderWithConfig({ results: null });

    expect(
      screen.queryByTestId('election-results-wireframe'),
    ).not.toBeInTheDocument();
  });

  it.skip('should not render when the electionBanner toggle is off', () => {
    renderWithConfig({ toggleEnabled: false });

    expect(
      screen.queryByTestId('election-results-wireframe'),
    ).not.toBeInTheDocument();
  });

  it.skip('should not render on editorially sensitive articles', () => {
    renderWithConfig({ articleTaggings: sensitiveTaggings });

    expect(
      screen.queryByTestId('election-results-wireframe'),
    ).not.toBeInTheDocument();
  });

  it.skip.each([
    ['Lite', { isLite: true }],
    ['AMP', { isAmp: true }],
  ])('should not render on %s', (_, options) => {
    renderWithConfig(options);

    expect(
      screen.queryByTestId('election-results-wireframe'),
    ).not.toBeInTheDocument();
  });

  describe('banner content', () => {
    it('should render the title as a heading', () => {
      renderWithConfig();

      expect(
        screen.getByRole('heading', { name: 'Presidential election 2027' }),
      ).toBeInTheDocument();
    });

    it('should render one row per candidate with their party', () => {
      renderWithConfig();

      expect(screen.getAllByRole('listitem')).toHaveLength(4);
      expect(screen.getByText('Amina Example (APX)')).toBeInTheDocument();
      expect(screen.getByText('Dele Mock (PDX)')).toBeInTheDocument();
    });

    it('should render each candidate percentage', () => {
      renderWithConfig();

      ['34%', '29%', '24%', '13%'].forEach(percentage =>
        expect(screen.getByText(percentage)).toBeInTheDocument(),
      );
    });

    it('should size bars relative to the leading candidate', () => {
      renderWithConfig();

      const [leader, second] = screen
        .getAllByRole('listitem')
        .map(item => item.querySelector('[style]') as HTMLElement);

      expect(leader.style.getPropertyValue('--bar-width')).toBe('100');
      expect(Number(second.style.getPropertyValue('--bar-width'))).toBeCloseTo(
        (29 / 34) * 100,
      );
    });

    it('should colour each bar with the party colour', () => {
      renderWithConfig();

      const leader = screen
        .getAllByRole('listitem')[0]
        .querySelector('[style]') as HTMLElement;

      expect(leader.style.getPropertyValue('--party-colour')).toBe('#2E8B57');
    });

    it('should render how many states have been counted', () => {
      renderWithConfig();

      expect(screen.getByText('18 of 36 states counted')).toBeInTheDocument();
    });

    it('should link the results button to the CTA', () => {
      renderWithConfig();

      expect(
        screen.getByRole('link', { name: 'Full results' }),
      ).toHaveAttribute('href', 'https://www.bbc.com/news/election-results');
    });

    it('should render the How this election works button', () => {
      renderWithConfig();

      expect(
        screen.getByRole('button', { name: /How this election works/ }),
      ).toBeInTheDocument();
    });

    it('should render when the results were last updated', () => {
      renderWithConfig();

      expect(
        screen.getByText(/^Last updated: \d{2}:\d{2}/),
      ).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should render the title as a level 2 heading', () => {
      renderWithConfig();

      expect(
        screen.getByRole('heading', {
          level: 2,
          name: 'Presidential election 2027',
        }),
      ).toBeInTheDocument();
    });

    it('should present the candidates as a list', () => {
      renderWithConfig();

      const list = screen.getByRole('list');

      expect(within(list).getAllByRole('listitem')).toHaveLength(4);
    });

    it('should give each link an accessible name', () => {
      renderWithConfig();

      expect(
        screen.getByRole('link', { name: /LIVE\s+updates/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('link', { name: 'Full results' }),
      ).toBeInTheDocument();
    });

    it('should hide the decorative live dot and arrow from screen readers', () => {
      const { container } = renderWithConfig();

      const hidden = container.querySelectorAll('[aria-hidden="true"]');

      expect(hidden).toHaveLength(2);
      expect(
        screen.getByRole('button', { name: 'How this election works' }),
      ).toBeInTheDocument();
    });

    it('should not submit a form from the How this election works button', () => {
      renderWithConfig();

      expect(
        screen.getByRole('button', { name: /How this election works/ }),
      ).toHaveAttribute('type', 'button');
    });
  });
});
