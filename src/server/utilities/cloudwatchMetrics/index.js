const putAWSMetric = ({
  cloudwatch,
  namespace = 'Server',
  metricName,
  pageTypeValue,
}) => {
  const params = {
    Namespace: `Si/${namespace}` /* required */,
    MetricData: [
      /* required */
      {
        MetricName: metricName /* required */,
        Dimensions: [
          /* can have multiple dimensions */
          {
            Name: 'PageType' /* required */,
            Value: pageTypeValue /* required */,
          },
        ],
        StorageResolution: 'NUMBER_VALUE',
        Timestamp: Date.now(),
        Unit: 'Count',
        Value: 1,
        Values: [1],
      },
    ],
  };

  cloudwatch.putMetricData(params).send();
};

export default putAWSMetric;
