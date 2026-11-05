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
import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import loadQueryConsumer from './loadQueryConsumer';

const renderOptions = {
  service: 'hindi' as const,
  idctaConfig: { ...mockIdctaConfig, initialIsSignedIn: true },
  toggles: {
    uasPersonalization: { enabled: true, value: 'hindi' },
  },
};
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

describe('loadQueryConsumer', () => {
  beforeEach(() => {
    window.localStorage.clear();
    fetchStatus.mockClear();
  });

  it('waits for the consumer and supplies its query context and props', async () => {
    const Consumer = ({ label }: { label: string }) => {
      useQueryClient();
      const isRestoring = useIsRestoring();
      if (isRestoring) return <p>Restoring queries</p>;
      return <p>{label}</p>;
    };
    const pending = Promise.withResolvers<{ default: typeof Consumer }>();
    const loading = loadQueryConsumer(pending.promise);
    const onLoaded = jest.fn();
    loading.then(onLoaded);

    await Promise.resolve();
    expect(onLoaded).not.toHaveBeenCalled();
    pending.resolve({ default: Consumer });
    const LoadedConsumer = await loading;

    render(<LoadedConsumer label="Query consumer" />, renderOptions);
    expect(await screen.findByText('Query consumer')).toBeInTheDocument();
  });

  it('propagates loading failures instead of mounting an unwrapped consumer', async () => {
    const error = new Error('Failed to load query consumer');

    await expect(
      loadQueryConsumer<{ name: string }>(Promise.reject(error)),
    ).rejects.toBe(error);
  });

  it('shares and persists query data across independently loaded consumers and subsequent mounts', async () => {
    const loadConsumer = () =>
      loadQueryConsumer(Promise.resolve({ default: QueryConsumer }));
    const FirstConsumer = await loadConsumer();
    const SecondConsumer = await loadConsumer();
    const { unmount } = render(
      <>
        <FirstConsumer name="First consumer" />
        <SecondConsumer name="Second consumer" />
      </>,
      renderOptions,
    );
    const firstButton = screen.getByRole('button', { name: 'First consumer' });
    const secondButton = screen.getByRole('button', {
      name: 'Second consumer',
    });

    await waitFor(() => {
      expect(firstButton).toHaveTextContent('Not saved');
      expect(secondButton).toBeEnabled();
    });
    expect(fetchStatus).toHaveBeenCalledTimes(1);

    fireEvent.click(firstButton);

    await waitFor(() => {
      expect(secondButton).toHaveTextContent('Saved');
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
    const NextConsumer = await loadConsumer();
    render(<NextConsumer name="Next page" />, renderOptions);

    await waitFor(() => {
      const nextPage = screen.getByRole('button', { name: 'Next page' });
      expect(nextPage).toHaveTextContent('Saved');
      expect(nextPage).toBeEnabled();
    });
    expect(fetchStatus).toHaveBeenCalledTimes(1);
  });
});
