import loggerMock from '#testHelpers/loggerMock';
import pathWithLogging, { LOG_LEVELS } from '.';
import { RADIO_MISSING_FIELD } from '#lib/logger.const';

jest.mock('../logInitialData', () => {
  return {
    getUri: () => 'example-url',
  };
});

const fixtureData = {
  metadata: {
    id: 'fixture-id',
  },
};

describe('pathWithLogging', () => {
  it('should return the correct value', () => {
    expect(pathWithLogging(['metadata', 'id'])(fixtureData)).toBe('fixture-id');
  });

  it('should create an "info" log entry if the value is undefined', () => {
    pathWithLogging(['metadata', 'does-not-exist'])(fixtureData);

    expect(loggerMock.info).toHaveBeenCalledWith(RADIO_MISSING_FIELD, {
      url: `example-url`,
      path: ['metadata', 'does-not-exist'],
    });
  });

  it('should allow the logLevel to be modified', () => {
    pathWithLogging(['metadata', 'does-not-exist'], {
      logLevel: LOG_LEVELS.WARN,
    })(fixtureData);

    expect(loggerMock.warn).toHaveBeenCalled();
  });
});
