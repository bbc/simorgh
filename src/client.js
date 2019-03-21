import hydrateClient from './client/hydrate';

if (window.crypto || window.msCrypto) {
  hydrateClient();
}
