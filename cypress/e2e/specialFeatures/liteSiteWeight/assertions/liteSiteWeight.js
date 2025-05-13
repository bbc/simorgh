import interceptGetRequests from '../helpers/interceptGetRequests';
import getTotalPageSize from '../helpers/getTotalPageSize';
import roundTo2Decimals from '../helpers/roundTo2Decimals';

const LOWER_MAX_PAGE_WEIGHT_KB = 50;
const UPPER_MAX_PAGE_WEIGHT_KB = 75;

const PAGE_TYPE_PAGE_WEIGHT_MAPPING = {
  'Live Page': UPPER_MAX_PAGE_WEIGHT_KB,
};

const getPageWeightLimit = pageType =>
  PAGE_TYPE_PAGE_WEIGHT_MAPPING[pageType] || LOWER_MAX_PAGE_WEIGHT_KB;

const formatTableData = sizes => {
  return sizes.map(({ url, size }) => ({
    Request: url,
    'Request Size (KB)': roundTo2Decimals(size),
  }));
};

export default ({ path, pageType }) => {
  describe('', () => {
    let allRequests = [];
    let liveRequests = [];
    before(() => {
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.setCacheDisabled',
        params: { cacheDisabled: true },
      });
      cy.clearCookies();
      cy.clearLocalStorage();
      interceptGetRequests(allRequests);
      cy.visit(`${path}`);
    });

    afterEach(() => {
      allRequests = [];
      liveRequests = [];
    });

    const pageWeightLimit = getPageWeightLimit(pageType);

    it(`Page weight for ${pageType} page should be less than ${pageWeightLimit}Kb`, () => {
      getTotalPageSize(allRequests).then(
        ({ totalSize: localPageWeight, requestSizes: localRequestSizes }) => {
          interceptGetRequests(liveRequests);
          cy.visit(`https://www.bbc.com${path}`);

          getTotalPageSize(liveRequests).then(
            ({ totalSize: livePageWeight, requestSizes: liveRequestSizes }) => {
              const percentageDifference =
                (100 * (localPageWeight - livePageWeight)) /
                ((localPageWeight + livePageWeight) / 2);

              const delta = roundTo2Decimals(percentageDifference);
              expect(localPageWeight).to.be.lessThan(pageWeightLimit);
              const localRequestSizesData = formatTableData(localRequestSizes);
              const liveRequestSizesData = formatTableData(liveRequestSizes);
              cy.task('table', localRequestSizesData);
              cy.task('table', liveRequestSizesData);
              cy.task('table', [
                {
                  URL: `${Cypress.config().baseUrl}${path}`,
                  'Page Type': pageType,
                  'Local (KB)': localPageWeight,
                  'Live (KB)': livePageWeight,
                  'Delta (KB)': roundTo2Decimals(
                    livePageWeight - localPageWeight,
                  ),
                  'Delta (%) ': delta,
                },
              ]);
            },
          );
        },
      );
    });
  });
};
