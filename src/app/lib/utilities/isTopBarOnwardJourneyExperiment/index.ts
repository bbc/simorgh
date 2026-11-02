import { ServerSideExperiment } from '#app/models/types/global';

const TOP_BAR_ONWARD_JOURNEY_EXPERIMENT = 'newswb_ws_topbarojs_read_more';

const TOP_BAR_ONWARD_JOURNEY_VARIATIONS = [
  'top-bar-top-stories',
  'read-more-a-and-top-stories',
];

export default (serverSideExperiments?: ServerSideExperiment[] | null) =>
  serverSideExperiments?.some(
    ({ experimentName, variation }) =>
      experimentName === TOP_BAR_ONWARD_JOURNEY_EXPERIMENT &&
      TOP_BAR_ONWARD_JOURNEY_VARIATIONS.includes(variation),
  ) ?? false;
