import type { ComponentProps } from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { MetadataTaggings } from '#app/models/types/metadata';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import ArticleMessageBanner from '.';

const BRAZIL_ELECTION_THING_ID = 'b91eaef4-fdf2-47a6-b3ec-05b5a55a4843';
const BRAZIL_WORLD_CUP_THING_ID = 'f30c1edd-b1de-449c-a57e-1003edc03174';
const ELECTION_LINK_HREF = '/portuguese/articles/c61m430mdek2o';

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

const mockServiceContext = {
  articleMessageBanners: [
    {
      thingIds: [BRAZIL_ELECTION_THING_ID],
      heading: 'Eleições 2026: veja como foi a votação',
      linkHref: ELECTION_LINK_HREF,
      linkText: 'Ver resultados',
    },
    {
      thingIds: [BRAZIL_WORLD_CUP_THING_ID],
      heading: 'Copa do Mundo 2026 – tabela completa',
      linkHref: '/portuguese/topics/copa-do-mundo-2026',
      linkText: 'Ver tabela',
    },
  ],
} as ServiceConfig;

const renderBanner = (
  props: ComponentProps<typeof ArticleMessageBanner>,
  options?: Parameters<typeof render>[1],
  serviceContext: ServiceConfig = mockServiceContext,
) =>
  render(
    <ServiceContext.Provider value={serviceContext}>
      <ArticleMessageBanner {...props} />
    </ServiceContext.Provider>,
    options,
  );

describe('ArticleMessageBanner', () => {
  it('renders the Brazil election message banner when election thingId matches', () => {
    const { getByText } = renderBanner(
      {
        aboutTags: brazilElectionAboutTags,
        taggings: mockTaggings,
      },
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByText('Eleições 2026: veja como foi a votação'),
    ).toBeInTheDocument();
  });

  it('renders the World Cup message banner when world cup thingId matches', () => {
    const { getByText } = renderBanner(
      {
        aboutTags: brazilWorldCupAboutTags,
        taggings: mockTaggings,
      },
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByText('Copa do Mundo 2026 – tabela completa'),
    ).toBeInTheDocument();
  });

  it('prefers election banner when both IDs are present', () => {
    const { getByText, queryByText } = renderBanner(
      {
        aboutTags: brazilBothAboutTags,
        taggings: mockTaggings,
      },
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(
      getByText('Eleições 2026: veja como foi a votação'),
    ).toBeInTheDocument();

    expect(
      queryByText('Copa do Mundo 2026 – tabela completa'),
    ).not.toBeInTheDocument();
  });

  it('does not render when sensitivity tagging exists', () => {
    const { queryByTestId } = renderBanner(
      {
        aboutTags: brazilElectionAboutTags,
        taggings: sensitiveTagging,
      },
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
      },
    );

    expect(queryByTestId('article-message-banner')).not.toBeInTheDocument();
  });

  it('does not render when the banner linkHref matches the current page path', () => {
    const { queryByTestId } = renderBanner(
      {
        aboutTags: brazilElectionAboutTags,
        taggings: mockTaggings,
      },
      {
        toggles: { electionBanner: { enabled: true } },
        service: 'portuguese',
        pathname: ELECTION_LINK_HREF,
      },
    );

    expect(queryByTestId('article-message-banner')).not.toBeInTheDocument();
  });
});
