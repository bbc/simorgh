// PWAServiceWorker.tsx -TEMP Testing will remove later, if not needed
import useIsPWA from '#app/hooks/useIsPWA';
import useServiceWorkerRegistration from '#app/hooks/useServiceWorkerRegistration';
import useSendPWAStatus from '#app/hooks/useSendPWAStatus';

interface Props {
  service?: string;
}

const PWAServiceWorker = ({ service }: Props) => {
  const isPWA = useIsPWA();

  useServiceWorkerRegistration(service);
  useSendPWAStatus(isPWA);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return null;
};

export default PWAServiceWorker;
