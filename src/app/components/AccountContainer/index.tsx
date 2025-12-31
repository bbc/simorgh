import { useMemo } from 'react';
import useIdctaConfig from './hooks/useIdctaConfig';
import MessageBanner from '../MessageBanner';

export default function AccountContainer() {
  // might not be needed?
  const ptrt = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = window.location.href;
    return base;
  }, []);

  const config = useIdctaConfig({
    ptrt,
    userOrigin: 'simorgh',
  });

  const { signInUrl, isSignInAvailable, error, registerUrl } = config;

  if (error || !isSignInAvailable || !signInUrl || !registerUrl) {
    return null;
  }

  console.log({ config, ptrt });

  return (
    <MessageBanner
      heading="World Service - Account Container"
      description="IDCTA integration"
      link={registerUrl}
      linkText="Sign up"
    />
  );
}
