import { isSignedIn } from './idcta/isSignedIn';

// TODO: Render an icon with different state
// 1. Render Sign in icon with URL
// 2. Render My Account button
// 3. Render Sign out button (as a test?)
const HeaderAccount = () => {
  const isUserSignedIn = isSignedIn();

  return <div>Sign In: {String(isUserSignedIn)}</div>;
};

export default HeaderAccount;
