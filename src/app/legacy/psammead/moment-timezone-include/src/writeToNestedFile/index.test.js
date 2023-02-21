import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import writeToNestedFile from '.';

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
}));

jest.mock('mkdirp', () => ({
  sync: jest.fn(),
}));

jest.mock('../writeNewTimezoneData', () => jest.fn());

describe('writeToNestedFile', () => {
  it('Should create directory and write file correctly', () => {
    writeToNestedFile('path/to/a/place', 'filecontent');

    expect(mkdirp.sync).toHaveBeenCalledTimes(1);
    expect(mkdirp.sync).toHaveBeenCalledWith(path.join(__dirname, 'path/to/a'));

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(__dirname, 'path/to/a/place'),
      'filecontent',
    );
  });
});
