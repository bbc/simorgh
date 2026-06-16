import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import TopicMessageBanner from '.';

const BRAZIL_ELECTION_THING_ID = 'b91eaef4-fdf2-47a6-b3ec-05b5a55a4843';
const BRAZIL_WORLD_CUP_THING_ID = 'f30c1edd-b1de-449c-a57e-1003edc03174';

const brazilElectionAboutTags = [
  { thingId: BRAZIL_ELECTION_THING_ID, thingLabel: 'Eleições 2026' },
] as Tag[];

const brazilWorldCupAboutTags = [
  { thingId: BRAZIL_WORLD_CUP_THING_ID, thingLabel: 'Copa do Mundo 2026' },
] as Tag[];

const brazilBothAboutTags = [
  { thingId: BRAZIL_WORLD_CUP_THING_ID, thingLabel: 'Copa do Mundo 2026' },
  { thingId: BRAZIL_ELECTION_THING_ID, thingLabel: 'Eleições 2026' },
] as Tag[];

const mockTaggings: MetadataTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
    value:
      'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
  },
];

const sensitiveTagging: MetadataTaggings = [
  ...mockTaggings,
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/editorialSensitivity',
    value:
      'http://www.bbc.co.uk/things/f2b5dd0e-dda0-454c-893d-792d46ff48c3#id',
  },
];

describe('TopicMessageBanner', () => {
  it('renders the Brazil election message banner when election thingId matches', () => {
    const { getByRole } = render(
      <TopicMessageBanner
        aboutTags={brazilElectionAboutTags}
        taggings={mockTaggings}
      />,
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByRole('heading', {
        level: 2,
        name: 'Quem está à frente nas pesquisas para presidente?',
      }),
    ).toBeInTheDocument();
  });

  it('renders the World Cup message banner when world cup thingId matches', () => {
    const { getByRole } = render(
      <TopicMessageBanner
        aboutTags={brazilWorldCupAboutTags}
        taggings={mockTaggings}
      />,
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByRole('heading', {
        level: 2,
        name: 'Copa do Mundo 2026 – tabela completa',
      }),
    ).toBeInTheDocument();
  });

  it('prefers election banner when both IDs are present', () => {
    const { getByRole, queryByRole } = render(
      <TopicMessageBanner aboutTags={brazilBothAboutTags} taggings={mockTaggings} />,
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByRole('heading', {
        level: 2,
        name: 'Quem está à frente nas pesquisas para presidente?',
      }),
    ).toBeInTheDocument();

    expect(
      queryByRole('heading', {
        level: 2,
        name: 'Copa do Mundo 2026 – tabela completa',
      }),
    ).not.toBeInTheDocument();
  });

  it('does not render in lite mode', () => {
    const { queryByTestId } = render(
      <TopicMessageBanner
        aboutTags={brazilElectionAboutTags}
        taggings={mockTaggings}
      />,
      {
        isLite: true,
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(queryByTestId('topic-message-banner')).not.toBeInTheDocument();
  });

  it('does not render when sensitivity tagging exists', () => {
    const { queryByTestId } = render(
      <TopicMessageBanner
        aboutTags={brazilElectionAboutTags}
        taggings={sensitiveTagging}
      />,
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(queryByTestId('topic-message-banner')).not.toBeInTheDocument();
  });
});
