// components to test
import hasMostRead from './hasMostRead';
import getConfig from '../../utils/getConfig';

jest.mock('../../utils/getConfig', () => jest.fn());

describe('hasMostRead', () => {
  it('returns true if service has most read component enabled', async () => {
    getConfig.mockImplementationOnce(() => ({
      mostRead: {
        hasMostRead: true,
      },
    }));

    expect(await hasMostRead('mock-service', null)).toBeTruthy();
  });

  it('returns false if service has most read component disabled', async () => {
    getConfig.mockImplementationOnce(() => ({
      mostRead: {
        hasMostRead: false,
      },
    }));

    expect(await hasMostRead('mock-service', null)).toBeFalsy();
  });
});
