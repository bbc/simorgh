import {
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import * as React from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import AccountHeader from '.';

const realUseContext = React.useContext;
const mockUseContext = jest.spyOn(React, 'useContext');

const renderAccountHeader = ({ isSignedIn }: { isSignedIn: boolean }) => {
  mockUseContext.mockImplementation((ctx: any) => {
    if (ctx === AccountContext) {
      return {
        isSignedIn,
        signInUrl: 'https://example.com/signin',
        forYouUrl: 'https://example.com/foryou',
        isIdctaAvailable: true,
      };
    }
    return realUseContext(ctx);
  });

  return render(<AccountHeader />, { service: 'ws' });
};

describe('AccountHeader', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

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
