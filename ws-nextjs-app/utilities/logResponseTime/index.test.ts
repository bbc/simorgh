import loggerMock from '#testHelpers/loggerMock';
import logResponseTime from '.';

const req = {
  path: '/path',
};

const res = {
  on: jest.fn().mockImplementation((_, callback) => callback()),
};

const next = jest.fn();

describe('logResponseTime', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    const hrtimeMock = Object.assign(jest.fn(), {
      bigint: jest.fn(),
    });

    (hrtimeMock as jest.Mock).mockImplementationOnce(() => [0, 0]);
    process.hrtime = hrtimeMock as unknown as NodeJS.HRTime;
  });

  it('should log response time in nanoseconds with path', () => {
    (process.hrtime as unknown as jest.Mock).mockImplementationOnce(() => [
      1, 12345,
    ]);

    logResponseTime(req, res, next);

    expect(loggerMock.debug).toHaveBeenCalledWith('server_response_time', {
      nanoseconds: 1000012345,
      path: '/path',
    });

    expect(process.hrtime).toHaveBeenCalledWith([0, 0]);

    expect(next).toHaveBeenCalled();
  });

  it('should log slow response time in nanoseconds with path', () => {
    (process.hrtime as unknown as jest.Mock).mockImplementationOnce(() => [
      3, 12345,
    ]);

    logResponseTime(req, res, next);

    expect(loggerMock.warn).toHaveBeenCalledWith('slow_server_response_time', {
      nanoseconds: 3000012345,
      path: '/path',
    });
  });
});
