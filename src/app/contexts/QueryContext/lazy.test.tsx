import {
  useIsRestoring,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import PersistentQueryProvider from './lazy';

const queryKey = ['query-provider-test'];
const fetchStatus = jest.fn(async () => 'Not saved');

const QueryConsumer = ({ name }: { name: string }) => {
  const queryClient = useQueryClient();
  const isRestoring = useIsRestoring();
  const { data } = useQuery({ queryKey, queryFn: fetchStatus });

  return (
    <button
      type="button"
      aria-label={name}
      disabled={isRestoring}
      onClick={() => queryClient.setQueryData(queryKey, 'Saved')}
    >
      {data}
    </button>
  );
};

describe('PersistentQueryProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
    fetchStatus.mockClear();
  });

  it('shares query data across separate lazy consumers and subsequent mounts', async () => {
    const { unmount } = render(
      <>
        <PersistentQueryProvider>
          <QueryConsumer name="First consumer" />
        </PersistentQueryProvider>
        <PersistentQueryProvider>
          <QueryConsumer name="Second consumer" />
        </PersistentQueryProvider>
      </>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'First consumer' }),
      ).toHaveTextContent('Not saved');
      expect(
        screen.getByRole('button', { name: 'Second consumer' }),
      ).toBeEnabled();
    });
    expect(fetchStatus).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByRole('button', { name: 'First consumer' }));

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Second consumer' }),
      ).toHaveTextContent('Saved');
    });
    await waitFor(
      () => {
        expect(
          window.localStorage.getItem('REACT_QUERY_OFFLINE_CACHE'),
        ).toContain('"data":"Saved"');
      },
      { timeout: 2500 },
    );

    unmount();
    render(
      <PersistentQueryProvider>
        <QueryConsumer name="Next page" />
      </PersistentQueryProvider>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole('button', { name: 'Next page' }),
      ).toHaveTextContent('Saved');
      expect(screen.getByRole('button', { name: 'Next page' })).toBeEnabled();
    });
    expect(fetchStatus).toHaveBeenCalledTimes(1);
  });
});
