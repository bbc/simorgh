// biome-ignore-all lint/style/useNodejsImportProtocol: we want this
import fs from 'fs';
import path from 'path';

import writeToNestedFile from '.';

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}));

jest.mock('../writeNewTimezoneData', () => jest.fn());

describe('writeToNestedFile', () => {
  it('Should create directory and write file correctly', () => {
    writeToNestedFile('path/to/a/place', 'filecontent');

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(__dirname, 'path/to/a/place'),
      'filecontent',
    );
  });
});
