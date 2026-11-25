import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';

export default ({ pageMetadata }) => {
  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  // EXPERIMENT: replace with the name of an active client side home page experiment
  const experimentName = 'test_homepage_client_side_aa';
  const experimentVariant = useOptimizelyVariation({
    experimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const isActiveVariant = experimentVariant && experimentVariant !== 'off';

  const enrichedData = {
    ...atiData,
    // Tags the page view only. Component trackers are attributed to an
    // experiment by rendering them inside <Experiment>.
    ...(isActiveVariant && {
      experimentName,
      experimentVariant,
    }),
  };

  return enrichedData;
};
