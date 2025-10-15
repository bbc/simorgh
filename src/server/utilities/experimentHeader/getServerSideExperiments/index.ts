import {
  PageTypes,
  ServerSideExperiment,
  Services,
} from '#app/models/types/global';
import { IncomingHttpHeaders } from 'node:http';
import enabledExperimentList from '../enabledExperimentsList';

type Props = {
  headers: IncomingHttpHeaders;
  service: Services;
  pageType: PageTypes;
};

export default ({ headers, service, pageType }: Props) => {
  return Object.entries(headers).reduce<ServerSideExperiment[]>(
    (result, [header, content]) => {
      if (header.startsWith('mvt-')) {
        const experimentName = header.slice(4);

        const enabled = enabledExperimentList.some(
          ({ name, services, pageTypes }) =>
            experimentName === name &&
            services.includes(service) &&
            pageTypes.includes(pageType),
        );

        const isString = typeof content === 'string';
        const hasType = isString && content.includes(';');

        if (hasType && isString) {
          const [type, variation] = content.split(';');
          result.push({
            experimentName,
            variation,
            type: type as ServerSideExperiment['type'],
            enabled,
          });
        } else {
          const variation = isString ? content : '';
          result.push({
            experimentName,
            variation,
            enabled,
          });
        }
      }
      return result;
    },
    [],
  );
};
