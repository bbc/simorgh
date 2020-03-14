import ErrorPage from '#pages/Error';

export default {
  component: ErrorPage,
  getInitialData: () => Promise.resolve({ status: 404 }),
  pageType: 'error',
};
