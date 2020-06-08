import pathWithLogging, { LOG_LEVELS } from '.';
import loggerMock from '#testHelpers/loggerMock';
import { RADIO_FIELD_MISSING } from '#lib/logger.const';

jest.mock('../logInitialData', () => {
  return {
    getUri: jest.fn(() => 'example-url'),
  };
});

const fixtureData = {
  metadata: {
    id: 'hello',
  },
};

describe('pathWithLogging', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return the correct value', () => {
    expect(pathWithLogging(['metadata', 'id'])(fixtureData)).toBe('hello');
  });

  it('should create an "info" log entry if the value is undefined', () => {
    pathWithLogging(['metadata', 'does-not-exist'])(fixtureData);

    expect(loggerMock.info).toHaveBeenCalledWith(RADIO_FIELD_MISSING, {
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
