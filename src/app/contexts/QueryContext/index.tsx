import { use, type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import useToggle from '#app/hooks/useToggle';
import { AccountContext } from '#app/contexts/AccountContext';

const PersistentQueryProvider = dynamic(() => import('./lazy'));

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { isSignedIn } = use(AccountContext);
  const { enabled: isAccountEnabled } = useToggle('account');
  const { enabled: isPersonalizationEnabled } = useToggle('uasPersonalization');

  const shouldRenderQueryProvider = [
    isPersonalizationEnabled,
    isAccountEnabled,
    isSignedIn,
  ].every(Boolean);

  if (!shouldRenderQueryProvider) {
    return children;
  }

  return <PersistentQueryProvider>{children}</PersistentQueryProvider>;
};

export default QueryProvider;
