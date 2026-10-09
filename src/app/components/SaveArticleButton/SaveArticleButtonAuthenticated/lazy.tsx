import dynamic from 'next/dynamic';
import SaveArticleButtonGuest from '../SaveArticleButtonGuest';

export default dynamic(
  () =>
    import(
      /* webpackChunkName: "save_article_button_authenticated" */
      '.'
    ),
  {
    ssr: false,
    loading: () => <SaveArticleButtonGuest />,
  },
);
