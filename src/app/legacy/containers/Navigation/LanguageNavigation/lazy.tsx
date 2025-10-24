import loadable from 'next/dynamic';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "language_navigation" */
      '.'
    ),
);
