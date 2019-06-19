import fs from 'fs';
import getDials from '.';

jest.mock('fs');

const createJsonBuffer = obj => Buffer.from(JSON.stringify(obj));
const mockFs = (err, data) =>
  fs.readFile.mockImplementation((file, cb) => cb(err, createJsonBuffer(data)));

describe('getDials', () => {
  const dialsPath = 'dials';

  beforeEach(() => {
    process.env.COSMOS_DIALS_PATH = dialsPath;
  });

  it('should return the dials object', async () => {
    const dials = {
      key: 'value',
    };
    mockFs(null, dials);

    expect(getDials()).resolves.toEqual(dials);
    expect(fs.readFile).toHaveBeenCalledWith(dialsPath, expect.any(Function));
  });

  it('should transform string boolean values in dials object', async () => {
    const dials = {
      trueDial: 'true',
      falseDial: 'false',
    };
    mockFs(null, dials);

    const expected = {
      trueDial: true,
      falseDial: false,
    };
    expect(getDials()).resolves.toEqual(expected);
  });

  describe('env has no dials path', () => {
    beforeEach(() => {
      delete process.env.COSMOS_DIALS_PATH;
    });

    it('should throw an error', async () => {
      expect(getDials()).resolves.toThrow(
        new Error('Dials filepath undefined'),
      );
    });
  });
});
