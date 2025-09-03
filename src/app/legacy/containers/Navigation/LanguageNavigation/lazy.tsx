import loadable from '@loadable/component';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "language_navigation" */
      '.'
    ),
);
