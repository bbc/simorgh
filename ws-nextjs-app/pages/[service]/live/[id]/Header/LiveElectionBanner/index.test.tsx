import { render } from '#app/components/react-testing-library-with-providers';
import LiveElectionBanner from '.';

const ELEMENT_ID = 'election-banner';

const renderLiveElectionBanner = (options?: Parameters<typeof render>[1]) =>
  render(<LiveElectionBanner />, options);

describe('LiveElectionBanner', () => {
  it('should apply its own full-bleed wrapper class for the VJ banner', () => {
    // arabic's electionBanner config has no assocPressIframeSrc
    const { getByTestId } = renderLiveElectionBanner({
      service: 'arabic',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('wrapper');
  });

  it('should apply its own full-bleed wrapper class for the Associated Press banner', () => {
    // mundo's electionBanner config has an assocPressIframeSrc
    const { getByTestId } = renderLiveElectionBanner({
      service: 'mundo',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('assocPressWrapper');
  });

  it('should widen the Associated Press iframe', () => {
    const { getByTestId } = renderLiveElectionBanner({
      service: 'mundo',
    });

    const iframe = getByTestId(ELEMENT_ID).querySelector('iframe');

    expect(iframe).toHaveClass('iframe');
  });
});
