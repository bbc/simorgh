import { ErrorPage } from '#pages';

export default {
  component: ErrorPage,
  getInitialData: () => Promise.resolve({ errorCode: 404 }),
  pageType: 'error',
};
