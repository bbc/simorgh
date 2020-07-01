/* eslint-disable import/first */
/* eslint-disable import/order */
import sendCustomMetric from '.';

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
    // by returning the actual mock logger instance,
    // our tests can make assertions about which metrics
    // were logged if desired
    mockLogger,
    metricScope: fn => fn(mockLogger),
    Unit,
  };
});

import { mockLogger } from 'aws-embedded-metrics';

describe('Cloudwatch Custom Metrics', () => {
  it('sendCustomMetric should set dimensions and metrics correctly', async () => {
    await sendCustomMetric('Metric Name', 500, 'Page Type', '/request/url');

    // assert
    expect(mockLogger.putMetric).toBeCalledWith('Metric Name', 1, 'Count');
    expect(mockLogger.putDimensions).toBeCalledWith({
      PageType: 'Page Type',
      StatusCode: 500,
    });
    expect(mockLogger.setProperty).toBeCalledWith('URL', '/request/url');
  });
});
