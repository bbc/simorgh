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

export default ({ headers, service, derivedPageType }: Props) => {
  return Object.entries(headers).reduce<ServerSideExperiment[]>(
    (result, [header, content]) => {
      if (header.startsWith('mvt-')) {
        const experimentName = header.slice(4);

        const enabled = enabledExperimentList.some(
          ({ name, services, pageTypes }) =>
            noMvtPrefixHeader === name &&
            services.includes(service) &&
            pageTypes.includes(derivedPageType),
        );

        const hasType = content.includes(';');

        if (hasType) {
          const [type, variation] = content.split(';');
          result.push({
            experimentName: noMvtPrefixHeader,
            variation,
            type: type as ServerSideExperiment['type'],
            enabled,
          });
        } else {
          const variation = content;
          result.push({
            experimentName: noMvtPrefixHeader,
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
