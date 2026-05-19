// biome-ignore-all lint/style/noCommonJs: we want this
import writeNewTimezoneData from '../writeNewTimezoneData';

jest.mock('../writeNewTimezoneData', () => jest.fn());

describe('postInstall', () => {
  it('Should call writeNewTimezoneData', () => {
    require('./index'); // eslint-disable-line global-require
    expect(writeNewTimezoneData).toHaveBeenCalledTimes(1);
  });
});
