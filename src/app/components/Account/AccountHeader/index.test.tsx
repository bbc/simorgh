import { render, screen } from '@testing-library/react';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { AccountProvider } from '../AccountContext';
import AccountHeader from '.';

const renderWithProviders = (initialConfig: any) =>
  render(
    <ServiceContext.Provider value={{ locale: 'en-gb' } as any}>
      <AccountProvider initialConfig={initialConfig}>
        <AccountHeader />
      </AccountProvider>
    </ServiceContext.Provider>,
  );

describe('AccountHeader', () => {
  it('shows Sign in when signed out', () => {
    renderWithProviders({
      availability: { signin: 'GREEN' },
      unavailable_url: 'https://example.com/unavailable',
      signin_url: 'https://example.com/signin',
      register_url: 'https://example.com/register',
      'foryou-flagpole': 'GREEN',
      foryou_url: 'https://example.com/foryou',
    });

    expect(screen.getByRole('link', { name: 'Sign in' })).toHaveAttribute(
      'href',
      expect.stringContaining('https://example.com/signin'),
    );
  });
});
