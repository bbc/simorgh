import { Suspense, use, type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import { AccountContext } from '#app/contexts/AccountContext';

const PersistentQueryProvider = dynamic(() => import('./lazy'));

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isPersonalizationEnabled } = use(AccountContext);

  if (!isPersonalizationEnabled) return children;

  // Suspense fallback renders children directly while the dynamic chunk loads,
  // preventing a duplicate DOM render that would occur during the loading gap.
  return (
    <Suspense fallback={children}>
      <PersistentQueryProvider>{children}</PersistentQueryProvider>
    </Suspense>
  );
};

export default QueryProvider;
