import fs from 'fs';
import getDials from './getDials';

jest.mock('fs');

const createJsonBuffer = obj => Buffer.from(JSON.stringify(obj));

describe('getDials', () => {
  const dialsPath = 'dials';
  beforeEach(() => {
    process.env.COSMOS_DIALS_PATH = dialsPath;
  });

  it('should return the dials object', () => {
    const dials = {
      key: 'value',
    };
    fs.readFileSync.mockReturnValue(createJsonBuffer(dials));

    expect(getDials()).toEqual(dials);
    expect(fs.readFileSync).toHaveBeenCalledWith(dialsPath);
  });

  it('should transform string boolean values in dials object', () => {
    const dials = {
      trueDial: 'true',
      falseDial: 'false',
    };
    fs.readFileSync.mockReturnValue(createJsonBuffer(dials));

    const expected = {
      trueDial: true,
      falseDial: false,
    };
    expect(getDials()).toEqual(expected);
  });

  describe('env has no dials path', () => {
    beforeEach(() => {
      delete process.env.COSMOS_DIALS_PATH;
    });

    it('should return an empty object', () => {
      expect(getDials()).toEqual({});
    });
  });
});
