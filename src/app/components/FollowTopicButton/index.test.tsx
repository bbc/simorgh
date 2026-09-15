import userEvent from '@testing-library/user-event';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import useTopicFollowButton, {
  FollowAction,
} from '#app/hooks/useTopicFollowButton';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import type { Services, Toggles } from '#app/models/types/global';
import FollowTopicButton from '.';

jest.mock('./FollowTopicButtonAuthenticated/lazy', () =>
  jest.requireActual('./FollowTopicButtonAuthenticated'),
);

jest.mock('#app/hooks/useTopicFollowButton');
jest.mock('#app/hooks/useHydrationDetection');

jest.mock('#app/components/Account/AccountSignInModal', () => ({
  __esModule: true,
  default: ({ onClose }: { onClose: () => void }) => (
    <div data-testid="follow-topic-sign-in-modal">
      <button
        type="button"
        onClick={onClose}
        data-testid="follow-topic-sign-in-modal-close"
      >
        Close
      </button>
    </div>
  ),
}));

jest.mock('#app/lib/utilities/isLocal', () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

const mockedUseTopicFollowButton = useTopicFollowButton as jest.MockedFunction<
  typeof useTopicFollowButton
>;
const mockedUseHydrationDetection =
  useHydrationDetection as jest.MockedFunction<typeof useHydrationDetection>;

const mockHandleFollowAction = jest.fn();

const topicData = {
  topicId: 'cw90edn9kw4t',
  title: 'India',
  service: 'hindi' as const,
  url: 'https://www.bbc.com/hindi/topics/cw90edn9kw4t',
};

describe('FollowTopicButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseHydrationDetection.mockReturnValue(true);
    mockedUseTopicFollowButton.mockReturnValue({
      isFollowed: false,
      isLoading: false,
      isUpdating: false,
      error: null,
      handleFollowAction: mockHandleFollowAction,
    });
  });

  const renderFollowTopicButton = ({
    service = 'hindi',
    idctaConfig = mockIdctaConfig,
    toggles = {
      topicUasPersonalization: { enabled: true, value: 'hindi' },
    },
  }: {
    service?: Services;
    idctaConfig?: typeof mockIdctaConfig;
    toggles?: Toggles;
  } = {}) => {
    render(<FollowTopicButton topicData={topicData} />, {
      service,
      idctaConfig,
      toggles,
    });
  };

  it('does not render when topicUasPersonalization is disabled', () => {
    renderFollowTopicButton({
      toggles: {
        uasPersonalization: { enabled: true, value: 'hindi' },
        topicUasPersonalization: { enabled: false },
      },
    });

    expect(
      screen.queryByTestId('follow-topic-btn-guest'),
    ).not.toBeInTheDocument();
  });

  it('renders guest button when topicUasPersonalization is enabled and user is signed out', () => {
    renderFollowTopicButton({
      toggles: {
        uasPersonalization: { enabled: false },
        topicUasPersonalization: { enabled: true, value: 'hindi' },
      },
    });

    expect(screen.getByTestId('follow-topic-btn-guest')).toBeInTheDocument();
  });

  it('renders authenticated button when topicUasPersonalization is enabled and user is signed in', () => {
    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
      toggles: {
        topicUasPersonalization: { enabled: true, value: 'hindi' },
      },
    });

    expect(
      screen.getByTestId('follow-topic-btn-authorized'),
    ).toBeInTheDocument();
  });

  it('renders loading label for guest button while not hydrated', () => {
    mockedUseHydrationDetection.mockReturnValue(false);

    renderFollowTopicButton();

    expect(screen.getByTestId('follow-topic-btn-guest')).toBeInTheDocument();
  });

  it('opens and closes sign-in modal on guest follow button interaction', async () => {
    renderFollowTopicButton();

    await userEvent.click(screen.getByTestId('follow-topic-btn-guest'));

    expect(
      screen.getByTestId('follow-topic-sign-in-modal'),
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByTestId('follow-topic-sign-in-modal-close'),
    );

    expect(
      screen.queryByTestId('follow-topic-sign-in-modal'),
    ).not.toBeInTheDocument();
  });

  it('renders loading state for authenticated button', () => {
    mockedUseTopicFollowButton.mockReturnValue({
      isFollowed: false,
      isLoading: true,
      isUpdating: false,
      error: null,
      handleFollowAction: mockHandleFollowAction,
    });

    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
    });

    expect(
      screen.getByTestId('follow-topic-btn-authorized'),
    ).toBeInTheDocument();
  });

  it('renders followed state and accessible unfollow label for authenticated button', () => {
    mockedUseTopicFollowButton.mockReturnValue({
      isFollowed: true,
      isLoading: false,
      isUpdating: false,
      error: null,
      handleFollowAction: mockHandleFollowAction,
    });

    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
    });

    expect(
      screen.getByTestId('follow-topic-btn-authorized'),
    ).toBeInTheDocument();
  });

  it('triggers follow action on authenticated button click when not followed', async () => {
    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
    });

    await userEvent.click(screen.getByTestId('follow-topic-btn-authorized'));

    expect(mockHandleFollowAction).toHaveBeenCalledWith(FollowAction.FOLLOW);
  });

  it('triggers unfollow action on authenticated button click when followed', async () => {
    mockedUseTopicFollowButton.mockReturnValue({
      isFollowed: true,
      isLoading: false,
      isUpdating: false,
      error: null,
      handleFollowAction: mockHandleFollowAction,
    });

    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
    });

    await userEvent.click(screen.getByTestId('follow-topic-btn-authorized'));

    expect(mockHandleFollowAction).toHaveBeenCalledWith(FollowAction.UNFOLLOW);
  });

  it('does not render when service is not allowlisted in local topicUasPersonalization value', () => {
    renderFollowTopicButton({
      service: 'hindi',
      toggles: {
        topicUasPersonalization: { enabled: true, value: 'mundo|portuguese' },
      },
    });

    expect(
      screen.queryByTestId('follow-topic-btn-guest'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('follow-topic-btn-authorized'),
    ).not.toBeInTheDocument();
  });

  it('does not render when IDCTA is unavailable', () => {
    renderFollowTopicButton({
      idctaConfig: { ...mockIdctaConfig, 'id-availability': 'RED' },
      toggles: {
        topicUasPersonalization: { enabled: true, value: 'hindi' },
      },
    });

    expect(
      screen.queryByTestId('follow-topic-btn-guest'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('follow-topic-btn-authorized'),
    ).not.toBeInTheDocument();
  });
});
