import interceptGetRequests from '../helpers/interceptGetRequests';
import getTotalPageSize from '../helpers/getTotalPageSize';
import roundTo2Decimals from '../helpers/roundTo2Decimals';

const MAX_PAGE_WEIGHT_KB = 100;

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

    it(`Page weight for ${pageType} page should be less than ${MAX_PAGE_WEIGHT_KB}Kb`, () => {
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
              expect(localPageWeight).to.be.lessThan(MAX_PAGE_WEIGHT_KB);
              const localRequestSizesData = formatTableData(localRequestSizes);
              const liveRequestSizesData = formatTableData(liveRequestSizes);
              cy.task('table', localRequestSizesData);
              cy.task('table', liveRequestSizesData);
              cy.task('table', [
                {
                  URL: `${Cypress.config().baseUrl}${path}`,
                  'Page Type': pageType,
                  'Local Page Weight (KB)': localPageWeight,
                  'Live Page Weight (KB)': livePageWeight,
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
