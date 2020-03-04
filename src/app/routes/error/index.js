import { ErrorPage } from '#pages';
import { errorPagePath } from '../utils/regex';

export default {
  path: errorPagePath,
  exact: true,
  component: ErrorPage,
  getInitialData: pathname => {
    const [, , errorPage] = pathname.split('/');
    const errorCode = Number(errorPage);

    return Promise.resolve({ status: 200, errorCode });
  },
  pageType: 'error',
};
