import dynamic from 'next/dynamic';

const ArticleNotFoundUASCleanup = dynamic(
  () =>
    Promise.all([
      import(
        /* webpackChunkName: "query_provider" */
        '#app/contexts/QueryContext'
      ),
      import('./ArticleNotFoundUASCleanup'),
    ]).then(([{ withQueryProvider }, { default: Component }]) =>
      withQueryProvider(Component),
    ),
  { ssr: false },
);

export default ArticleNotFoundUASCleanup;
