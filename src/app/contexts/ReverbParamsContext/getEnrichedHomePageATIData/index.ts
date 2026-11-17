import useExperimentVariation, {
  ExperimentType,
} from '#app/hooks/useExperimentVariation';
import { ComponentExperimentProps } from '#app/models/types/global';

const getActiveExperimentProps = (
  experimentName: string,
  experimentVariant: string | null,
): ComponentExperimentProps | null =>
  experimentVariant
    ? {
        experimentName,
        experimentVariant,
      }
    : null;

export default ({ pageMetadata }) => {
  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  // EXPERIMENT: replace with the name of an active client side home page experiment
  const experimentName = 'test_homepage_client_side_aa';
  const experimentVariant = useExperimentVariation({
    experimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const isActiveVariant = experimentVariant && experimentVariant !== 'off';

  const experimentProps = getActiveExperimentProps(
    experimentName,
    experimentVariant,
  );

  const enrichedData = {
    ...atiData,
    ...(isActiveVariant &&
      experimentProps && {
        experimentName: experimentProps.experimentName,
        experimentVariant: experimentProps.experimentVariant,
        experimentProps,
      }),
  };

  return enrichedData;
};
