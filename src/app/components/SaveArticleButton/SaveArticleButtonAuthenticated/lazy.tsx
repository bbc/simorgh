import loadable from 'next/dynamic';
import SaveArticleButtonGuest from '../SaveArticleButtonGuest';

export default loadable(
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
