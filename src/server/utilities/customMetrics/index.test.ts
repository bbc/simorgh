/* eslint-disable import/first */
/* eslint-disable import/order */
import sendCustomMetric, { Params } from '.';

const metricParams = {
  metricName: 'Metric Name',
  statusCode: 500,
  pageType: 'article',
  requestUrl: '/request/url',
} satisfies Params;

// mocking of aws-emf-metrics logic borrowed from https://github.com/awslabs/aws-embedded-metrics-node/blob/master/examples/testing/tests/module.jest.test.js
jest.mock('aws-embedded-metrics', () => {
  const { Unit } = jest.requireActual('aws-embedded-metrics');

  // here we're mocking the actual logger that our methods under test use
  const metricsLogger = {
    putMetric: jest.fn(),
    putDimensions: jest.fn(),
    setProperty: jest.fn(),
    setNamespace: jest.fn(),
  };

  // return the mocked module
  return {
    metricsLogger,
    metricScope: (fn: (params: object) => metricsLogger) => fn(metricsLogger),
    Unit,
  };
});

// @ts-expect-error - importing mocked module
import { metricsLogger } from 'aws-embedded-metrics';

describe('Cloudwatch Custom Metrics', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  ['local'].forEach(environment => {
    it(`should not send custom metrics on ${environment}`, () => {
      process.env.SIMORGH_APP_ENV = environment;
      sendCustomMetric(metricParams);

      expect(metricsLogger.setNamespace).not.toBeCalled();
      expect(metricsLogger.putMetric).not.toBeCalled();
      expect(metricsLogger.putDimensions).not.toBeCalled();
      expect(metricsLogger.setProperty).not.toBeCalled();
    });
  });

  it('should send custom metrics on test', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    sendCustomMetric(metricParams);

    expect(metricsLogger.setNamespace).toBeCalled();
    expect(metricsLogger.putMetric).toBeCalled();
    expect(metricsLogger.putDimensions).toBeCalled();
    expect(metricsLogger.setProperty).toBeCalled();
  });

  describe('sendCustomMetric', () => {
    beforeEach(() => {
      process.env.SIMORGH_APP_ENV = 'test';
    });

    it('should set metric namespace', () => {
      sendCustomMetric(metricParams);

      expect(metricsLogger.setNamespace).toBeCalledWith('Simorgh/Server');
    });

    it('should set metric with name and count', () => {
      sendCustomMetric(metricParams);

      expect(metricsLogger.putMetric).toBeCalledWith('Metric Name', 1, 'Count');
    });

    it('should set dimensions', () => {
      sendCustomMetric(metricParams);

      expect(metricsLogger.putDimensions).toBeCalledWith({
        PageType: 'article',
        StatusCode: '500',
      });
    });

    it('should set URL property', () => {
      sendCustomMetric(metricParams);

      expect(metricsLogger.setProperty).toBeCalledWith('URL', '/request/url');
    });
  });
});
