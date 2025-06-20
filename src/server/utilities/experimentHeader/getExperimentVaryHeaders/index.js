export default mvtExperiments => {
  return mvtExperiments
    .reduce((headerNames, experiment) => {
      const { experimentName, enabled } = experiment;

      if (enabled) {
        return `${headerNames}mvt-${experimentName}, `;
      }
      return headerNames;
    }, '')
    .slice(0, -2);
};
