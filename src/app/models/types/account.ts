/* eslint-disable camelcase */
type FlagpoleStatus = 'GREEN' | 'RED';

export type IdctaConfig = {
  'id-availability': FlagpoleStatus;
  unavailable_url: string;
  signin_url: string;
  register_url: string;
  settings_url: string;
  signout_url: string;
  identity: {
    idSignedInCookieName: string;
  };
};

export type AccountContextProps = {
  idIdctaAvailable: boolean;
  isSignedIn: boolean;
  signInUrl?: string;
  registerUrl?: string;
  settingsUrl?: string;
  signOutUrl?: string;
};
