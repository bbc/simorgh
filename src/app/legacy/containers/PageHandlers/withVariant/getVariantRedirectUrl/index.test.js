import Cookie from 'js-cookie';
import { getVariantCookieName } from '#lib/utilities/variantHandler';
import { articlePath, frontPagePath } from '#app/routes/utils/regex';
import getVariantRedirectUrl from './index';

describe('getVariantRedirectUrl', () => {
  afterEach(() => {
    document.cookie = '';
  });

  describe('frontPage', () => {
    describe('empty cookie, and no variant in url', () => {
      it.each`
        service       | behaviour        | expected
        ${'serbian'}  | ${'redirect to'} | ${'/serbian/lat'}
        ${'ukchina'}  | ${'redirect to'} | ${'/ukchina/simp'}
        ${'uzbek'}    | ${'return'}      | ${null}
        ${'zhongwen'} | ${'redirect to'} | ${'/zhongwen/simp'}
      `(
        'visit /$service should $behaviour $expected',
        ({ service, expected }) => {
          const params = {
            service,
            variant: null,
          };
          const props = {
            match: {
              path: frontPagePath,
              params,
              pageType: 'home',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('empty cookie, and with variant specified in url', () => {
      it.each`
        service       | secondaryVariant | behaviour                             | expected
        ${'serbian'}  | ${'cyr'}         | ${'return'}                           | ${null}
        ${'ukchina'}  | ${'trad'}        | ${'return'}                           | ${null}
        ${'uzbek'}    | ${'lat'}         | ${'not be handled so it will return'} | ${null}
        ${'zhongwen'} | ${'trad'}        | ${'return'}                           | ${null}
      `(
        'visit $service/$secondaryVariant should $behaviour $expected',
        ({ service, secondaryVariant, expected }) => {
          const params = {
            service,
            variant: secondaryVariant,
          };
          const props = {
            match: {
              path: frontPagePath,
              params,
              pageType: 'home',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('variant in cookie, and no variant in url', () => {
      it.each`
        service       | secondaryVariant | behaviour                                  | expected
        ${'serbian'}  | ${'cyr'}         | ${'redirect to'}                           | ${'/serbian/cyr'}
        ${'ukchina'}  | ${'trad'}        | ${'redirect to'}                           | ${'/ukchina/trad'}
        ${'uzbek'}    | ${'lat'}         | ${'not be handled so it will redirect to'} | ${'/uzbek/lat'}
        ${'zhongwen'} | ${'trad'}        | ${'redirect to'}                           | ${'/zhongwen/trad'}
      `(
        'visit $service should $behaviour $expected',
        ({ service, secondaryVariant, expected }) => {
          Cookie.set(`ckps_${getVariantCookieName(service)}`, secondaryVariant);
          const params = {
            service,
            variant: null,
          };
          const props = {
            match: {
              path: frontPagePath,
              params,
              pageType: 'home',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('variant in cookie, and variant in url', () => {
      it.each`
        service       | defaultVariant | secondaryVariant | behaviour                                  | expected
        ${'serbian'}  | ${'lat'}       | ${'cyr'}         | ${'redirect to'}                           | ${'/serbian/cyr'}
        ${'ukchina'}  | ${'simp'}      | ${'trad'}        | ${'redirect to'}                           | ${'/ukchina/trad'}
        ${'uzbek'}    | ${'cyr'}       | ${'lat'}         | ${'not be handled so it will redirect to'} | ${'/uzbek/lat'}
        ${'zhongwen'} | ${'simp'}      | ${'trad'}        | ${'redirect to'}                           | ${'/zhongwen/trad'}
      `(
        'visit $service/$defaultVariant should $behaviour $expected',
        ({ service, defaultVariant, secondaryVariant, expected }) => {
          Cookie.set(`ckps_${getVariantCookieName(service)}`, secondaryVariant);
          const params = {
            service,
            variant: defaultVariant,
          };
          const props = {
            match: {
              path: frontPagePath,
              params,
              pageType: 'home',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('invalid variant in cookie', () => {
      it.each`
        service       | invalidSecondaryVariant | behaviour        | expected
        ${'serbian'}  | ${'xyz'}                | ${'redirect to'} | ${'/serbian/lat'}
        ${'ukchina'}  | ${'xyz'}                | ${'redirect to'} | ${'/ukchina/simp'}
        ${'uzbek'}    | ${'xyz'}                | ${'return'}      | ${null}
        ${'zhongwen'} | ${'xyz'}                | ${'redirect to'} | ${'/zhongwen/simp'}
      `(
        'visit $service should $behaviour $expected',
        ({ service, invalidSecondaryVariant, expected }) => {
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
              pageType: 'home',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });
  });

  describe('article', () => {
    const id = 'c3xd4x9prgyo';
    const local = 'articles';
    describe('empty cookie, and no variant in url', () => {
      it.each`
        service       | path                       | behaviour        | expected
        ${'serbian'}  | ${'articles/c3xd4x9prgyo'} | ${'redirect to'} | ${'/serbian/articles/c3xd4x9prgyo/lat'}
        ${'ukchina'}  | ${'articles/c3xd4x9prgyo'} | ${'redirect to'} | ${'/ukchina/articles/c3xd4x9prgyo/simp'}
        ${'uzbek'}    | ${'articles/c3xd4x9prgyo'} | ${'redirect to'} | ${'/uzbek/articles/c3xd4x9prgyo/cyr'}
        ${'zhongwen'} | ${'articles/c3xd4x9prgyo'} | ${'redirect to'} | ${'/zhongwen/articles/c3xd4x9prgyo/simp'}
      `(
        'visit /$service/$path should $behaviour $expected',
        ({ service, expected }) => {
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
              pageType: 'article',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('empty cookie, and with variant specified in url', () => {
      it.each`
        service       | path                       | secondaryVariant | behaviour   | expected
        ${'serbian'}  | ${'articles/c3xd4x9prgyo'} | ${'cyr'}         | ${'return'} | ${null}
        ${'ukchina'}  | ${'articles/c3xd4x9prgyo'} | ${'trad'}        | ${'return'} | ${null}
        ${'uzbek'}    | ${'articles/c3xd4x9prgyo'} | ${'lat'}         | ${'return'} | ${null}
        ${'zhongwen'} | ${'articles/c3xd4x9prgyo'} | ${'trad'}        | ${'return'} | ${null}
      `(
        'visit /$service/$path/$secondaryVariant should $behaviour $expected',
        ({ service, expected, secondaryVariant }) => {
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
              pageType: 'article',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('variant in cookie, and no variant in url', () => {
      it.each`
        service       | path                       | secondaryVariant | behaviour        | expected
        ${'serbian'}  | ${'articles/c3xd4x9prgyo'} | ${'cyr'}         | ${'redirect to'} | ${'/serbian/articles/c3xd4x9prgyo/cyr'}
        ${'ukchina'}  | ${'articles/c3xd4x9prgyo'} | ${'trad'}        | ${'redirect to'} | ${'/ukchina/articles/c3xd4x9prgyo/trad'}
        ${'uzbek'}    | ${'articles/c3xd4x9prgyo'} | ${'lat'}         | ${'redirect to'} | ${'/uzbek/articles/c3xd4x9prgyo/lat'}
        ${'zhongwen'} | ${'articles/c3xd4x9prgyo'} | ${'trad'}        | ${'redirect to'} | ${'/zhongwen/articles/c3xd4x9prgyo/trad'}
      `(
        'visit /$service/$path should $behaviour $expected',
        ({ service, expected, secondaryVariant }) => {
          Cookie.set(`ckps_${getVariantCookieName(service)}`, secondaryVariant);
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
              pageType: 'article',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('variant in cookie, and variant in url', () => {
      it.each`
        service       | path                       | defaultVariant | secondaryVariant | behaviour        | expected
        ${'serbian'}  | ${'articles/c3xd4x9prgyo'} | ${'lat'}       | ${'cyr'}         | ${'redirect to'} | ${'/serbian/articles/c3xd4x9prgyo/cyr'}
        ${'ukchina'}  | ${'articles/c3xd4x9prgyo'} | ${'simp'}      | ${'trad'}        | ${'redirect to'} | ${'/ukchina/articles/c3xd4x9prgyo/trad'}
        ${'uzbek'}    | ${'articles/c3xd4x9prgyo'} | ${'cyr'}       | ${'lat'}         | ${'redirect to'} | ${'/uzbek/articles/c3xd4x9prgyo/lat'}
        ${'zhongwen'} | ${'articles/c3xd4x9prgyo'} | ${'simp'}      | ${'trad'}        | ${'redirect to'} | ${'/zhongwen/articles/c3xd4x9prgyo/trad'}
      `(
        'visit /$service/$path/$defaultVariant should $behaviour $expected',
        ({ service, expected, defaultVariant, secondaryVariant }) => {
          Cookie.set(`ckps_${getVariantCookieName(service)}`, secondaryVariant);
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
              pageType: 'article',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });

    describe('invalid variant in cookie', () => {
      it.each`
        service       | path                       | invalidSecondaryVariant | behaviour        | expected
        ${'serbian'}  | ${'articles/c3xd4x9prgyo'} | ${'xyz'}                | ${'redirect to'} | ${'/serbian/articles/c3xd4x9prgyo/lat'}
        ${'ukchina'}  | ${'articles/c3xd4x9prgyo'} | ${'xyz'}                | ${'redirect to'} | ${'/ukchina/articles/c3xd4x9prgyo/simp'}
        ${'uzbek'}    | ${'articles/c3xd4x9prgyo'} | ${'xyz'}                | ${'redirect to'} | ${'/uzbek/articles/c3xd4x9prgyo/cyr'}
        ${'zhongwen'} | ${'articles/c3xd4x9prgyo'} | ${'xyz'}                | ${'redirect to'} | ${'/zhongwen/articles/c3xd4x9prgyo/simp'}
      `(
        'visit /$service/$path should $behaviour $expected',
        ({ service, expected, invalidSecondaryVariant }) => {
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
              pageType: 'article',
            },
          };
          const redirectUrl = getVariantRedirectUrl({
            ...props.match,
            ...params,
          });
          expect(redirectUrl).toEqual(expected);
        },
      );
    });
  });
});
