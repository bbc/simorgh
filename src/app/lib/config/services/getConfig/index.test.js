import getConfig from '.';
import { service as pidginConfig } from '../pidgin';
import { service as serbianConfig } from '../serbian';

describe('getConfig', () => {
  it('it returns correct config for service without variants', async () => {
    expect(await getConfig('pidgin')).toEqual(pidginConfig.default);
  });

  it('it returns correct config for service with variants', async () => {
    expect(await getConfig('serbian', 'lat')).toEqual(serbianConfig.lat);
  });

  it('it returns empty object if variant not specified for service with variant', async () => {
    expect(await getConfig('serbian')).toEqual({});
  });

  it('it warns and returns empty object if config for service not found', async () => {
    global.console = { error: jest.fn() };
    expect(await getConfig('rubbish')).toEqual({});
    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledWith(
      'getConfig could not find config for the requested service: rubbish.',
    );
  });
});
