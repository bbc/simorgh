import fetchMock from 'fetch-mock';

// Fixture Data
import { FRONT_PAGE as pageType } from '#app/routes/utils/pageTypes';
import getInitialData from '.';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('Get initial data from front page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });

  it('should render a status 200 and empty pageData object', async () => {
    const { status, pageData } = await getInitialData({
      path: 'mock-home-page-path',
      service: 'kyrgyz',
      pageType,
    });
    expect(status).toEqual(200);
    expect(pageData).toEqual({});
  });
});
