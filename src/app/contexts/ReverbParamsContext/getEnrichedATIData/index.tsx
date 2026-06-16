import useOptimizelyVariation, {
  ExperimentType,
} from '#app/hooks/useOptimizelyVariation';
import { ComponentExperimentProps } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
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

export default ({ atiData, pageMetadata, requestContext, serviceContext }) => {
  const { pageType } = requestContext;

  console.log('&&&&&&&&&&&&&&&&&&&&&');
  console.log('I GET HERE');
  console.log('+++++++++++++++++++++');
  console.log('pageType - ', pageType);
  console.log('&&&&&&&&&&&&&&&&&&&&&');

  if (pageType === ARTICLE_PAGE) {
    const { brandName } = serviceContext;

    const isPGL = pageMetadata?.type === PHOTO_GALLERY_PAGE;
    const isSTY = pageMetadata?.type === STORY_PAGE;
    const isCPS = isPGL || isSTY;

    // EXPERIMENT: Topic Discovery
    const topicDiscoveryExperimentName = 'newswb_ws_topic_discovery_module';
    const topicDiscoveryVariant = useOptimizelyVariation({
      experimentName: topicDiscoveryExperimentName,
      experimentType: ExperimentType.CLIENT_SIDE,
    });

    const isTopicDiscoveryVariant =
      topicDiscoveryVariant && topicDiscoveryVariant !== 'off';

    const topicDiscoveryExperimentProps = getActiveExperimentProps(
      topicDiscoveryExperimentName,
      topicDiscoveryVariant,
    );

    const enrichedData = {
      ...atiData,
      ...(isCPS && { pageTitle: `${atiData.pageTitle} - ${brandName}` }),
      ...(isTopicDiscoveryVariant &&
        topicDiscoveryExperimentProps && {
          experimentName: topicDiscoveryExperimentProps.experimentName,
          experimentVariant: topicDiscoveryExperimentProps.experimentVariant,
        }),
    };

    return enrichedData;
  }

  return atiData;
};
