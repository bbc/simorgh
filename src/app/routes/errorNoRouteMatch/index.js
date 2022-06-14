import { ErrorPage } from '#pages';
import { ERROR_PAGE } from '#app/routes/utils/pageTypes';

export default {
  component: ErrorPage,
  getInitialData: () => Promise.resolve({ status: 404, errorCode: 404 }),
  pageType: ERROR_PAGE,
};
