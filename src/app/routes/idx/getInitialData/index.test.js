import idxPageJson from '#data/ukrainian/ukraine_in_russian/index.json';
import { INDEX_PAGE } from '#app/routes/utils/pageTypes';
import getInitialData, { hasRadioSchedule } from '.';
import getConfig from '../../utils/getConfig';

fetch.mockResponse(JSON.stringify(idxPageJson));
jest.mock('../../utils/getConfig', () => jest.fn());

describe('Get intial data from IDX page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return essential data for an IDX page to render', async () => {
    const { pageData } = await getInitialData({
      path: 'mock-idx-page',
      pageType: INDEX_PAGE,
    });

    expect(pageData.metadata.type).toEqual(INDEX_PAGE);
    expect(pageData.content.groups.length).toBeGreaterThan(1);
  });
});

describe('hasRadioSchedule', () => {
  it('returns true if service and idx page has radio schedule', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onIdxPage: true,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(true);
  });

  it('returns false if service has radio schedule but idx page does not', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: true,
        onIdxPage: false,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(false);
  });

  it('returns false if neither service or idx page has radio schedule', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: false,
        onIdxPage: false,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(false);
  });

  it('returns false if neither service is misconfigured to not have radio schedule, but service has', async () => {
    getConfig.mockImplementationOnce(() => ({
      radioSchedule: {
        hasRadioSchedule: false,
        onIdxPage: true,
      },
    }));

    expect(await hasRadioSchedule('mock-service')).toBe(false);
  });
});
