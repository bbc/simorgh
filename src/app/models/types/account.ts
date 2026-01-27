/* eslint-disable camelcase */
type FlagpoleStatus = 'GREEN' | 'RED';

// Partial IDCTA Config. Add additional types if needed;
export type IdctaConfig = {
  availability: {
    signin: FlagpoleStatus;
  };
  'foryou-flagpole': FlagpoleStatus;
  unavailable_url: string;
  signin_url: string;
  register_url: string;
  foryou_url: string;
  settings_url: string;
  identity: {
    accessTokenCookieName: string;
    cookieAgeDays: number;
    idSignedInCookieName: string;
  };
};

export type AccountContextProps = {
  isSignInAvailable: boolean;
  isSignedIn: boolean;
  accountUrl?: string;
  signInUrl?: string;
  registerUrl?: string;
};
