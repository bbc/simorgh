import { useMemo } from 'react';
import useIdctaConfig from './hooks/useIdctaConfig';
import MessageBanner from '../MessageBanner';
import { isSignedIn } from './idcta/isSignedIn';

export default function AccountContainer() {
  // might not be needed?
  const ptrt = useMemo(() => {
    if (typeof window === 'undefined') return '';
    const base = window.location.href;
    return base;
  }, []);

  const config = useIdctaConfig({
    // TODO: Temp - used for testing
    ptrt: 'https://www.bbc.com/hindi?test=true',
    userOrigin: 'simorgh',
  });

  const { signInUrl, isSignInAvailable, error, registerUrl } = config;

  if (error || !isSignInAvailable || !signInUrl || !registerUrl) {
    return null;
  }

  const isUserSignedIn = isSignedIn();

  console.log({ config, ptrt, isUserSignedIn });

  return (
    <div>
      <MessageBanner
        heading="Account Container - Register"
        link={registerUrl}
        description={`Already signed in: ${isUserSignedIn}`}
        linkText="Register"
      />
      <MessageBanner
        heading="World Service - Sign In"
        description={`Already signed in: ${isUserSignedIn}`}
        link={signInUrl}
        linkText="Sign in"
      />
    </div>
  );
}
