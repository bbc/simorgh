const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { reportCategories } = require('./mockReportCategories');
const mockConfig = require('./mockConfig');
const runLighthouse = require('./runLighthouse');

// lighthouse is called by L8 - it mstbe mocked to return a

jest.mock('lighthouse');

describe('lighthouseRunner', () => {
  it('thing', () => expect(runLighthouse(mockConfig)).resolves.toEqual('Paul'));

  // mockimports
  // mockLighthouseResponse
  // setInputOne
  // await import('./lighthouseRunner');
  // expect output to equal output 1
  // expect output to equal output 1
});
