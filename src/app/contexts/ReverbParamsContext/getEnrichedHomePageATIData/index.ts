import { ComponentExperimentProps } from '#app/models/types/global';
import { ATIData } from '#app/components/ATIAnalytics/types';

// EXPERIMENT: replace with the name of an active client side home page experiment
export const HOME_PAGE_EXPERIMENT_NAME = 'test_homepage_client_side_aa';

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

export default ({
  pageMetadata,
  experimentVariant = null,
}: {
  pageMetadata?: { atiAnalytics?: ATIData };
  experimentVariant?: string | null;
}) => {
  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  const isActiveVariant = experimentVariant && experimentVariant !== 'off';

  const experimentProps = getActiveExperimentProps(
    HOME_PAGE_EXPERIMENT_NAME,
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
