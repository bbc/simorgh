import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import type { IdctaConfig } from '#app/models/types/account';
import useToggle from '#app/hooks/useToggle';
import useOptimizelyVariation from '#app/hooks/useOptimizelyVariation';
import EditorialPicksPromoExperiment, {
  EDITORIAL_PICKS_TOPIC_ID,
  EXPERIMENT_NAME,
} from '.';

jest.mock('#app/hooks/useToggle');
jest.mock('#app/hooks/useOptimizelyVariation', () => ({
  __esModule: true,
  ...jest.requireActual('#app/hooks/useOptimizelyVariation'),
  default: jest.fn(),
}));

const idctaConfig = {
  'id-availability': 'GREEN',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  initialIsSignedIn: false,
  identity: { idSignedInCookieName: 'ckns_id' },
} as unknown as IdctaConfig;

const renderExperiment = ({
  service = 'hindi',
  topicId = EDITORIAL_PICKS_TOPIC_ID,
  signedIn = false,
}: { service?: string; topicId?: string; signedIn?: boolean } = {}) =>
  render(<EditorialPicksPromoExperiment topicId={topicId} />, {
    service: service as never,
    idctaConfig: { ...idctaConfig, initialIsSignedIn: signedIn },
  });

const getBanner = () =>
  document.querySelector('#account-promotional-banner') ??
  screen.queryByTestId('account-promotional-banner-register');

describe('EditorialPicksPromoExperiment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useToggle as jest.Mock).mockReturnValue({ enabled: true });
    (useOptimizelyVariation as jest.Mock).mockReturnValue('variant');
  });

  it('renders the banner for signed-out visitors in the variant', () => {
    renderExperiment();

    expect(getBanner()).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: 'एडिटोरियल पिक्स को फ़ॉलो करें',
      }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "इसे 'मेरी ख़बरें' में फिर से पाएँ",
      ),
    ).toBeInTheDocument();
    expect(
      screen
        .getByTestId('account-promotional-banner-register')
        .getAttribute('href'),
    ).toMatch(/^https:\/\/example\.com\/register\?/);
    expect(useOptimizelyVariation).toHaveBeenCalledWith(
      expect.objectContaining({ experimentName: EXPERIMENT_NAME }),
    );
  });

  it('does not render the banner for control', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue('control');
    renderExperiment();

    expect(getBanner()).not.toBeInTheDocument();
  });

  it('does not render the banner when not bucketed', () => {
    (useOptimizelyVariation as jest.Mock).mockReturnValue(null);
    renderExperiment();

    expect(getBanner()).not.toBeInTheDocument();
  });

  it.each([
    ['signed-in visitors', { signedIn: true }],
    ['other topics', { topicId: 'c0000000000t' }],
    ['other services', { service: 'mundo' }],
  ])('does not activate the experiment for %s', (_, options) => {
    renderExperiment(options);

    expect(useOptimizelyVariation).not.toHaveBeenCalledWith(
      expect.objectContaining({ experimentName: EXPERIMENT_NAME }),
    );
    expect(getBanner()).not.toBeInTheDocument();
  });
});
