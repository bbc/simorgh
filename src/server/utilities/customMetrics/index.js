// custom CW metrics
const { metricScope, Unit } = require('aws-embedded-metrics');

const sendCustomMetric = metricScope(
  metrics => async (metricName, statusCode, pageType, requestUrl) => {
    // Specifies the metric dimensions, each dimension will counted and billed as a custom unique metric
    metrics.putDimensions({ PageType: pageType, StatusCode: statusCode });

    // Specifies the metric name and the value to increment it by e.g. Non_200_Response +1
    metrics.putMetric(metricName, 1, Unit.Count);

    // Custom properties are included in the custom metric data but are not charged
    metrics.setProperty('URL', requestUrl);
  },
);

export default sendCustomMetric;
