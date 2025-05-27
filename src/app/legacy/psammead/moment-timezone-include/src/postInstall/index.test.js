import writeNewTimezoneData from '../writeNewTimezoneData';

jest.mock('../writeNewTimezoneData', () => jest.fn());

describe('postInstall', () => {
  it('Should call writeNewTimezoneData', () => {
    require('./index');  
    expect(writeNewTimezoneData).toHaveBeenCalledTimes(1);
  });
});
