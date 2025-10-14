import { AnalyticsTestPage } from '#pages';
import services from '#app/lib/config/services/loadableConfig';
import { ANALYTICS_TEST_PAGE } from '#app/routes/utils/pageTypes';

const allServices = Object.keys(services).join('|');
const analyticsTestPath = `/:service(${allServices})/analytics-test`;

const getInitialData = async ({ service }) => ({
  status: 200,
  pageData: {
    metadata: {
      type: ANALYTICS_TEST_PAGE,
      atiAnalytics: {
        pageIdentifier: `${service}.analytics-test.page`,
        pageTitle: 'Analytics Test Page',
        contentType: 'test-page',
      },
    },
  },
});

export default {
  path: [analyticsTestPath],
  exact: true,
  component: AnalyticsTestPage,
  getInitialData,
  pageType: ANALYTICS_TEST_PAGE,
};
