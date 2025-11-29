/** @jsx jsx */
import { jsx } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { OptimoBlock } from '#app/models/types/optimo';
import { MostReadData } from '#app/components/MostRead/types';
import RelatedContentSection from '../../../components/RelatedContentSection';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';
import MostRead from '../../../components/MostRead';

interface GetUnderArticleComponentsProps {
  referrerVariant: string;
  referrerExperimentName: string;
  topStoriesData: unknown;
  featuresData: unknown;
  articleBlocks: OptimoBlock[];
  grey2: string;
  mostReadData: MostReadData;
  showRelatedTopics: boolean;
  pageStyles: Record<string, any>;
}

const getUnderArticleComponents = ({
  referrerVariant,
  referrerExperimentName,
  topStoriesData,
  featuresData,
  articleBlocks,
  grey2,
  mostReadData,
  showRelatedTopics,
  pageStyles,
}: GetUnderArticleComponentsProps) => {
  // console.log('Under Article Referrer Variant:', referrerVariant);
  const relatedContent = (
    <div key="relatedContent" css={pageStyles.hideOnDesktop}>
      <RelatedContentSection
        content={articleBlocks}
        {...(referrerVariant && {
          experimentProps: {
            sendOptimizelyEvents: true,
            experimentName: referrerExperimentName,
            experimentVariant: referrerVariant,
          },
        })}
      />
    </div>
  );

  const topStoriesArray = Array.isArray(topStoriesData) ? topStoriesData : [];

  const topStoriesComponent =
    topStoriesArray.length > 0 ? (
      <div key="topStories" css={pageStyles.hideOnDesktop}>
        <TopStoriesSection
          content={topStoriesArray}
          {...(referrerVariant && {
            experimentProps: {
              sendOptimizelyEvents: true,
              experimentName: referrerExperimentName,
              experimentVariant: referrerVariant,
            },
          })}
        />
      </div>
    ) : null;

  const featuresComponent = featuresData ? (
    <div key="features" css={pageStyles.hideOnDesktop}>
      <FeaturesAnalysis
        content={featuresData}
        parentColumns={{}}
        sectionLabelBackground={grey2}
        {...(referrerVariant && {
          experimentProps: {
            sendOptimizelyEvents: true,
            experimentName: referrerExperimentName,
            experimentVariant: referrerVariant,
          },
        })}
      />
    </div>
  ) : null;

  const mostReadComponent = (
    <div key="mostRead" css={pageStyles.hideOnDesktop}>
      <MostRead
        data={mostReadData}
        columnLayout="multiColumn"
        size="default"
        headingBackgroundColour={grey2}
        mobileDivider={showRelatedTopics}
        eventTrackingData={{
          componentName: 'most-read',
          ...(referrerVariant && {
            sendOptimizelyEvents: true,
            experimentName: referrerExperimentName,
            experimentVariant: referrerVariant,
          }),
        }}
      />
    </div>
  );

  if (
    referrerVariant === 'control' ||
    referrerVariant === 'off' ||
    referrerVariant === 'adaptive_search'
  ) {
    return [
      relatedContent,
      topStoriesComponent,
      featuresComponent,
      mostReadComponent,
    ].filter(Boolean);
  }
  if (referrerVariant === 'adaptive_social') {
    return [
      featuresComponent,
      relatedContent,
      topStoriesComponent,
      mostReadComponent,
    ].filter(Boolean);
  }
  if (referrerVariant === 'adaptive_direct') {
    return [
      topStoriesComponent,
      relatedContent,
      featuresComponent,
      mostReadComponent,
    ].filter(Boolean);
  }
  return [
    relatedContent,
    topStoriesComponent,
    featuresComponent,
    mostReadComponent,
  ].filter(Boolean);
};

export default getUnderArticleComponents;
