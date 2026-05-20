import { type PropsWithChildren } from 'react';

import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';

const isClientError = (error: unknown) => {
  const status = (error as { status?: number })?.status;
  return status !== undefined && status >= 400 && status < 500;
};

const retryConfig = {
  retry: (failureCount: number, error: unknown) =>
    !isClientError(error) && failureCount < 3,
};

const STALE_TIME = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...retryConfig,
      staleTime: STALE_TIME,
      refetchOnWindowFocus: false,
    },
    mutations: retryConfig,
  },
});

const persister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? window.localStorage : undefined,
});

const PersistentQueryProvider = ({ children }: PropsWithChildren) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister, maxAge: STALE_TIME }}
  >
    {children}
  </PersistQueryClientProvider>
);

export default PersistentQueryProvider;
