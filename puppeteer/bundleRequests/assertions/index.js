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

export const assertLoadsExpectedBundles = ({ service }) => {
  it('only loads expected js bundles', () => {
    const serviceRegex = getServiceBundleRegex(service);

    context.page.__requests
      .filter(url => url.endsWith('.js'))
      .filter(isJsBundle)
      .forEach(url => {
        expect(url).toMatch(
          new RegExp(
            `(\\/static\\/js\\/(?:comscore\\/)?(modern.)?(main|framework|commons|shared|${serviceRegex}|frosted_promo|themes|.+Page).+?.js)|(\\/static\\/.+?-lib.+?.js)|${service}\\/(articles\\/)?sw\\.js`,
            'g',
          ),
        );
      });
  });
};

export const assertLoadsModernBundles = ({ service }) => {
  it('loads at least 1 modern service bundle', () => {
    const serviceRegex = getServiceBundleRegex(service);

    const serviceMatches = context.page.__requests.filter(url =>
      url.match(
        new RegExp(`(\\/static\\/js\\/modern.${serviceRegex}.+?.js)`, 'g'),
      ),
    );

    expect(serviceMatches.length).toBeGreaterThanOrEqual(1);
  });
};
