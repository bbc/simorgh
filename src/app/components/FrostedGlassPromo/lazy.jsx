import loadable from '@loadable/component';

export default loadable(() =>
  import(
    /* webpackChunkName: "frosted_promo" */
    '.'
  ),
);
