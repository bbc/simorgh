import { metricScope, Unit } from 'aws-embedded-metrics';
import { PageTypes } from '#app/models/types/global';
import onEnvironment from '../onEnvironment';

export type Params = {
  metricName: string;
  statusCode?: number | string;
  pageType: PageTypes | 'Unknown';
  requestUrl: string;
};

const sendMetric = metricScope(
  metrics =>
    async ({
      metricName,
      statusCode = 'Unknown',
      pageType,
      requestUrl,
    }: Params) => {
      metrics.setNamespace('Simorgh/Server');

      // Specifies the metric dimensions, each dimension will counted and billed as a custom unique metric
      metrics.putDimensions({
        PageType: pageType,
        StatusCode: statusCode.toString(),
      });

      // Specifies the metric name and the value to increment it by e.g. Non_200_Response +1
      metrics.putMetric(metricName, 1, Unit.Count);

      // Custom properties are included in the custom metric data but are not charged
      metrics.setProperty('URL', requestUrl);
    },
);

const sendCustomMetric = (params: Params) =>
  onEnvironment(['test', 'live'], params)(sendMetric);

export default sendCustomMetric;
