/* eslint-disable camelcase */
type FlagpoleStatus = 'GREEN' | 'RED';

export type IdctaConfig = {
  'id-availability': FlagpoleStatus;
  unavailable_url: string;
  signin_url: string;
  register_url: string;
  settings_url: string;
  signout_url: string;
  foryou_url: string;
  initialIsSignedIn?: boolean;
  identity: {
    idSignedInCookieName: string;
  };
  env?: string | null;
};

export type AccountContextProps = {
  isIdctaAvailable: boolean;
  isSignedIn: boolean;
  signInUrl?: string;
  registerUrl?: string;
  settingsUrl?: string;
  signOutUrl?: string;
  forYouUrl?: string;
};
