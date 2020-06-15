const putAWSMetric = ({
  cloudwatch,
  namespace = 'Server',
  metricName,
  pageTypeValue = 'Unknown',
  statusCode = 'Unknown'
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
            Value: statusCode /* required */,
          },
        ],
        Timestamp: new Date(),
        Unit: 'Count',
        Values: [1],
      },
    ],
  };

  cloudwatch.putMetricData(params, (error, data) => {
    if (error) {
      console.log(error)
    }

    console.log(data)
    
  });
};

export default putAWSMetric;