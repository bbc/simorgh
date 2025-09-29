import { Article } from '#app/models/types/optimo';

declare global {
  interface Window {
    __NEXT_DATA__: {
      props: {
        pageProps: {
          pageData: Article;
        };
      };
    };
  }
}
