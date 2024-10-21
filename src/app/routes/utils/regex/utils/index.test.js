import isLive from '#app/lib/utilities/isLive';
import * as regexGenerators from '.';
import serviceConfig from '../../../../lib/config/services/loadableConfig';

jest.mock('#app/lib/utilities/isLive', () => jest.fn());

describe('regex utils snapshots', () => {
  const services = Object.keys(serviceConfig);
  Object.keys(regexGenerators).forEach(funcName => {
    it.each([true, false])(
      `should create expected regex from ${funcName} when isLive = %s`,
      isLiveEnvironment => {
        isLive.mockImplementationOnce(() => isLiveEnvironment);
        expect(regexGenerators[funcName](services)).toMatchSnapshot();
      },
    );
  });
});
