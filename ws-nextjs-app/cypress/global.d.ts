import { Article } from '#app/models/types/optimo';

declare global {
  interface Window {
    SIMORGH_DATA: {
      pageData: Article;
    };
  }
}
