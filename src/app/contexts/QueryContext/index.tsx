import { use, type PropsWithChildren } from 'react';
import dynamic from 'next/dynamic';
import useToggle from '#app/hooks/useToggle';
import { ServiceContext } from '#app/contexts/ServiceContext';
import isLocal from '#app/lib/utilities/isLocal';

const PersistentQueryProvider = dynamic(() => import('./lazy'));

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { service } = use(ServiceContext);
  const { enabled: isAccountEnabled } = useToggle('account');
  const { enabled: featureToggleOn, value: accountService } =
    useToggle('uasPersonalization');

  const isPersonalizationEnabled =
    featureToggleOn &&
    (isLocal()
      ? accountService?.toString().split('|').includes(service)
      : true);

  const hasAllTogglesEnabled = [
    isPersonalizationEnabled,
    isAccountEnabled,
  ].every(Boolean);

  if (!hasAllTogglesEnabled) {
    return children;
  }

  return <PersistentQueryProvider>{children}</PersistentQueryProvider>;
};

export default QueryProvider;
