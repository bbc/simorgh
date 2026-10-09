import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ComponentExperimentProps } from '#app/models/types/global';
import {
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';

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

export default ({ pageMetadata, serviceContext }) => {
  const { brandName } = serviceContext;

  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  const isPGL = pageMetadata?.type === PHOTO_GALLERY_PAGE;
  const isSTY = pageMetadata?.type === STORY_PAGE;
  const isCSP = pageMetadata?.type === CORRESPONDENT_STORY_PAGE;
  const isCPS = isPGL || isSTY || isCSP;

  // EXPERIMENT: Topic Discovery
  const testPageViewsExperimentName = 'test_page_views_aa_3';
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
    ...(isCPS && { pageTitle: `${atiData.pageTitle} - ${brandName}` }),
    ...(isTestPageViewsVariant &&
      testPageViewsExperimentProps && {
        experimentName: testPageViewsExperimentProps.experimentName,
        experimentVariant: testPageViewsExperimentProps.experimentVariant,
        experimentProps: testPageViewsExperimentProps,
      }),
  };

  return enrichedData;
};
