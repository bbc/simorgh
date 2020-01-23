import article from './article';
import index from './index/index';
import cpsAsset from './cpsAsset';
import error from './error';
import radio from './radio';

export default [
  index,
  article,
  radio,
  cpsAsset,
  error,
  // {
  //   component: ErrorPage,
  //   getInitialData: () => Promise.resolve({ status: 404 }),
  //   pageType: 'error',
  // },
];
