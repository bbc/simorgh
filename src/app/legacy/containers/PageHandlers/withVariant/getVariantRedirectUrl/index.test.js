import Cookie from 'js-cookie';
import {
  getVariant,
  servicesWithVariants,
  getVariantCookieName,
} from '#lib/utilities/variantHandler';
import { articlePath, frontPagePath } from '#app/routes/utils/regex';
import getVariantRedirectUrl from './index';

const serviceNames = Object.keys(servicesWithVariants);

describe('getVariantRedirectUrl', () => {
  afterEach(() => {
    document.cookie = '';
  });

  describe('frontPage', () => {
    describe('empty cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const defaultVariant = getVariant({ service });
        const expected =
          defaultVariant === 'default' ? null : `/${service}/${defaultVariant}`;
        describe(`visit /${service}`, () => {
          it(`should redirect to ${expected}`, () => {
            const params = {
              service,
              variant: null,
            };
            const props = {
              match: {
                path: frontPagePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(expected);
          });
        });
      });
    });

    describe('empty cookie, and with variant specified in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        describe(`visit /${service}/${secondaryVariant}`, () => {
          it(`should return null`, () => {
            const params = {
              service,
              variant: secondaryVariant,
            };
            const props = {
              match: {
                path: frontPagePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(null);
          });
        });
      });
    });

    describe('variant in cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        describe(`visit /${service}`, () => {
          it(`should redirect to /${service}/${secondaryVariant}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              secondaryVariant,
            );
            const params = {
              service,
              variant: null,
            };
            const props = {
              match: {
                path: frontPagePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(`/${service}/${secondaryVariant}`);
          });
        });
      });
    });

    describe('variant in cookie, and variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}/${defaultVariant}`, () => {
          it(`should redirect to /${service}/${secondaryVariant}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              secondaryVariant,
            );
            const params = {
              service,
              variant: defaultVariant,
            };
            const props = {
              match: {
                path: frontPagePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(`/${service}/${secondaryVariant}`);
          });
        });
      });
    });

    describe('invalid variant in cookie', () => {
      serviceNames.forEach(service => {
        const invalidSecondaryVariant = 'xyz';
        const defaultVariant = getVariant({ service });
        const expected =
          defaultVariant === 'default' ? null : `/${service}/${defaultVariant}`;
        describe(`visit /${service}`, () => {
          it(`should redirect to ${expected}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              invalidSecondaryVariant,
            );
            const params = {
              service,
              variant: null,
            };
            const props = {
              match: {
                path: frontPagePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(expected);
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
        const expected =
          defaultVariant === 'default'
            ? null
            : `/${service}/${local}/${id}/${defaultVariant}`;
        describe(`visit /${service}/${local}/${id}`, () => {
          it(`should redirect to ${expected}`, () => {
            const params = {
              id,
              local,
              service,
              variant: null,
            };
            const props = {
              match: {
                path: articlePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(expected);
          });
        });
      });
    });

    describe('empty cookie, and with variant specified in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        describe(`visit /${service}/${local}/${id}/${secondaryVariant}`, () => {
          it(`should return null`, () => {
            const params = {
              id,
              local,
              service,
              variant: secondaryVariant,
            };
            const props = {
              match: {
                path: articlePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(null);
          });
        });
      });
    });

    describe('variant in cookie, and no variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        describe(`visit /${service}/${local}/${id}`, () => {
          it(`should redirect to /${service}/${local}/${id}/${secondaryVariant}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              secondaryVariant,
            );
            const params = {
              id,
              local,
              service,
              variant: null,
            };
            const props = {
              match: {
                path: articlePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(
              `/${service}/${local}/${id}/${secondaryVariant}`,
            );
          });
        });
      });
    });

    describe('variant in cookie, and variant in url', () => {
      serviceNames.forEach(service => {
        const variants = servicesWithVariants[service];
        const [, secondaryVariant] = variants;
        const defaultVariant = getVariant({ service });
        describe(`visit /${service}/${local}/${id}/${defaultVariant}`, () => {
          it(`should redirect to /${service}/${local}/${id}/${secondaryVariant}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              secondaryVariant,
            );
            const params = {
              id,
              local,
              service,
              variant: defaultVariant,
            };
            const props = {
              match: {
                path: articlePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(
              `/${service}/${local}/${id}/${secondaryVariant}`,
            );
          });
        });
      });
    });

    // should rewrite tests to match this format IF this logic is correct
    describe('invalid variant in cookie', () => {
      serviceNames.forEach(service => {
        const invalidSecondaryVariant = 'xyz';
        const defaultVariant = getVariant({ service });
        const expected =
          defaultVariant === 'default'
            ? { outcome: null, behaviour: 'return' }
            : {
                outcome: `/${service}/${local}/${id}/${defaultVariant}`,
                behaviour: 'redirect to',
              };
        describe(`visit /${service}/${local}/${id}`, () => {
          it(`should ${expected.behaviour} ${expected.outcome}`, () => {
            Cookie.set(
              `ckps_${getVariantCookieName(service)}`,
              invalidSecondaryVariant,
            );
            const params = {
              id,
              local,
              service,
              variant: null,
            };
            const props = {
              match: {
                path: articlePath,
                params,
              },
            };
            const redirectUrl = getVariantRedirectUrl({
              ...props.match,
              ...params,
            });
            expect(redirectUrl).toEqual(expected.outcome);
          });
        });
      });
    });
  });
});
