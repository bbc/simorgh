jest.mock('../printResults', () => ({
  printFailures: jest.fn(),
  printStatistics: jest.fn(),
  printPassing: jest.fn(),
}));

const log = jest.spyOn(global.console, 'log');
log.mockImplementation(() => jest.fn());

module.exports = {
  log,
};
