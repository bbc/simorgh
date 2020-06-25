const putAWSMetric = ({
  cloudwatch,
  namespace = 'Server',
  metricName,
  pageTypeValue = 'Unknown',
  statusCode = 'Unknown',
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
          {
            Name: 'StatusCode' /* required */,
            Value: statusCode.toString() /* required */,
          },
        ],
        Timestamp: new Date(),
        Unit: 'Count',
        Values: [1],
      },
    ],
  };

  // Send CW if on test environment, otherwise log to console
  if (process.env.SIMORGH_APP_ENV === 'test') {
    console.info('send CW metric');
    cloudwatch.putMetricData(params).send();
  } else {
    console.info(`Custom CW Metric: ${JSON.stringify(params)}`);
  }
};

export default putAWSMetric;
