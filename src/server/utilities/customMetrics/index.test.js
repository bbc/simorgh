/* eslint-disable import/first */
/* eslint-disable import/order */
import sendCustomMetric from '.';

// mocking of aws-emf-metrics logic borrowed from https://github.com/awslabs/aws-embedded-metrics-node/blob/master/examples/testing/tests/module.jest.test.js
jest.mock('aws-embedded-metrics', () => {
  const { Unit } = jest.requireActual('aws-embedded-metrics');

  // here we're mocking the actual logger that our methods under test use
  const metricsLogger = {
    putMetric: jest.fn(),
    putDimensions: jest.fn(),
    setProperty: jest.fn(),
  };

  // return the mocked module
  return {
    metricsLogger,
    metricScope: fn => fn(metricsLogger),
    Unit,
  };
});

import { metricsLogger } from 'aws-embedded-metrics';

const metricParams = {
  metricName: 'Metric Name',
  statusCode: 500,
  pageType: 'Page Type',
  requestUrl: '/request/url',
};

describe('Cloudwatch Custom Metrics', () => {
  afterEach(() => {
    delete process.env.SIMORGH_APP_ENV;
  });

  it('should not send custom metrics on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await sendCustomMetric(metricParams);

    // assert
    expect(metricsLogger.putMetric).not.toBeCalled();
    expect(metricsLogger.putDimensions).not.toBeCalled();
    expect(metricsLogger.setProperty).not.toBeCalled();
  });

  it('should send custom metrics on test', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await sendCustomMetric(metricParams);

    // assert
    expect(metricsLogger.putMetric).toBeCalled();
    expect(metricsLogger.putDimensions).toBeCalled();
    expect(metricsLogger.setProperty).toBeCalled();
  });

  describe('sendCustomMetric', () => {
    beforeEach(() => {
      process.env.SIMORGH_APP_ENV = 'test';
    });

    it('should set metric with name and count', async () => {
      await sendCustomMetric(metricParams);

      expect(metricsLogger.putMetric).toBeCalledWith('Metric Name', 1, 'Count');
    });

    it('should set dimensions', async () => {
      await sendCustomMetric(metricParams);

      expect(metricsLogger.putDimensions).toBeCalledWith({
        PageType: 'Page Type',
        StatusCode: 500,
      });
    });

    it('should set URL property', async () => {
      await sendCustomMetric(metricParams);

      expect(metricsLogger.setProperty).toBeCalledWith('URL', '/request/url');
    });
  });
});
