import loggerMock from '#testHelpers/loggerMock';
import getConfig from '.';
import { service as pidginConfig } from '#lib/config/services/pidgin';
import { service as serbianConfig } from '#lib/config/services/serbian';

describe('getConfig', () => {
  it('it returns correct config for service without variants', async () => {
    expect(await getConfig('pidgin')).toEqual(pidginConfig.default);
  });

  it('it returns correct config for service with variants', async () => {
    expect(await getConfig('serbian', 'lat')).toEqual(serbianConfig.lat);
  });

  it('it warns and returns empty object if variant not specified for service with variant', async () => {
    expect(await getConfig('serbian')).toEqual({});
    expect(loggerMock.error).toHaveBeenCalledWith(
      'No config found for serbian variant default',
    );
  });

  it('it warns and returns empty object if incorrect variant specified for service with variant', async () => {
    expect(await getConfig('serbian', 'foo')).toEqual({});
    expect(loggerMock.error).toHaveBeenCalledWith(
      'No config found for serbian variant foo',
    );
  });

  it('it warns and returns empty object if config for service not found', async () => {
    expect(await getConfig('rubbish')).toEqual({});
    expect(loggerMock.error).toHaveBeenCalledWith(
      'Error retrieving config for rubbish',
    );
  });
});
