import fs from 'fs';
import getDials from './getDials';

jest.mock('fs');

const createJsonBuffer = obj => Buffer.from(JSON.stringify(obj));

describe('getDials', () => {
  const dialsPath = 'dials';
  beforeEach(() => {
    process.env.COSMOS_DIALS_PATH = dialsPath;
  });

  it('returns the dials object', () => {
    const dials = {
      key: 'value',
    };
    fs.readFileSync.mockReturnValue(createJsonBuffer(dials));

    expect(getDials()).toEqual(dials);
    expect(fs.readFileSync).toHaveBeenCalledWith(dialsPath);
  });
});
