import enabledExperimentList from '../enabledExperimentsList';

const getMvtVaryHeaders = (mvtExperiments, service, derivedPageType) => {
  return enabledExperimentList
    .reduce((headerNames, experiment) => {
      const { name, services, pageTypes } = experiment;

      const isMvtExperimentEnabled =
        mvtExperiments.some(({ experimentName }) => experimentName === name) &&
        services.includes(service) &&
        pageTypes.includes(derivedPageType);

      if (isMvtExperimentEnabled) {
        return `${headerNames}mvt-${name}, `;
      }
      return headerNames;
    }, '')
    .slice(0, -2);
};

export default getMvtVaryHeaders;
