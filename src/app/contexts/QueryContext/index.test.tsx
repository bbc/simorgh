import { type PropsWithChildren, useState } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { AccountContextProps } from '#app/models/types/account';
import {
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import QueryProvider from '.';

jest.mock('./PersistentQueryProvider', () => ({
  __esModule: true,
  default: ({ children }: PropsWithChildren) => (
    <div data-testid="persistent-query-provider">{children}</div>
  ),
}));

const accountContext: AccountContextProps = {
  isIdctaAvailable: true,
  isRefreshAvailable: false,
  isSignedIn: false,
  isArticlePersonalizationAvailable: false,
  isArticlePersonalizationEnabled: false,
  isTopicPersonalizationAvailable: false,
  isTopicPersonalizationEnabled: false,
  isPersonalisationOn: false,
};

const TestProvider = ({
  children,
  value = accountContext,
}: PropsWithChildren<{ value?: AccountContextProps }>) => (
  <AccountContext.Provider value={value}>
    <QueryProvider>{children}</QueryProvider>
  </AccountContext.Provider>
);

const StatefulChild = () => {
  const [value, setValue] = useState('');

  return (
    <input
      aria-label="Saved article note"
      value={value}
      onChange={event => setValue(event.target.value)}
    />
  );
};

describe('QueryProvider', () => {
  it('should always wrap children regardless of personalization availability', () => {
    render(
      <TestProvider>
        <p>Page content</p>
      </TestProvider>,
    );

    expect(screen.getByTestId('persistent-query-provider')).toContainElement(
      screen.getByText('Page content'),
    );
  });

  it.each([true, false])(
    'should preserve child state when sign-in changes from %s',
    initialIsSignedIn => {
      const { rerender } = render(
        <TestProvider
          value={{
            ...accountContext,
            isArticlePersonalizationAvailable: true,
            isSignedIn: initialIsSignedIn,
            isArticlePersonalizationEnabled: initialIsSignedIn,
            isPersonalisationOn: initialIsSignedIn,
          }}
        >
          <StatefulChild />
        </TestProvider>,
      );

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Keep this note' },
      });

      rerender(
        <TestProvider
          value={{
            ...accountContext,
            isArticlePersonalizationAvailable: true,
            isSignedIn: !initialIsSignedIn,
            isArticlePersonalizationEnabled: !initialIsSignedIn,
            isPersonalisationOn: !initialIsSignedIn,
          }}
        >
          <StatefulChild />
        </TestProvider>,
      );

      expect(screen.getByRole('textbox')).toHaveValue('Keep this note');
    },
  );
});
