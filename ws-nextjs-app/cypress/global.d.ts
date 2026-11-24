import { LanguagesPageProps } from '../pages/ws/types';

declare global {
  interface Window {
    __NEXT_DATA__: {
      props: {
        pageProps: LanguagesPageProps;
      };
    };
  }
}
