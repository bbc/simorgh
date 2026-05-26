import type { ServerSideExperiment } from '#app/models/types/global';

export default (serverSideExperiments: ServerSideExperiment[]) =>
  serverSideExperiments
    .reduce((headerNames, experiment) => {
      const { experimentName, enabled } = experiment;

      if (enabled) {
        return `${headerNames}mvt-${experimentName}, `;
      }
      return headerNames;
    }, '')
    .slice(0, -2);
