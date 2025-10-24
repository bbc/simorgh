import loadable from '#app/utilities/universalLoadable';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "frosted_promo" */
      '.'
    ),
  { fallback: <span data-testid="frosted-promo-loader" /> },
);
