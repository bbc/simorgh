import dynamic from 'next/dynamic';
import SaveArticleButtonGuest from '../SaveArticleButtonGuest';

export default dynamic(
  () =>
    Promise.all([
      import(
        /* webpackChunkName: "query_provider" */
        '#app/contexts/QueryContext'
      ),
      import(
        /* webpackChunkName: "save_article_button_authenticated" */
        '.'
      ),
    ]).then(([{ withQueryProvider }, { default: Component }]) =>
      withQueryProvider(Component),
    ),
  {
    ssr: false,
    loading: () => <SaveArticleButtonGuest />,
  },
);
