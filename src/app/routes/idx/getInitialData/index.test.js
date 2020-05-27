import getInitialData from '.';
import idxPageJson from '#data/persian/afghanistan/index.json';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('Get intial data from IDX page', () => {
  beforeEach(() => {
    process.env.SIMORGH_BASE_URL = 'http://localhost';
    fetchMock.restore();
  });


});
