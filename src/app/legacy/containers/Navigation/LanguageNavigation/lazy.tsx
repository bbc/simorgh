import loadable from '#app/utilities/universalLoadable';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "language_navigation" */
      '.'
    ),
);
