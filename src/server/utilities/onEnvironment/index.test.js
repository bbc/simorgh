import onEnvironment from './index';

const wrappedFunction = jest.fn();

describe('onEnvironment check', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('do not call wrapper function on live environment', () => {
    process.env.SIMORGH_APP_ENV = 'live';

    onEnvironment('test', {})(wrappedFunction);

    expect(wrappedFunction).not.toBeCalled();
  });

  it('call wrapper function on test environment', () => {
    process.env.SIMORGH_APP_ENV = 'test';

    onEnvironment('test', {})(wrappedFunction);

    expect(wrappedFunction).toBeCalled();
  });
});
