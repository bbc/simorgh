/** @jsx jsx */
import { use } from 'react';
import { jsx, useTheme } from '@emotion/react';
import { pathOr } from 'ramda';
import useToggle from '#hooks/useToggle';
import SectionLabel from '#psammead/psammead-section-label/src';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { Recommendation } from '#app/models/types/onwardJourney';
import { OptimoBlock } from '#app/models/types/optimo';
import styles from './index.styles';
import RecommendationsItem from './RecommendationsItem';
import {
  getRelatedContentData,
  mapOptimoBlockToRecommendation,
  mapFeaturesToRecommendation,
  mapTopStoryToRecommendation,
} from './helpers';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

interface RecommendationsProps {
  data: Recommendation[];
  blocks?: OptimoBlock[];
  topStoriesContent?: unknown;
  featuresContent?: unknown;
  referrerExperimentVariant?: string;
}

const Recommendations = ({
  data, // control
  blocks, // search
  topStoriesContent, // direct
  featuresContent, // social
  referrerExperimentVariant, // experiment variant for referrer
}: RecommendationsProps) => {
  const { recommendations, script, service, dir, translations } =
    use(ServiceContext);

  const viewTracker = useViewTracker(eventTrackingData);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const { enabled } = useToggle('midArticleOnwardJourney');

  let displayData: Recommendation[] = [];
  const { skipLink, header } = recommendations || {};

  let title = header ?? 'Most read';
  // most read  was there originally, so is there for control and when the user is not in an experiment
  if (
    !referrerExperimentVariant ||
    referrerExperimentVariant === 'off' ||
    referrerExperimentVariant.includes('control')
  ) {
    displayData = data ?? [];
  } else if (referrerExperimentVariant === 'adaptive_search') {
    displayData = getRelatedContentData(blocks ?? []).map(
      mapOptimoBlockToRecommendation,
    );
    title = pathOr('Related Content', ['relatedContent'], translations);
  } else if (referrerExperimentVariant === 'adaptive_direct') {
    displayData = Array.isArray(topStoriesContent)
      ? topStoriesContent.map(mapTopStoryToRecommendation)
      : [];
    title = translations?.topStoriesTitle ?? 'Top Stories';
  } else if (referrerExperimentVariant === 'adaptive_social') {
    displayData = Array.isArray(featuresContent)
      ? featuresContent.slice(0, 4).map(mapFeaturesToRecommendation)
      : [];
    title = pathOr(
      'Features & Analysis',
      ['featuresAnalysisTitle'],
      translations,
    );
  }

  if (!enabled || !displayData.length) return null;

  const labelId = 'recommendations-heading';

  const a11yAttributes = {
    role: 'region',
    'aria-labelledby': labelId,
  };

  const { text, endTextVisuallyHidden } = skipLink || {
    text: 'Skip %title% and continue reading',
    endTextVisuallyHidden: 'End of %title%',
  };

  const terms = { '%title%': title };

  const isSinglePromo = displayData.length === 1;

  const endTextId = `end-of-recommendations`;

  const skipLinkProps = {
    endTextId,
    terms,
    text,
    endTextVisuallyHidden,
  };

  return (
    <section
      css={styles.recommendationsWrapper}
      data-e2e={labelId}
      {...a11yAttributes}
    >
      <SkipLinkWrapper service={service} {...skipLinkProps}>
        {title ? (
          <SectionLabel
            css={styles.labelComponent}
            script={script}
            service={service}
            dir={dir}
            labelId={labelId}
            columnType="main"
            mobileDivider={false}
            overrideHeadingAs="strong"
            bar={false}
            backgroundColor={GREY_2}
          >
            {title}
          </SectionLabel>
        ) : null}
        {isSinglePromo ? (
          <RecommendationsItem recommendation={displayData?.[0]} />
        ) : (
          <ul css={styles.recommendationsList} role="list" {...viewTracker}>
            {displayData?.map(recommendation => (
              <li key={recommendation.id} role="listitem">
                <RecommendationsItem recommendation={recommendation} />
              </li>
            ))}
          </ul>
        )}
      </SkipLinkWrapper>
    </section>
  );
};

export default Recommendations;
