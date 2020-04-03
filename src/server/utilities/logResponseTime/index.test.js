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
    jest.resetAllMocks();
  });

  beforeEach(() => {
    process.hrtime = jest
      .fn()
      .mockImplementationOnce(() => 'startTime')
      .mockImplementationOnce(() => [1, 12345]);
  });

  it('should log response time in nanoseconds with path', () => {
    logResponseTime(req, res, next);

    expect(loggerMock.info).toBeCalledWith('server_response_time', {
      nanoseconds: 1000012345,
      path: '/path',
    });

    expect(process.hrtime).toHaveBeenCalledWith('startTime');

    expect(next).toHaveBeenCalled();
  });
});
