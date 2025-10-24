import loadable from 'next/dynamic';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "frosted_promo" */
      '.'
    ),
  // @ts-expect-error - test
  { fallback: <span data-testid="frosted-promo-loader" /> },
);
