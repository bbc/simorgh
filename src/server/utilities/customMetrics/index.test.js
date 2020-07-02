/* eslint-disable import/first */
/* eslint-disable import/order */
import sendCustomMetric from './index.js';

// mocking of aws-emf-metrics logic borrowed from https://github.com/awslabs/aws-embedded-metrics-node/blob/master/examples/testing/tests/module.jest.test.js
jest.mock('aws-embedded-metrics', () => {
  const { Unit } = jest.requireActual('aws-embedded-metrics');

  // here we're mocking the actual logger that our methods under test use
  const mockLogger = {
    putMetric: jest.fn(),
    putDimensions: jest.fn(),
    setProperty: jest.fn(),
  };

  // return the mocked module
  return {
    mockLogger,
    metricScope: fn => fn(mockLogger),
    Unit,
  };
});

import { mockLogger } from 'aws-embedded-metrics';

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

  it('does not send custom metrics on live', async () => {
    process.env.SIMORGH_APP_ENV = 'live';
    await sendCustomMetric(metricParams);

    // assert
    expect(mockLogger.putMetric).not.toBeCalled();
    expect(mockLogger.putDimensions).not.toBeCalled();
    expect(mockLogger.setProperty).not.toBeCalled();
  });

  it('sendCustomMetric should set dimensions and metrics correctly', async () => {
    process.env.SIMORGH_APP_ENV = 'test';
    await sendCustomMetric(metricParams);

    // assert
    expect(mockLogger.putMetric).toBeCalledWith('Metric Name', 1, 'Count');
    expect(mockLogger.putDimensions).toBeCalledWith({
      PageType: 'Page Type',
      StatusCode: 500,
    });
    expect(mockLogger.setProperty).toBeCalledWith('URL', '/request/url');
  });
});
