import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import { service as hindiServiceConfig } from '#lib/config/services/hindi';
import { service as mundoServiceConfig } from '#lib/config/services/mundo';
import { service as portugueseServiceConfig } from '#lib/config/services/portuguese';
import {
  act,
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import useTopicFollowButton, {
  FollowAction,
  type FollowActionResult,
} from '#app/hooks/useTopicFollowButton';
import useHydrationDetection from '#app/hooks/useHydrationDetection';
import type { Services, Toggles } from '#app/models/types/global';
import FollowTopicButton from '.';

jest.mock('./FollowTopicButtonAuthenticated/lazy', () =>
  jest.requireActual('./FollowTopicButtonAuthenticated'),
);

jest.mock('#app/hooks/useTopicFollowButton');
jest.mock('#app/hooks/useHydrationDetection');

const mockTrackClick = jest.fn();
jest.mock('#app/hooks/useClickTrackerHandler', () => ({
  __esModule: true,
  default: jest.fn(({ componentName }) => ({
    onClick: (event: React.MouseEvent) => mockTrackClick(componentName, event),
  })),
}));

jest.mock('#app/hooks/useViewTracker', () => ({
  __esModule: true,
  default: jest.fn(({ componentName }) => ({
    'data-tracking-component': componentName,
  })),
}));

jest.mock('#app/components/Account/AccountSignInModal', () => ({
  __esModule: true,
  default: ({
    onClose,
    context,
  }: {
    onClose: () => void;
    context?: string;
  }) => (
    <div data-testid="follow-topic-sign-in-modal" data-context={context}>
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
const mockResetActionResult = jest.fn();
const followTopicButtonTranslations =
  hindiServiceConfig.default.translations.followTopicButton;
const actionTooltipTranslations =
  hindiServiceConfig.default.translations.actionTooltip;

if (!followTopicButtonTranslations) {
  throw new Error(
    'Hindi config must include translations.followTopicButton for FollowTopicButton tests',
  );
}

if (!actionTooltipTranslations) {
  throw new Error(
    'Hindi config must include translations.actionTooltip for FollowTopicButton tests',
  );
}

const LOADING_LABEL = followTopicButtonTranslations.loading;
const FOLLOWED_ACCESSIBLE_LABEL =
  followTopicButtonTranslations.unfollowAccessible;

const topicData = {
  topicId: 'cw90edn9kw4t',
  title: 'India',
  service: 'hindi' as const,
  url: 'https://www.bbc.com/hindi/topics/cw90edn9kw4t',
};

const signedInOptions = {
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
};

const mockFollowState = (
  overrides: Partial<ReturnType<typeof useTopicFollowButton>> = {},
) =>
  mockedUseTopicFollowButton.mockReturnValue({
    isFollowed: false,
    isLoading: false,
    isUpdating: false,
    error: null,
    actionResult: null,
    resetActionResult: mockResetActionResult,
    handleFollowAction: mockHandleFollowAction,
    ...overrides,
  });

const FollowTopicButtonWithTheme = ({ isDarkUi = false }) => (
  <ThemeProvider theme={{ isDarkUi }}>
    <FollowTopicButton topicData={topicData} />
  </ThemeProvider>
);

describe('FollowTopicButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseHydrationDetection.mockReturnValue(true);
    mockFollowState();
  });

  const renderFollowTopicButton = ({
    service = 'hindi',
    idctaConfig = mockIdctaConfig,
    isDarkUi = false,
    toggles = {
      topicUasPersonalization: { enabled: true, value: 'hindi' },
    },
  }: {
    service?: Services;
    idctaConfig?: typeof mockIdctaConfig;
    isDarkUi?: boolean;
    toggles?: Toggles;
  } = {}) => {
    return render(<FollowTopicButtonWithTheme isDarkUi={isDarkUi} />, {
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
    renderFollowTopicButton(signedInOptions);

    expect(
      screen.getByTestId('follow-topic-btn-authorized'),
    ).toBeInTheDocument();
  });

  it('renders loading label for guest button while not hydrated', () => {
    mockedUseHydrationDetection.mockReturnValue(false);

    renderFollowTopicButton();

    const guestButton = screen.getByTestId('follow-topic-btn-guest');

    expect(guestButton).toBeInTheDocument();
    expect(guestButton).toHaveAccessibleName(LOADING_LABEL);
  });

  it('opens and closes sign-in modal on guest follow button interaction', async () => {
    renderFollowTopicButton();

    await userEvent.click(screen.getByTestId('follow-topic-btn-guest'));

    expect(screen.getByTestId('follow-topic-sign-in-modal')).toHaveAttribute(
      'data-context',
      'followTopic',
    );

    await userEvent.click(
      screen.getByTestId('follow-topic-sign-in-modal-close'),
    );

    expect(
      screen.queryByTestId('follow-topic-sign-in-modal'),
    ).not.toBeInTheDocument();
  });

  it.each([
    {
      state: 'loading',
      hookState: { isLoading: true },
      label: LOADING_LABEL,
    },
    {
      state: 'followed',
      hookState: { isFollowed: true },
      label: FOLLOWED_ACCESSIBLE_LABEL,
    },
  ])(
    'renders the accessible label for the authenticated $state state',
    ({ hookState, label }) => {
      mockFollowState(hookState);
      renderFollowTopicButton(signedInOptions);

      expect(
        screen.getByTestId('follow-topic-btn-authorized'),
      ).toHaveAccessibleName(label);
    },
  );

  it.each([
    { isFollowed: false, action: FollowAction.FOLLOW },
    { isFollowed: true, action: FollowAction.UNFOLLOW },
  ])(
    'triggers $action on authenticated button click',
    async ({ isFollowed, action }) => {
      mockFollowState({ isFollowed });
      renderFollowTopicButton(signedInOptions);

      await userEvent.click(screen.getByTestId('follow-topic-btn-authorized'));

      expect(mockHandleFollowAction).toHaveBeenCalledWith(action);
    },
  );

  describe('authenticated tooltip', () => {
    const mockActionResult = (actionResult: FollowActionResult) => {
      mockFollowState({
        isFollowed: actionResult?.action === FollowAction.FOLLOW,
        actionResult,
      });
    };

    it.each([
      {
        action: FollowAction.FOLLOW,
        status: 'success' as const,
        tooltipStatus: 'success' as const,
      },
      {
        action: FollowAction.UNFOLLOW,
        status: 'success' as const,
        tooltipStatus: 'removed' as const,
      },
      {
        action: FollowAction.FOLLOW,
        status: 'error' as const,
        tooltipStatus: 'error' as const,
      },
      {
        action: FollowAction.UNFOLLOW,
        status: 'error' as const,
        tooltipStatus: 'error' as const,
      },
    ])(
      'renders and tracks the $tooltipStatus state after $action $status',
      ({ action, status, tooltipStatus }) => {
        mockActionResult({ action, status });
        renderFollowTopicButton(signedInOptions);

        expect(screen.getByRole('group')).toHaveAccessibleName(
          actionTooltipTranslations[tooltipStatus].title,
        );
        expect(
          screen.getByTestId('action-tooltip').parentElement,
        ).toHaveAttribute(
          'data-tracking-component',
          `follow-topic-tooltip-view-${tooltipStatus}`,
        );
        expect(screen.getByTestId('action-tooltip-close')).toHaveFocus();
      },
    );

    it('shows error feedback without a My News link', () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'error' });
      renderFollowTopicButton(signedInOptions);

      expect(
        screen.getByText(actionTooltipTranslations.error.body),
      ).toBeInTheDocument();
      expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('does not show a tooltip before an action completes', () => {
      renderFollowTopicButton(signedInOptions);

      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
    });

    it('does not show a tooltip for guests', () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton();

      expect(screen.getByTestId('follow-topic-btn-guest')).toBeInTheDocument();
      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
    });

    it('suppresses tooltips on dark UI pages without hiding the button', () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton({ ...signedInOptions, isDarkUi: true });

      expect(
        screen.getByTestId('follow-topic-btn-authorized'),
      ).toBeInTheDocument();
      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
    });

    it('closes, resets the action result and tracks dismissal on close', async () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton(signedInOptions);

      await userEvent.click(
        screen.getByRole('button', {
          name: actionTooltipTranslations.closeLabel,
        }),
      );

      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
      expect(mockResetActionResult).toHaveBeenCalledTimes(1);
      expect(mockTrackClick).toHaveBeenCalledWith(
        'follow-topic-tooltip-close',
        expect.anything(),
      );
    });

    it('supports keyboard navigation, Escape dismissal and focus restoration', async () => {
      mockHandleFollowAction.mockImplementationOnce(() => {
        mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      });
      const { rerender } = renderFollowTopicButton(signedInOptions);
      const button = screen.getByTestId('follow-topic-btn-authorized');

      await userEvent.click(button);
      rerender(<FollowTopicButtonWithTheme />);

      expect(screen.getByTestId('action-tooltip-close')).toHaveFocus();
      await userEvent.tab();
      expect(screen.getByRole('link')).toHaveFocus();
      await userEvent.keyboard('{Escape}');

      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
      expect(mockResetActionResult).toHaveBeenCalledTimes(1);
      expect(button).toHaveFocus();
    });

    it('dismisses on outside click after the shared grace period', () => {
      jest.useFakeTimers();
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton(signedInOptions);

      fireEvent.click(document.body);
      expect(screen.getByTestId('action-tooltip')).toBeInTheDocument();

      act(() => {
        jest.advanceTimersByTime(500);
      });
      fireEvent.click(document.body);

      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();
      expect(mockResetActionResult).toHaveBeenCalledTimes(1);
      expect(mockTrackClick).toHaveBeenCalledWith(
        'follow-topic-tooltip-close',
        expect.anything(),
      );
      jest.useRealTimers();
    });

    it('shows the next action result after a tooltip has been dismissed', async () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      const { rerender } = renderFollowTopicButton(signedInOptions);

      await userEvent.click(screen.getByTestId('action-tooltip-close'));
      mockActionResult(null);
      rerender(<FollowTopicButtonWithTheme />);
      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();

      mockActionResult({ action: FollowAction.UNFOLLOW, status: 'success' });
      rerender(<FollowTopicButtonWithTheme />);

      expect(screen.getByRole('group')).toHaveAccessibleName(
        actionTooltipTranslations.removed.title,
      );
    });

    it.each([
      { service: 'hindi' as const, config: hindiServiceConfig },
      { service: 'mundo' as const, config: mundoServiceConfig },
      { service: 'portuguese' as const, config: portugueseServiceConfig },
    ])('uses the $service tooltip translations', ({ service, config }) => {
      const tooltipTranslations = config.default.translations.actionTooltip;

      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton({
        ...signedInOptions,
        service,
        toggles: {
          topicUasPersonalization: { enabled: true, value: service },
        },
      });

      expect(screen.getByRole('group')).toHaveAccessibleName(
        tooltipTranslations?.success.title,
      );
      expect(screen.getByTestId('action-tooltip-close')).toHaveAccessibleName(
        tooltipTranslations?.closeLabel,
      );
      expect(screen.getByRole('link')).toHaveAccessibleName(
        tooltipTranslations?.myNewsLinkText,
      );
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        tooltipTranslations?.myNewsUrl,
      );
    });

    it('tracks My News link clicks', () => {
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton(signedInOptions);
      const link = screen.getByRole('link');
      link.addEventListener('click', event => event.preventDefault());

      fireEvent.click(link);

      expect(mockTrackClick).toHaveBeenCalledWith(
        'follow-topic-tooltip-my-news-link',
        expect.anything(),
      );
      expect(mockResetActionResult).not.toHaveBeenCalled();
    });
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

  it('does not render when topicId is missing', () => {
    render(
      <FollowTopicButton
        topicData={
          {
            title: topicData.title,
            service: topicData.service,
            url: topicData.url,
          } as unknown as typeof topicData
        }
      />,
      {
        service: 'hindi',
        idctaConfig: mockIdctaConfig,
        toggles: {
          topicUasPersonalization: { enabled: true, value: 'hindi' },
        },
      },
    );

    expect(
      screen.queryByTestId('follow-topic-btn-guest'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('follow-topic-btn-authorized'),
    ).not.toBeInTheDocument();
  });
});
