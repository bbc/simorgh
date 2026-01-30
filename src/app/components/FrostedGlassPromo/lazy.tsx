import loadable from 'next/dynamic';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "frosted_promo" */
      '.'
    ),
);
