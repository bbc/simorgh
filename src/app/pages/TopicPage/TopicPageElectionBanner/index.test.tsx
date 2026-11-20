import { render } from '#app/components/react-testing-library-with-providers';
import TopicPageElectionBanner from '.';

const ELEMENT_ID = 'election-banner';
const MOCK_CURATION_ID =
  'urn:bbc:vivo:curation:874d2084-631c-4ee8-b582-f88920fcd960';

describe('TopicPageElectionBanner', () => {
  it('renders with its own wrapper class when a curation matches', () => {
    const { getByTestId } = render(
      <TopicPageElectionBanner curationIds={[MOCK_CURATION_ID]} />,
      {
        service: 'mundo',
        pageType: 'topic',
        toggles: { electionBanner: { enabled: true } },
      },
    );

    expect(getByTestId(ELEMENT_ID)).toHaveClass('topic-page-election-banner');
  });

  it('hides the visible title but keeps it on the iframe', () => {
    const { getByTestId } = render(
      <TopicPageElectionBanner curationIds={[MOCK_CURATION_ID]} />,
      {
        service: 'mundo',
        pageType: 'topic',
        toggles: { electionBanner: { enabled: true } },
      },
    );

    expect(getByTestId(ELEMENT_ID).querySelector('span')).toHaveClass(
      'topic-page-election-banner-title',
    );
    expect(getByTestId(ELEMENT_ID).querySelector('iframe')).toHaveAttribute(
      'title',
      'Elecciones EE.UU. 2026',
    );
  });

  it('does not render when no curation matches', () => {
    const { queryByTestId } = render(
      <TopicPageElectionBanner curationIds={['unrelated-curation']} />,
      {
        service: 'mundo',
        pageType: 'topic',
        toggles: { electionBanner: { enabled: true } },
      },
    );

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });

  it('does not render when the toggle is disabled', () => {
    const { queryByTestId } = render(
      <TopicPageElectionBanner curationIds={[MOCK_CURATION_ID]} />,
      {
        service: 'mundo',
        pageType: 'topic',
        toggles: { electionBanner: { enabled: false } },
      },
    );

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });
});
