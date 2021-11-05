import onEnvironment from './index';

const wrappedFunction = jest.fn();

describe('onEnvironment check', () => {
  const originalEnvironment = process.env.SIMORGH_APP_ENV;

  afterEach(() => {
    process.env.SIMORGH_APP_ENV = originalEnvironment;
  });

  it('should not call wrapper function if no environments', () => {
    onEnvironment([], {})(wrappedFunction);
    expect(wrappedFunction).not.toBeCalled();
  });

  it('should not call wrapper function if environment does not match', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    onEnvironment(['local', 'test'], {})(wrappedFunction);

    expect(wrappedFunction).not.toBeCalled();
  });

  it('should not call wrapper function on live environment', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    onEnvironment(['test'], {})(wrappedFunction);

    expect(wrappedFunction).not.toBeCalled();
  });

  it('should call wrapper function if environment matches', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    onEnvironment(['test', 'live'], {})(wrappedFunction);

    expect(wrappedFunction).toBeCalled();
  });

  it('should call wrapper function on test environment', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    onEnvironment(['test'], {})(wrappedFunction);

    expect(wrappedFunction).toBeCalled();
  });
});
