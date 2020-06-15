import putAWSMetric from '.';

describe('putAWSMetric', () => {
  const mockCloudwatch = {
    putMetricData: jest.fn(() => ({
      send: jest.fn(),
    })),
  };
  const mockTimestamp = '2020-06-15T14:14:25.057Z';
  const originalDateNow = Date.now;

  beforeEach(() => {
    Date.now = jest.fn(() => mockTimestamp);
  });

  afterEach(() => {
    jest.clearAllMocks();
    Date.now = originalDateNow;
  });

  it('should call function with params', () => {
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
          ],
          StorageResolution: 'NUMBER_VALUE',
          Timestamp: mockTimestamp,
          Unit: 'Count',
          Value: 1,
          Values: [1],
        },
      ],
    };
    expect(mockCloudwatch.putMetricData).toHaveBeenCalledTimes(1);
    expect(mockCloudwatch.putMetricData).toHaveBeenCalledWith(testParams);
  });

  it('should', () => {
    console.log(Date.now());
  });
});
