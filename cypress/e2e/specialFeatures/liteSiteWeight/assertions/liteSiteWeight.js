import interceptGetRequests from '../helpers/interceptGetRequests';
import getTotalPageSize from '../helpers/getTotalPageSize';
import roundTo2Decimals from '../helpers/roundTo2Decimals';

const MAX_PAGE_WEIGHT_KB = 50;

const PAGE_TYPE_PAGE_WEIGHT_MAPPING = {
  live: 70,
};

const getMaxPageWeight = pageType =>
  PAGE_TYPE_PAGE_WEIGHT_MAPPING[pageType] || MAX_PAGE_WEIGHT_KB;

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

    const maxPageWeight = getMaxPageWeight(pageType);

    it(`${pageType} page weight should be less than ${maxPageWeight}Kb`, () => {
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
              expect(localPageWeight).to.be.lessThan(maxPageWeight);
              const localRequestSizesData = formatTableData(localRequestSizes);
              const liveRequestSizesData = formatTableData(liveRequestSizes);
              cy.task('log', 'localRequestSizesData:');
              cy.task('log', localRequestSizesData);
              cy.task('log', 'liveRequestSizesData:');
              cy.task('log', liveRequestSizesData);
              cy.task('table', [
                {
                  URL: `${Cypress.config().baseUrl}${path}`,
                  'Page Type': pageType,
                  'Local (KB)': localPageWeight,
                  'Live (KB)': livePageWeight,
                  'Delta (KB)': roundTo2Decimals(
                    localPageWeight - livePageWeight,
                  ),
                  'Delta (%)': delta,
                },
              ]);
            },
          );
        },
      );
    });
  });
};
