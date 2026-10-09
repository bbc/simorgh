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

// TanstackQuery Provider is only needed when personalization features are available.
// This prevents the unnecessary loading of the Tanstack Query library and its dependencies.
// Gated on availability rather than sign-in state so the tree shape never changes between
// the server render, hydration and sign-in changes, which would remount the whole page.
const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isArticlePersonalizationAvailable, isTopicPersonalizationAvailable } =
    use(AccountContext);

  const isAnyPersonalizationAvailable =
    isArticlePersonalizationAvailable || isTopicPersonalizationAvailable;

  if (!isAnyPersonalizationAvailable) return children;

  return (
    <Suspense fallback={children}>
      <PersistentQueryProvider>{children}</PersistentQueryProvider>
    </Suspense>
  );
};

export default QueryProvider;
