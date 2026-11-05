import dynamic from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import SaveArticleButtonGuest from '../SaveArticleButtonGuest';

export default dynamic(
  () =>
    loadQueryConsumer(
      import(
        /* webpackChunkName: "save_article_button_authenticated" */
        '.'
      ),
    ),
  {
    ssr: false,
    loading: () => <SaveArticleButtonGuest />,
  },
);
