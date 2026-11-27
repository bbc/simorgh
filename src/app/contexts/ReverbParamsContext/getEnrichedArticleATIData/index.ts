import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import {
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';

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

  const enrichedData = {
    ...atiData,
    ...(isCPS && { pageTitle: `${atiData.pageTitle} - ${brandName}` }),
    // Tags the page view only. Component trackers are attributed to an
    // experiment by rendering them inside <Experiment>.
    ...(isTestPageViewsVariant && {
      experimentName: testPageViewsExperimentName,
      experimentVariant: testPageViewsVariant,
    }),
  };

  return enrichedData;
};
