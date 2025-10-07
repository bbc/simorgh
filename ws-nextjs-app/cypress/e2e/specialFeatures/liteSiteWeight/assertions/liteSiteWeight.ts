/* eslint-disable import/no-relative-packages */
import { PageTypes } from '#app/models/types/global';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceParametersType } from '../../../../types';
import interceptGetRequests from '../../../../../../cypress/e2e/specialFeatures/liteSiteWeight/helpers/interceptGetRequests';
import getTotalPageSize from '../../../../../../cypress/e2e/specialFeatures/liteSiteWeight/helpers/getTotalPageSize';
import roundTo2Decimals from '../../../../../../cypress/e2e/specialFeatures/liteSiteWeight/helpers/roundTo2Decimals';

const MAX_PAGE_WEIGHT_KB = 50;

const PAGE_TYPE_PAGE_WEIGHT_MAPPING = {
  live: 70,
} as Record<PageTypes, number>;

const getMaxPageWeight = (pageType: PageTypes) =>
  PAGE_TYPE_PAGE_WEIGHT_MAPPING[pageType] || MAX_PAGE_WEIGHT_KB;

const formatTableData = (sizes: { url: string; size: number }[]) => {
  return sizes.map(({ url, size }) => ({
    Request: url,
    'Request Size (KB)': roundTo2Decimals(size),
  }));
};

export default ({ path, pageType, headers }: ServiceParametersType) => {
  describe('', () => {
    let allRequests = [] as Request[];
    let liveRequests = [] as Request[];
    before(() => {
      Cypress.automation('remote:debugger:protocol', {
        command: 'Network.setCacheDisabled',
        params: { cacheDisabled: true },
      });
      cy.clearCookies();
      cy.clearLocalStorage();
      interceptGetRequests(allRequests);
    });

    afterEach(() => {
      allRequests = [];
      liveRequests = [];
    });

    const maxPageWeight = getMaxPageWeight(pageType ?? ARTICLE_PAGE);

    it(`${pageType} page weight should be less than ${maxPageWeight}Kb`, () => {
      getTotalPageSize(allRequests).then(
        ({ totalSize: localPageWeight, requestSizes: localRequestSizes }) => {
          interceptGetRequests(liveRequests);
          cy.visit(`https://www.bbc.com${path}`, {
            ...(headers && { headers }),
          });

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
