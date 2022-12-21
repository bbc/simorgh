import enabledExperimentList from '../enabledExperimentsList';

const getMvtExperiments = (headers, service, derivedPageType) => {
  return Object.entries(headers).reduce((result, [header, content]) => {
    if (header.startsWith('mvt-')) {
      const noMvtPrefixHeader = header.slice(4);

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
          type,
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
  }, []);
};

export default getMvtExperiments;
