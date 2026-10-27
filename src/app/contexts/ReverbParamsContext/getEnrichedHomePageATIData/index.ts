import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ComponentExperimentProps } from '#app/models/types/global';

const getActiveExperimentProps = (
  experimentName: string,
  experimentVariant: string | null,
): ComponentExperimentProps | null =>
  experimentVariant
    ? {
        sendOptimizelyEvents: true,
        experimentName,
        experimentVariant,
      }
    : null;

export default ({ pageMetadata }) => {
  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  // EXPERIMENT: Home page AA test for Piano activation tracking
  const testPageViewsExperimentName = 'test_page_views_aa_4';
  const testPageViewsVariant = useOptimizelyVariation({
    experimentName: testPageViewsExperimentName,
    experimentType: ExperimentType.CLIENT_SIDE,
  });

  const isTestPageViewsVariant =
    testPageViewsVariant && testPageViewsVariant !== 'off';

  const testPageViewsExperimentProps = getActiveExperimentProps(
    testPageViewsExperimentName,
    testPageViewsVariant,
  );

  const enrichedData = {
    ...atiData,
    ...(isTestPageViewsVariant &&
      testPageViewsExperimentProps && {
        experimentName: testPageViewsExperimentProps.experimentName,
        experimentVariant: testPageViewsExperimentProps.experimentVariant,
        experimentProps: testPageViewsExperimentProps,
      }),
  };

  return enrichedData;
};
