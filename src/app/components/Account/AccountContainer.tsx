import { use } from 'react';
import MessageBanner from '../MessageBanner';
import { AccountContext } from './AccountContext';

export default function AccountContainer() {
  const { isSignInAvailable, signInUrl, registerUrl } = use(AccountContext);

  if (!isSignInAvailable || !signInUrl || !registerUrl) {
    return null;
  }

  return (
    <div>
      <MessageBanner
        heading="Account Container - Register"
        link={registerUrl}
        linkText="Register"
      />
      <MessageBanner
        heading="World Service - Sign In"
        link={signInUrl}
        linkText="Sign in"
      />
    </div>
  );
}
