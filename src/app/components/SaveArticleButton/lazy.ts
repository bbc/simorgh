import loadable from 'next/dynamic';

export default loadable(
  () =>
    import(
      /* webpackChunkName: "save_article_button" */
      '.'
    ),
);
