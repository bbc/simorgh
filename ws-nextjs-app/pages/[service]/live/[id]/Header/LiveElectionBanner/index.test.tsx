import { render } from '#app/components/react-testing-library-with-providers';
import { MetadataTaggings } from '#app/models/types/metadata';
import LiveElectionBanner from '.';

const ELEMENT_ID = 'election-banner';

// Matches the electionThingIds configured for the services used below.
const mockTaggings: MetadataTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/19994837-27b8-463f-965d-fbb0ac1622a3#id',
  },
];

const renderLiveElectionBanner = (options?: Parameters<typeof render>[1]) =>
  render(<LiveElectionBanner taggings={mockTaggings} />, options);

describe('LiveElectionBanner', () => {
  it('should apply its own full-bleed wrapper class for the VJ banner', () => {
    // arabic's electionBanner config has no assocPressIframeSrc
    const { getByTestId } = renderLiveElectionBanner({
      toggles: { electionBanner: { enabled: true } },
      service: 'arabic',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('wrapper');
  });

  it('should apply its own full-bleed wrapper class for the Associated Press banner', () => {
    // mundo's electionBanner config has an assocPressIframeSrc
    const { getByTestId } = renderLiveElectionBanner({
      toggles: { electionBanner: { enabled: true } },
      service: 'mundo',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('assocPressWrapper');
  });

  it('should widen the Associated Press iframe', () => {
    const { getByTestId } = renderLiveElectionBanner({
      toggles: { electionBanner: { enabled: true } },
      service: 'mundo',
    });

    const iframe = getByTestId(ELEMENT_ID).querySelector('iframe');

    expect(iframe).toHaveClass('iframe');
  });
});
