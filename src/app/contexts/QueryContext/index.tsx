import { use, type PropsWithChildren } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import PersistentQueryProvider from './lazy';

// TanstackQuery Provider is only needed when personalization features are available.
// Keep the wrapper stable from first render when enabled, so children are not mounted
// outside the provider first and then remounted once a lazy provider resolves.
const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isArticlePersonalizationAvailable, isTopicPersonalizationAvailable } =
    use(AccountContext);

  const isAnyPersonalizationAvailable =
    isArticlePersonalizationAvailable || isTopicPersonalizationAvailable;

  if (!isAnyPersonalizationAvailable) return children;

  return <PersistentQueryProvider>{children}</PersistentQueryProvider>;
};

export default QueryProvider;
