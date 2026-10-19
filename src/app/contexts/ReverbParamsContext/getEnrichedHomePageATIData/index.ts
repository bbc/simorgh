import { ComponentExperimentProps } from '#app/models/types/global';
import { ATIData } from '#app/components/ATIAnalytics/types';

export const HOME_PAGE_VIEWS_EXPERIMENT_NAME = 'test_page_views_aa_4';

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

  const isTestPageViewsVariant =
    experimentVariant && experimentVariant !== 'off';

  const testPageViewsExperimentProps = getActiveExperimentProps(
    HOME_PAGE_VIEWS_EXPERIMENT_NAME,
    experimentVariant,
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
