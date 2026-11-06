import { render } from '#app/components/react-testing-library-with-providers';
import HomePageElectionBanner from '.';

const ELEMENT_ID = 'election-banner';

describe('HomePageElectionBanner', () => {
  it('renders with its own wrapper class when enabled and an AP banner is configured', () => {
    const { getByTestId } = render(<HomePageElectionBanner />, {
      service: 'afrique',
      pageType: 'home',
      toggles: { electionBanner: { enabled: true } },
    });

    expect(getByTestId(ELEMENT_ID)).toHaveClass('home-page-election-banner');
  });

  it('does not render when the toggle is disabled', () => {
    const { queryByTestId } = render(<HomePageElectionBanner />, {
      service: 'afrique',
      pageType: 'home',
      toggles: { electionBanner: { enabled: false } },
    });

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });

  it('does not render when the service has no Associated Press banner configured', () => {
    const { queryByTestId } = render(<HomePageElectionBanner />, {
      service: 'pidgin',
      pageType: 'home',
      toggles: { electionBanner: { enabled: true } },
    });

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });
});
