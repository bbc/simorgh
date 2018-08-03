global.console.log = jest.fn(); // silence console.log during jest tests
global.console.time = jest.fn(); // silence console.time during jest tests

const { readdirAsync } = require('./readdirAsync');

describe('readdirAsync helper', () => {
  it('should error if directory passed to readdirAsync does not exist', () => {
    expect(() => {
      readdirAsync('./././notData');
    }).toThrowError();
  });
  //
  // it('should not error if directory passed to readdirAsync is valid', async () => {
  //   expect(() => {
  //       readdirAsync('./././data');
  //   }).not.toThrowError();
  // });
});
