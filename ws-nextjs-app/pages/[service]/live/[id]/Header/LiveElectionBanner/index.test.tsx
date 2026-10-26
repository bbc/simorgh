import { act } from '@testing-library/react';
import { render } from '#app/components/react-testing-library-with-providers';
import mockMatchMedia from '#testHelpers/mockMatchMedia';
import LiveElectionBanner from '.';

const ELEMENT_ID = 'election-banner';

// Rendered through the Next.js provider tree, which lazy-loads withOptimizelyProvider;
// await act so that resolves before assertions run.
const renderLiveElectionBanner = async (
  options?: Parameters<typeof render>[1],
) => {
  const results: ReturnType<typeof render>[] = [];

  await act(async () => {
    results.push(render(<LiveElectionBanner />, options));
  });

  return results[0];
};

describe('LiveElectionBanner', () => {
  beforeEach(() => {
    mockMatchMedia();
  });

  it('should apply its own full-bleed wrapper class for the VJ banner', async () => {
    // persian's electionBanner config has no assocPressIframeSrc
    const { getByTestId } = await renderLiveElectionBanner({
      service: 'persian',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('wrapper');
  });

  it('should apply its own full-bleed wrapper class for the Associated Press banner', async () => {
    // mundo's electionBanner config has an assocPressIframeSrc
    const { getByTestId } = await renderLiveElectionBanner({
      service: 'mundo',
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('assocPressWrapper');
  });

  it('should widen the Associated Press iframe', async () => {
    const { getByTestId } = await renderLiveElectionBanner({
      service: 'mundo',
    });

    const iframe = getByTestId(ELEMENT_ID).querySelector('iframe');

    expect(iframe).toHaveClass('iframe');
  });
});
