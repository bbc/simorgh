import article from './article';
import frontPage from './frontPage';
import cpsAssetPage from './cpsAssetPage';
import errorPage from './errorPage';
import radioPage from './radioPage';

export default [
  article,
  frontPage,
  radioPage,
  cpsAssetPage,
  radioPage,
  errorPage,
  // {
  //   component: ErrorPage,
  //   getInitialData: () => Promise.resolve({ status: 404 }),
  //   pageType: 'error',
  // },
];
