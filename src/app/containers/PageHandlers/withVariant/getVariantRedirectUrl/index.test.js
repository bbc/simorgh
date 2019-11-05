import Cookie from 'js-cookie';
import {
  getVariant,
  servicesWithVariants,
} from '#lib/utilities/variantHandler';
import { articleRegexPath, frontpageRegexPath } from '#app/routes/regex';
import getVariantRedirectUrl from './index';

jest.mock('js-cookie', () => ({
  cookies: {},
  get(key) {
    return this.cookies[key];
  },
  set(key, value) {
    this.cookies[key] = value;
    return this;
  },
  reset() {
    this.cookies = {};
    return this;
  },
}));

const serviceNames = Object.keys(servicesWithVariants);

describe('getVariantRedirectUrl', () => {
  afterEach(() => {
    jest.clearAllMocks();
    Cookie.reset();
  });

  describe('frontPage', () => {
    describe('empty cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}`, () => {
          it(`should redirect to /${service}/${defaultVariant}`, () => {
            const params = {
              service,
              variant: null,
            };
            const props = {
              match: {
                path: frontpageRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(props, params.service);
            expect(redirectUrl).toEqual(`/${service}/${defaultVariant}`);
          });
        });
      });
    });

    describe('empty cookie, and with variant specified in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        describe(`visit /${service}/${selectedVariant}`, () => {
          it(`should return null`, () => {
            const params = {
              service,
              variant: selectedVariant,
            };
            const props = {
              match: {
                path: frontpageRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(
              props,
              params.service,
              selectedVariant,
            );
            expect(redirectUrl).toEqual(null);
          });
        });
      });
    });

    describe('variant in cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        describe(`visit /${service}`, () => {
          it(`should redirect to /${service}/${selectedVariant}`, () => {
            Cookie.set(`ckps_${service}`, selectedVariant);
            const params = {
              service,
              variant: null,
            };
            const props = {
              match: {
                path: frontpageRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(props, params.service);
            expect(redirectUrl).toEqual(`/${service}/${selectedVariant}`);
          });
        });
      });
    });

    describe('variant in cookie, and variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}/${defaultVariant}`, () => {
          it(`should redirect to /${service}/${selectedVariant}`, () => {
            Cookie.set(`ckps_${service}`, selectedVariant);
            const params = {
              service,
              variant: defaultVariant,
            };
            const props = {
              match: {
                path: frontpageRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(
              props,
              params.service,
              defaultVariant,
            );
            expect(redirectUrl).toEqual(`/${service}/${selectedVariant}`);
          });
        });
      });
    });
  });

  describe('article', () => {
    const id = 'c3xd4x9prgyo';
    const local = 'articles';
    describe('empty cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}/${local}/${id}`, () => {
          it(`should redirect to /${service}/${local}/${id}/${defaultVariant}`, () => {
            const params = {
              id,
              local,
              service,
              variant: null,
            };
            const props = {
              match: {
                path: articleRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(props, params.service);
            expect(redirectUrl).toEqual(
              `/${service}/${local}/${id}/${defaultVariant}`,
            );
          });
        });
      });
    });

    describe('empty cookie, and with variant specified in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        describe(`visit /${service}/${local}/${id}/${selectedVariant}`, () => {
          it(`should return null`, () => {
            const params = {
              id,
              local,
              service,
              variant: selectedVariant,
            };
            const props = {
              match: {
                path: articleRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(
              props,
              params.service,
              selectedVariant,
            );
            expect(redirectUrl).toEqual(null);
          });
        });
      });
    });

    describe('variant in cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        describe(`visit /${service}/${local}/${id}`, () => {
          it(`should redirect to /${service}/${local}/${id}/${selectedVariant}`, () => {
            Cookie.set(`ckps_${service}`, selectedVariant);
            const params = {
              id,
              local,
              service,
              variant: null,
            };
            const props = {
              match: {
                path: articleRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(props, params.service);
            expect(redirectUrl).toEqual(
              `/${service}/${local}/${id}/${selectedVariant}`,
            );
          });
        });
      });
    });

    describe('variant in cookie, and variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const selectedVariant = variants[variants.length - 1];
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}/${local}/${id}/${defaultVariant}`, () => {
          it(`should redirect to /${service}/${local}/${id}/${selectedVariant}`, () => {
            Cookie.set(`ckps_${service}`, selectedVariant);
            const params = {
              id,
              local,
              service,
              variant: defaultVariant,
            };
            const props = {
              match: {
                path: articleRegexPath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl(
              props,
              params.service,
              defaultVariant,
            );
            expect(redirectUrl).toEqual(
              `/${service}/${local}/${id}/${selectedVariant}`,
            );
          });
        });
      });
    });
  });
});
