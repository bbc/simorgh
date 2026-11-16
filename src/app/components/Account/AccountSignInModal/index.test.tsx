import userEvent from '@testing-library/user-event';
import {
  act,
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { service as hindiServiceConfig } from '#app/lib/config/services/hindi';
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import SaveArticleButtonGuest from '#app/components/SaveArticleButton/SaveArticleButtonGuest';
import FollowTopicButtonGuest from '#app/components/FollowTopicButton/FollowTopicButtonGuest';
import AccountSignInModal from '.';

const onClose = jest.fn();
const defaultProps = {
  onClose,
  title: 'Discover more with BBC Account',
  description: 'Sign in or register to get more from BBC News.',
  closeLabel: 'Dismiss sign-in prompt',
  signInText: 'Sign in',
  signInAccessibleLabel: 'Sign in to your BBC Account',
  registerText: 'Create an account',
  separatorText: 'or',
  signInUrl:
    'https://example.com/signin?ptrt=https%3A%2F%2Fwww.bbc.com%2Fhindi%2Farticles%2Fc1234567890o',
  registerUrl:
    'https://example.com/register?ptrt=https%3A%2F%2Fwww.bbc.com%2Fhindi%2Farticles%2Fc1234567890o',
};

describe('AccountSignInModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all supplied copy independently of service and account context', () => {
    render(<AccountSignInModal {...defaultProps} />, { service: 'hindi' });

    expect(screen.getByRole('dialog')).toHaveAccessibleName(defaultProps.title);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.separatorText)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: defaultProps.closeLabel }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: defaultProps.signInAccessibleLabel }),
    ).toHaveAttribute('href', defaultProps.signInUrl);
    expect(
      screen.getByRole('link', { name: defaultProps.registerText }),
    ).toHaveAttribute('href', defaultProps.registerUrl);
  });

  it('hides the visual sign-in label from screen readers when an accessible label is supplied', () => {
    render(<AccountSignInModal {...defaultProps} />);
    const link = screen.getByRole('link', {
      name: defaultProps.signInAccessibleLabel,
    });
    expect(link.querySelector('[aria-hidden="true"]')).toHaveTextContent(
      defaultProps.signInText,
    );
  });

  it('uses the visual sign-in label when no accessible label is supplied', () => {
    render(
      <AccountSignInModal
        {...defaultProps}
        signInAccessibleLabel={undefined}
        separatorText={undefined}
      />,
    );
    expect(
      screen.getByRole('link', { name: defaultProps.signInText }),
    ).toBeInTheDocument();
    expect(screen.queryByText('or')).not.toBeInTheDocument();
  });

  it('calls the supplied sign-in and register callbacks', () => {
    const onSignInClick = jest.fn(event => event.preventDefault());
    const onRegisterClick = jest.fn(event => event.preventDefault());
    render(
      <AccountSignInModal
        {...defaultProps}
        onSignInClick={onSignInClick}
        onRegisterClick={onRegisterClick}
      />,
    );
    fireEvent.click(
      screen.getByRole('link', { name: defaultProps.signInAccessibleLabel }),
    );
    fireEvent.click(
      screen.getByRole('link', { name: defaultProps.registerText }),
    );
    expect(onSignInClick).toHaveBeenCalledTimes(1);
    expect(onRegisterClick).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when the close button is clicked', async () => {
    render(<AccountSignInModal {...defaultProps} />);
    await userEvent.click(
      screen.getByRole('button', { name: defaultProps.closeLabel }),
    );
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape', () => {
    render(<AccountSignInModal {...defaultProps} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it.each([true, false])(
    'only dismisses on outside click when isDismissible=%s',
    isDismissible => {
      jest.useFakeTimers();
      try {
        render(
          <AccountSignInModal
            {...defaultProps}
            isDismissible={isDismissible}
          />,
        );
        fireEvent.click(document.body);
        expect(onClose).not.toHaveBeenCalled();
        act(() => jest.advanceTimersByTime(500));
        fireEvent.click(screen.getByText(defaultProps.description));
        expect(onClose).not.toHaveBeenCalled();
        fireEvent.click(document.body);
        expect(onClose).toHaveBeenCalledTimes(isDismissible ? 1 : 0);
      } finally {
        jest.useRealTimers();
      }
    },
  );

  it('disables the close button and Escape but preserves account links when non-dismissible', () => {
    render(<AccountSignInModal {...defaultProps} isDismissible={false} />);
    expect(
      screen.queryByRole('button', { name: defaultProps.closeLabel }),
    ).not.toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });

  it.each([true, false])(
    'traps focus when isDismissible=%s and restores focus on unmount',
    async isDismissible => {
      const user = userEvent.setup();
      const { rerender } = render(
        <div>
          <button type="button">Open prompt</button>
        </div>,
      );
      const opener = screen.getByRole('button');
      opener.focus();
      rerender(
        <div>
          <button type="button">Open prompt</button>
          <AccountSignInModal {...defaultProps} isDismissible={isDismissible} />
        </div>,
      );
      const signIn = screen.getByRole('link', {
        name: defaultProps.signInAccessibleLabel,
      });
      const register = screen.getByRole('link', {
        name: defaultProps.registerText,
      });
      expect(signIn).toHaveFocus();
      await user.tab();
      expect(register).toHaveFocus();
      if (isDismissible) {
        await user.tab();
        expect(
          screen.getByRole('button', { name: defaultProps.closeLabel }),
        ).toHaveFocus();
      }
      await user.tab();
      expect(signIn).toHaveFocus();
      await user.tab({ shift: true });
      expect(
        isDismissible
          ? screen.getByRole('button', { name: defaultProps.closeLabel })
          : register,
      ).toHaveFocus();
      rerender(
        <div>
          <button type="button">Open prompt</button>
        </div>,
      );
      expect(opener).toHaveFocus();
    },
  );

  it.each([
    {
      journey: 'save article',
      Component: SaveArticleButtonGuest,
      testId: 'save-article-btn-guest',
      copy: hindiServiceConfig.default.translations.accountSignInModal,
    },
    {
      journey: 'follow topic',
      Component: FollowTopicButtonGuest,
      testId: 'follow-topic-btn-guest',
      copy: hindiServiceConfig.default.translations.accountSignInModal
        ?.followTopic,
    },
  ])(
    'preserves translated copy and article-return URLs for the $journey journey',
    async ({ Component, testId, copy }) => {
      const articlePath = '/hindi/articles/c1234567890o';
      window.history.replaceState({}, '', articlePath);
      try {
        render(<Component />, {
          service: 'hindi',
          pathname: articlePath,
          idctaConfig: mockIdctaConfig,
        });
        await userEvent.click(screen.getByTestId(testId));
        expect(screen.getByRole('dialog')).toHaveAccessibleName(copy?.title);
        expect(screen.getByText(copy?.description ?? '')).toBeInTheDocument();
        const signInUrl = new URL(
          screen
            .getByRole('link', {
              name: hindiServiceConfig.default.translations.account
                ?.signInAccessibleLabel,
            })
            .getAttribute('href') ?? '',
        );
        const registerUrl = new URL(
          screen
            .getByRole('link', {
              name: hindiServiceConfig.default.translations.account?.register,
            })
            .getAttribute('href') ?? '',
        );
        expect(signInUrl.pathname).toBe('/signin');
        expect(registerUrl.pathname).toBe('/register');
        [signInUrl, registerUrl].forEach(url => {
          expect(url.searchParams.get('ptrt')).toBe(window.location.href);
          expect(url.searchParams.get('lang')).toBe(
            hindiServiceConfig.default.locale,
          );
        });
        await userEvent.click(
          screen.getByRole('button', {
            name: hindiServiceConfig.default.translations.accountSignInModal
              ?.closeLabel,
          }),
        );
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        expect(screen.getByTestId(testId)).toHaveFocus();
      } finally {
        window.history.replaceState({}, '', '/');
      }
    },
  );
});
