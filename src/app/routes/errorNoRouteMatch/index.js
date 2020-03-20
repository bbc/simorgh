import { ErrorPage } from '#pages';

export default {
  component: ErrorPage,
  getInitialData: () => Promise.resolve({ status: 404, errorCode: 404 }),
  pageType: 'error',
};
