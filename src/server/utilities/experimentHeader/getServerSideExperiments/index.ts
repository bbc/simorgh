import {
  PageTypes,
  ServerSideExperiment,
  Services,
} from '#app/models/types/global';
import enabledExperimentList from '../enabledExperimentsList';

type Props = {
  headers: Record<string, string>;
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

        const hasType = content.includes(';');

        if (hasType) {
          const [type, variation] = content.split(';');
          result.push({
            experimentName,
            variation,
            type: type as ServerSideExperiment['type'],
            enabled,
          });
        } else {
          const variation = content;
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
