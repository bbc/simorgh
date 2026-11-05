import { use, type PropsWithChildren } from 'react';
import { AccountContext } from '#app/contexts/AccountContext';
import PersistentQueryProvider from './lazy';

// Load this module with query consumers, not around page content or embeds.
const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isArticlePersonalizationAvailable, isTopicPersonalizationAvailable } =
    use(AccountContext);

  const isAnyPersonalizationAvailable =
    isArticlePersonalizationAvailable || isTopicPersonalizationAvailable;

  if (!isAnyPersonalizationAvailable) return children;

  return <PersistentQueryProvider>{children}</PersistentQueryProvider>;
};

export default QueryProvider;
