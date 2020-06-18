import loggerMock from '#testHelpers/loggerMock';
import pathWithLogging, { LOG_LEVELS } from '.';

const fixtureData = {
  metadata: {
    id: 'fixture-id',
  },
};

describe('pathWithLogging', () => {
  it('should return the correct value', () => {
    expect(
      pathWithLogging(
        'example-url',
        'log-category',
        fixtureData,
      )(['metadata', 'id']),
    ).toBe('fixture-id');
  });

  it('should create a log entry if the value is undefined', () => {
    pathWithLogging(
      'example-url',
      'log-category',
      fixtureData,
    )(['metadata', 'does-not-exist']);

    expect(loggerMock.info).toHaveBeenCalledWith('log-category', {
      url: `example-url`,
      path: ['metadata', 'does-not-exist'],
    });
  });

  it('should allow logging behavior to be modified by arguments', () => {
    pathWithLogging(
      'a-different-url',
      'a-different-log-category',
      fixtureData,
    )(['metadata', 'also-does-not-exist'], { logLevel: LOG_LEVELS.WARN });

    expect(loggerMock.warn).toHaveBeenCalledWith('a-different-log-category', {
      url: `a-different-url`,
      path: ['metadata', 'also-does-not-exist'],
    });
  });
});
