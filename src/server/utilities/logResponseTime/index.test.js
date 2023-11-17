import loggerMock from '#testHelpers/loggerMock';
import logResponseTime from '.';

const req = {
  path: '/path',
};

const res = {
  on: jest.fn().mockImplementation((event, callback) => callback()),
};

const next = jest.fn();

describe('logResponseTime', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    process.hrtime = jest.fn().mockImplementationOnce(() => 'startTime');
  });

  it('should log response time in nanoseconds with path', () => {
    process.hrtime.mockImplementationOnce(() => [1, 12345]);

    logResponseTime(req, res, next);

    expect(loggerMock.debug).toBeCalledWith('server_response_time', {
      nanoseconds: 1000012345,
      path: '/path',
    });

    expect(process.hrtime).toHaveBeenCalledWith('startTime');

    expect(next).toHaveBeenCalled();
  });

  it('should log slow response time in nanoseconds with path', () => {
    process.hrtime.mockImplementationOnce(() => [3, 12345]);

    logResponseTime(req, res, next);

    expect(loggerMock.warn).toBeCalledWith('slow_server_response_time', {
      nanoseconds: 3000012345,
      path: '/path',
    });
  });
});
