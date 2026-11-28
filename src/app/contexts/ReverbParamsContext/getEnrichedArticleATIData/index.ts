import { ComponentExperimentProps } from '#app/models/types/global';
import { ATIData } from '#app/components/ATIAnalytics/types';
import {
  CORRESPONDENT_STORY_PAGE,
  PHOTO_GALLERY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';

export const ARTICLE_PAGE_VIEWS_EXPERIMENT_NAME = 'test_page_views_aa_3';

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
  serviceContext,
  experimentVariant = null,
}: {
  pageMetadata?: { atiAnalytics?: ATIData; type?: string };
  serviceContext: { brandName: string };
  experimentVariant?: string | null;
}) => {
  const { brandName } = serviceContext;

  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  const isPGL = pageMetadata?.type === PHOTO_GALLERY_PAGE;
  const isSTY = pageMetadata?.type === STORY_PAGE;
  const isCSP = pageMetadata?.type === CORRESPONDENT_STORY_PAGE;
  const isCPS = isPGL || isSTY || isCSP;

  const isTestPageViewsVariant =
    experimentVariant && experimentVariant !== 'off';

  const testPageViewsExperimentProps = getActiveExperimentProps(
    ARTICLE_PAGE_VIEWS_EXPERIMENT_NAME,
    experimentVariant,
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
