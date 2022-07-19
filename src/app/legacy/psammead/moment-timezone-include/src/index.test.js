import webpack from 'webpack';
import writeNewTimezoneData from './writeNewTimezoneData';
import replaceOriginalTimezoneData from './replaceOriginalTimezoneData';
import MomentTimezoneInclude from '.';

jest.mock('webpack', () => ({
  NormalModuleReplacementPlugin: jest.fn(),
}));

jest.mock('./writeNewTimezoneData', () => jest.fn());

jest.mock('./replaceOriginalTimezoneData', () => jest.fn());
replaceOriginalTimezoneData.mockImplementation(() => 'dummyResourcePath');

describe('MomentTimezoneInclude', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should write new data and module replace old data', () => {
    MomentTimezoneInclude({ startYear: 1234, endYear: 5678 });

    expect(writeNewTimezoneData).toHaveBeenCalledTimes(1);
    expect(writeNewTimezoneData).toHaveBeenCalledWith(1234, 5678);

    expect(webpack.NormalModuleReplacementPlugin).toHaveBeenCalledTimes(1);
    expect(webpack.NormalModuleReplacementPlugin).toHaveBeenCalledWith(
      /data[\\/]packed[\\/]latest\.json$/,
      expect.any(Function),
    );

    expect(replaceOriginalTimezoneData).not.toHaveBeenCalled();

    const resource = {};

    webpack.NormalModuleReplacementPlugin.mock.calls[0][1](resource);

    expect(replaceOriginalTimezoneData).toHaveBeenCalledTimes(1);
    expect(resource).toEqual({ request: 'dummyResourcePath' });
  });

  it('Should call writeNewTimezoneData with + & - Infinity if no dates provided', () => {
    MomentTimezoneInclude();

    expect(writeNewTimezoneData).toHaveBeenCalledTimes(1);
    expect(writeNewTimezoneData).toHaveBeenCalledWith(-Infinity, Infinity);
  });
});
