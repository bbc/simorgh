import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountHeader from '.';

const renderAccountHeader = ({ isSignedIn }: { isSignedIn: boolean }) =>
  render(
    <AccountContext.Provider
      value={{
        isSignedIn,
        signInUrl: 'https://example.com/signin',
        forYouUrl: 'https://example.com/foryou',
        isIdctaAvailable: true,
      }}
    >
      <AccountHeader />
    </AccountContext.Provider>,
    { service: 'ws' },
  );

describe('AccountHeader', () => {
  it('shows Sign in when signed out', async () => {
    renderAccountHeader({ isSignedIn: false });

    const link = await screen.findByRole('link', { name: 'Sign in' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });

  it('shows For you when signed in', async () => {
    renderAccountHeader({ isSignedIn: true });

    const link = await screen.findByRole('link', { name: 'For you' });
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/foryou'),
    );
  });
});
