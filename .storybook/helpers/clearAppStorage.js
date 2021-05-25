import Cookies from 'js-cookie';

export default () => {
  ['ckns_policy', 'ckns_explicit', 'ckns_privacy'].forEach(Cookies.remove);
  window.localStorage.removeItem(`amp-store:${window.location.origin}`);
};
