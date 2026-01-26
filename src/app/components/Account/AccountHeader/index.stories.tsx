import type { Meta, StoryObj } from '@storybook/react';
import AccountHeader from '.';
import { AccountContext } from '../AccountContext';

const meta: Meta<typeof AccountHeader> = {
  title: 'Account/AccountHeader',
  component: AccountHeader,
};

export default meta;

type Story = StoryObj<typeof AccountHeader>;

const renderWithContext = (isSignedIn: boolean) => (
  <AccountContext.Provider
    value={
      {
        isSignedIn,
        signInUrl: 'https://example.com/signin',
        accountUrl: 'https://example.com/for-you',
        registerUrl: 'https://example.com/register',
        isSignInAvailable: true,
      } as any
    }
  >
    <AccountHeader />
  </AccountContext.Provider>
);

export const SignedOut: Story = {
  render: () => renderWithContext(false),
};

export const SignedIn: Story = {
  render: () => renderWithContext(true),
};
