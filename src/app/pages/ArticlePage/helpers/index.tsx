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
      <div key="topStories" data-testid="top-stories" css={sectionStyles}>
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
    <div key="features" data-testid="features" css={sectionStyles}>
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

  // this could be simplified by only calling this function if the variants are adaptive_social or adaptive_direct
  // leaving the other cases with the original unordered experience. However, this makes it more flexible
  // to change the orders for different variants in the future, and is easy to understand.

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
