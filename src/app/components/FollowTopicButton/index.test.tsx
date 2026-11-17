import userEvent from '@testing-library/user-event';
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
  hindiServiceConfig.default.translations.followTopicTooltip;

if (!followTopicButtonTranslations || !actionTooltipTranslations) {
  throw new Error('FollowTopicButton tests require configured translations');
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

const observers = new Map();

const IntersectionObserver = jest.fn(cb => {
  const item = {
    callback: cb,
    elements: new Set(),
  };

  const instance = {
    observe: jest.fn(element => {
      item.elements.add(element);
    }),
    disconnect: jest.fn(() => {
      item.elements.clear();
    }),
  };

  observers.set(instance, item);

  return instance;
});

const getObserverInstance = (element: HTMLElement) => {
  const [instance] =
    Array.from(observers).find(([, item]) => item.elements.has(element)) || [];

  if (!instance) {
    throw new Error('Failed to find IntersectionObserver for element.');
  }

  return instance;
};

const triggerIntersection = ({
  changes,
  observer,
}: {
  changes: Partial<IntersectionObserverEntry>[];
  observer: IntersectionObserver;
}) => {
  const item = observers.get(observer);

  item.callback(changes);
};

const reverbMock = {
  isReady: jest.fn(() => true),
  initialise: jest.fn(() => Promise.resolve()),
  viewEvent: jest.fn(),
  userActionEvent: jest.fn(),
};

// eslint-disable-next-line no-underscore-dangle
window.__reverb = {
  __reverbLoadedPromise: Promise.resolve(reverbMock),
};

describe('FollowTopicButton', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-expect-error mocking required for tests
    global.IntersectionObserver = IntersectionObserver;
    observers.clear();

    mockedUseHydrationDetection.mockReturnValue(true);
    mockFollowState();
  });

  afterEach(() => {
    observers.clear();
    jest.useRealTimers();
  });

  const renderFollowTopicButton = ({
    service = 'hindi',
    idctaConfig = mockIdctaConfig,
    toggles = {
      topicUasPersonalization: { enabled: true, value: 'hindi' },
    },
    pageMetadata,
  }: {
    service?: Services;
    idctaConfig?: typeof mockIdctaConfig;
    toggles?: Toggles;
    pageMetadata?: {
      type: 'article';
      atiAnalytics: { pageIdentifier: string };
    };
  } = {}) => {
    return render(<FollowTopicButton topicData={topicData} />, {
      service,
      idctaConfig,
      toggles,
      pageMetadata,
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
          actionTooltipTranslations[tooltipStatus].title.replace(
            '{Topic Name}',
            topicData.title,
          ),
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
      rerender(<FollowTopicButton topicData={topicData} />);

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

    it('shows and tracks follow and unfollow tooltip results', async () => {
      jest.useFakeTimers();
      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      const { rerender } = renderFollowTopicButton({
        ...signedInOptions,
        pageMetadata: {
          type: 'article',
          atiAnalytics: { pageIdentifier: 'follow-topic-test' },
        },
        toggles: {
          eventTracking: { enabled: true },
          topicUasPersonalization: { enabled: true, value: 'hindi' },
        },
      });

      await act(async () => Promise.resolve());
      const followTooltip = screen.getByTestId('action-tooltip').parentElement;
      const followObserver = getObserverInstance(followTooltip as HTMLElement);

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: followObserver,
        });
      });
      await act(async () => {
        jest.advanceTimersByTime(1100);
        await Promise.resolve();
      });

      fireEvent.click(screen.getByTestId('action-tooltip-close'));
      mockActionResult(null);
      rerender(<FollowTopicButton topicData={topicData} />);
      expect(screen.queryByTestId('action-tooltip')).not.toBeInTheDocument();

      mockActionResult({ action: FollowAction.UNFOLLOW, status: 'success' });
      rerender(<FollowTopicButton topicData={topicData} />);

      await act(async () => Promise.resolve());
      const unfollowTooltip =
        screen.getByTestId('action-tooltip').parentElement;
      const unfollowObserver = getObserverInstance(
        unfollowTooltip as HTMLElement,
      );

      expect(screen.getByRole('group')).toHaveAccessibleName(
        actionTooltipTranslations.removed.title.replace(
          '{Topic Name}',
          topicData.title,
        ),
      );

      act(() => {
        triggerIntersection({
          changes: [{ isIntersecting: true }],
          observer: unfollowObserver,
        });
      });
      await act(async () => {
        jest.advanceTimersByTime(1100);
        await Promise.resolve();
      });

      expect(reverbMock.userActionEvent).toHaveBeenCalledTimes(2);
      expect(reverbMock.userActionEvent).toHaveBeenNthCalledWith(
        1,
        'viewability',
        '',
        expect.objectContaining({
          item: expect.objectContaining({
            name: 'follow-topic-tooltip-view-success',
          }),
        }),
        undefined,
        undefined,
        false,
      );
      expect(reverbMock.userActionEvent).toHaveBeenNthCalledWith(
        2,
        'viewability',
        '',
        expect.objectContaining({
          item: expect.objectContaining({
            name: 'follow-topic-tooltip-view-removed',
          }),
        }),
        undefined,
        undefined,
        false,
      );
    });

    it.each([
      { service: 'hindi' as const, config: hindiServiceConfig },
      { service: 'mundo' as const, config: mundoServiceConfig },
      { service: 'portuguese' as const, config: portugueseServiceConfig },
    ])('uses the $service tooltip translations', ({ service, config }) => {
      const tooltipTranslations =
        config.default.translations.followTopicTooltip;

      mockActionResult({ action: FollowAction.FOLLOW, status: 'success' });
      renderFollowTopicButton({
        ...signedInOptions,
        service,
        toggles: {
          topicUasPersonalization: { enabled: true, value: service },
        },
      });

      expect(screen.getByRole('group')).toHaveAccessibleName(
        tooltipTranslations?.success.title.replace(
          '{Topic Name}',
          topicData.title,
        ),
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
