import { use, type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { AccountContext } from '#app/contexts/AccountContext';

const PersistentQueryProvider = dynamic(() => import('./lazy'));

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isPersonalizationEnabled } = use(AccountContext);

  if (!isPersonalizationEnabled) return children;

  return <PersistentQueryProvider>{children}</PersistentQueryProvider>;
};

export default QueryProvider;
