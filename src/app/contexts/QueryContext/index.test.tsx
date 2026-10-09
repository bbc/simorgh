import { type PropsWithChildren, useState } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import { AccountContextProps } from '#app/models/types/account';
import {
  fireEvent,
  render,
  screen,
} from '#app/components/react-testing-library-with-providers';
import QueryProvider from '.';

jest.mock('next/dynamic', () => () => {
  const MockPersistentQueryProvider = ({ children }: PropsWithChildren) => (
    <div data-testid="persistent-query-provider">{children}</div>
  );

  return MockPersistentQueryProvider;
});

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
  ...overrides
}: PropsWithChildren<Partial<AccountContextProps>>) => (
  <AccountContext.Provider value={{ ...accountContext, ...overrides }}>
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
  it('should render children when no personalization features are available', () => {
    render(
      <TestProvider>
        <p>Page content</p>
      </TestProvider>,
    );

    expect(screen.getByText('Page content')).toBeInTheDocument();
    expect(
      screen.queryByTestId('persistent-query-provider'),
    ).not.toBeInTheDocument();
  });

  it.each([
    {
      feature: 'articles',
      isArticlePersonalizationAvailable: true,
      isTopicPersonalizationAvailable: false,
    },
    {
      feature: 'topics',
      isArticlePersonalizationAvailable: false,
      isTopicPersonalizationAvailable: true,
    },
    {
      feature: 'articles and topics',
      isArticlePersonalizationAvailable: true,
      isTopicPersonalizationAvailable: true,
    },
  ])(
    'should wrap children when $feature are available even while signed out',
    ({
      isArticlePersonalizationAvailable,
      isTopicPersonalizationAvailable,
    }) => {
      render(
        <TestProvider
          isArticlePersonalizationAvailable={isArticlePersonalizationAvailable}
          isTopicPersonalizationAvailable={isTopicPersonalizationAvailable}
        >
          <p>Page content</p>
        </TestProvider>,
      );

      expect(screen.getByTestId('persistent-query-provider')).toContainElement(
        screen.getByText('Page content'),
      );
    },
  );

  it.each([true, false])(
    'should preserve child state when sign-in changes from %s',
    initialIsSignedIn => {
      const { rerender } = render(
        <TestProvider
          isArticlePersonalizationAvailable
          isSignedIn={initialIsSignedIn}
          isArticlePersonalizationEnabled={initialIsSignedIn}
          isPersonalisationOn={initialIsSignedIn}
        >
          <StatefulChild />
        </TestProvider>,
      );

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Keep this note' },
      });

      rerender(
        <TestProvider
          isArticlePersonalizationAvailable
          isSignedIn={!initialIsSignedIn}
          isArticlePersonalizationEnabled={!initialIsSignedIn}
          isPersonalisationOn={!initialIsSignedIn}
        >
          <StatefulChild />
        </TestProvider>,
      );

      expect(screen.getByRole('textbox')).toHaveValue('Keep this note');
    },
  );
});
