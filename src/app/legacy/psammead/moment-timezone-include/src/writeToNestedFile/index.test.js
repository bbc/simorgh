import fs from 'fs';
import path from 'path';
import writeToNestedFile from '.';

jest.mock('fs', () => ({
  mkdirSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

jest.mock('../writeNewTimezoneData', () => jest.fn());

describe('writeToNestedFile', () => {
  it('Should create directory and write file correctly', () => {
    const filePath = writeToNestedFile('path/to/a/place', 'filecontent');

    expect(fs.mkdirSync).toHaveBeenCalledTimes(1);
    expect(fs.mkdirSync).toHaveBeenCalledWith(
      path.join(__dirname, 'path/to/a'),
      {
        recursive: true,
      },
    );

    expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      path.join(__dirname, 'path/to/a/place'),
      'filecontent',
    );
    expect(filePath).toBe(path.join(__dirname, 'path/to/a/place'));
  });
});
