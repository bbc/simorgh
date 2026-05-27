/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
import { localBaseUrl } from '#testHelpers/config';
import context from '../../context';

const isJsBundle = url => url.includes(localBaseUrl);

const getServiceBundleRegex = service => {
  const SHARED_RUSSIAN_UKRAINIAN = 'shared-russian-ukrainian';

  switch (service) {
    case 'russian':
      return SHARED_RUSSIAN_UKRAINIAN;
    case 'ukrainian':
      return `${service}|${SHARED_RUSSIAN_UKRAINIAN}`;
    default:
      return service;
  }
};

const staticLibraryScripts = 'comscore\\/|reverb\\/';
const staticLibraryScriptIds = 'main|reverb';

export const assertLoadsExpectedBundles = ({ service }) => {
  it('only loads expected js bundles', () => {
    const serviceRegex = getServiceBundleRegex(service);

    context.page.__requests
      .filter(url => url.endsWith('.js'))
      .filter(isJsBundle)
      .forEach(url => {
        expect(url).toMatch(
          new RegExp(
            `(\\/static\\/js\\/(?:${staticLibraryScripts})?(modern.)?(${staticLibraryScriptIds}|framework|commons|shared|${serviceRegex}|frosted_promo|themes|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)|${service}\\/(articles\\/)?sw\\.js`,
            'g',
          ),
        );
      });
  });
};
