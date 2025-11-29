/** @jsx jsx */
import { jsx } from '@emotion/react';
import FeaturesAnalysis from '#containers/CpsFeaturesAnalysis';
import { OptimoBlock } from '#app/models/types/optimo';
import RelatedContentSection from '../../../components/RelatedContentSection';
import TopStoriesSection from '../PagePromoSections/TopStoriesSection';

interface GetUnderArticleComponentsProps {
  referrerVariant: string;
  referrerExperimentName: string;
  topStoriesData: unknown;
  featuresData: unknown;
  articleBlocks: OptimoBlock[];
  grey2: string;
  pageStyles: Record<string, any>;
}

const getUnderArticleComponents = ({
  referrerVariant,
  referrerExperimentName,
  topStoriesData,
  featuresData,
  articleBlocks,
  grey2,
  pageStyles,
}: GetUnderArticleComponentsProps) => {
  const sectionStyles = [
    pageStyles.hideOnDesktop,
    pageStyles.underArticleSection,
  ];
  const relatedContent = (
    <div key="relatedContent" css={sectionStyles}>
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
      <div key="topStories" css={sectionStyles}>
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
    <div key="features" css={sectionStyles}>
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

  if (referrerVariant === 'adaptive_social') {
    return [featuresComponent, relatedContent, topStoriesComponent].filter(
      Boolean,
    );
  }
  if (referrerVariant === 'adaptive_direct') {
    return [topStoriesComponent, relatedContent, featuresComponent].filter(
      Boolean,
    );
  }
  // Default for 'control', 'off', 'adaptive_search', '', or any unknown value
  return [relatedContent, topStoriesComponent, featuresComponent].filter(
    Boolean,
  );
};

export default getUnderArticleComponents;
