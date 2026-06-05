import { IdctaConfig } from '#app/models/types/account';

const mockIdctaConfig: IdctaConfig = {
  'id-availability': 'GREEN',
  availability: {
    refresh: 'GREEN',
  },
  unavailable_url: 'https://example.com/unavailable',
  signin_url: 'https://example.com/signin',
  register_url: 'https://example.com/register',
  settings_url: 'https://example.com/settings',
  signout_url: 'https://example.com/signout',
  foryou_url: 'https://example.com/for-you',
  initialIsSignedIn: false,
  identity: {
    idSignedInCookieName: 'ckns_id',
  },
};

export default mockIdctaConfig;
