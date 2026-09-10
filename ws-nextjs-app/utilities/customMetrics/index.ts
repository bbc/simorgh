import { metricScope, Unit } from 'aws-embedded-metrics';
import { PageTypes } from '#app/models/types/global';
import onEnvironment from '../onEnvironment';

export type Params = {
  metricName: string;
  statusCode?: number | string;
  pageType?: PageTypes;
  requestUrl: string;
};

export type SendIndividualParams = {
  metricName: string;
  requestUrl: string;
  dimension: Record<string, string>;
};

const sendIndividualMetric = metricScope(
  metrics =>
    async ({ metricName, dimension, requestUrl }: SendIndividualParams) => {
      metrics.setNamespace('Simorgh/Server');

      // Specifies the metric dimensions, each dimension will counted and billed as a custom unique metric
      metrics.putDimensions(dimension);

      // Specifies the metric name and the value to increment it by e.g. Non_200_Response +1
      metrics.putMetric(metricName, 1, Unit.Count);

      // Custom properties are included in the custom metric data but are not charged
      metrics.setProperty('URL', requestUrl);
    },
);

const sendMetrics = ({
  metricName,
  statusCode = 'Unknown',
  pageType = 'Unknown',
  requestUrl,
}: Params) => {
  Promise.allSettled([
    sendIndividualMetric({
      metricName,
      dimension: {
        PageType: pageType,
        StatusCode: statusCode.toString(),
      },
      requestUrl,
    }),
    sendIndividualMetric({
      metricName,
      dimension: {
        StatusCode: statusCode.toString(),
      },
      requestUrl,
    }),
  ]);
};

const sendCustomMetric = (params: Params) =>
  onEnvironment(['test', 'live'], params)(sendMetrics);

export default sendCustomMetric;
