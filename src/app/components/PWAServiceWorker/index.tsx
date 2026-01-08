// PWAServiceWorker.tsx
import { ReactNode } from 'react';
import useIsPWA from '#app/hooks/useIsPWA';
import useServiceWorkerRegistration from '#app/hooks/useServiceWorkerRegistration';
import useSendPWAStatus from '#app/hooks/useSendPWAStatus';

interface Props {
  service?: string;
  children: ReactNode;
}

const PWAServiceWorker = ({ service, children }: Props) => {
  const isPWA = useIsPWA();

  useServiceWorkerRegistration(service);
  useSendPWAStatus(isPWA);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PWAServiceWorker;
