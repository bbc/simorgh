import putAWSMetric from '.';

describe('putAWSMetric', () => {
  const mockCloudwatch = {
    putMetricData: jest.fn(() => ({
      send: jest.fn(),
    })),
  };

  const mockDate = new Date('2020-06-20T00:07:19.309Z');

  jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call function with params', () => {
    process.env.SIMORGH_APP_ENV = 'test';
    putAWSMetric({
      cloudwatch: mockCloudwatch,
      namespace: 'Server',
      metricName: '5xx',
      pageTypeValue: 'On Demand Radio',
    });

    const testParams = {
      Namespace: 'Si/Server',
      MetricData: [
        {
          MetricName: '5xx',
          Dimensions: [
            {
              Name: 'PageType',
              Value: 'On Demand Radio',
            },
            {
              Name: 'StatusCode',
              Value: 'Unknown',
            },
          ],
          Timestamp: new Date(),
          Unit: 'Count',
          Values: [1],
        },
      ],
    };
    expect(mockCloudwatch.putMetricData).toHaveBeenCalledTimes(1);
    expect(mockCloudwatch.putMetricData).toHaveBeenCalledWith(testParams);
  });
});
