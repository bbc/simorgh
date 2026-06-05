import { Suspense, use, type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { AccountContext } from '#app/contexts/AccountContext';

const PersistentQueryProvider = dynamic(
  () =>
    import(
      /* webpackChunkName: "query_provider" */
      './lazy'
    ),
);

// TanstackQuery Provider is only needed when personalization features are enabled.
// This prevents the unnecessary loading of the Tanstack Query library and its dependencies
const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isPersonalizationEnabled } = use(AccountContext);

  if (!isPersonalizationEnabled) return children;

  return (
    <Suspense fallback={children}>
      <PersistentQueryProvider>{children}</PersistentQueryProvider>
    </Suspense>
  );
};

export default QueryProvider;
