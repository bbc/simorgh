/** @jsx jsx */
import { use } from 'react';
import { jsx, useTheme } from '@emotion/react';

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
} from './helpers';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

interface RecommendationsProps {
  data: Recommendation[];
  blocks: OptimoBlock[];
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
  const { recommendations, mostRead, script, service, dir } =
    use(ServiceContext);

  // eslint-disable-next-line no-console
  console.log('Recommendations data:', data);
  // eslint-disable-next-line no-console
  console.log('Recommendations blocks:', blocks);
  // eslint-disable-next-line no-console
  console.log('Recommendations topStoriesContent:', topStoriesContent);
  // eslint-disable-next-line no-console
  console.log('Recommendations featuresContent:', featuresContent);
  // eslint-disable-next-line no-console
  console.log(
    'Recommendations referrerExperimentVariant:',
    referrerExperimentVariant,
  );
  const viewTracker = useViewTracker(eventTrackingData);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const { enabled } = useToggle('midArticleOnwardJourney');

  let displayData: Recommendation[] = [];

  if (
    !referrerExperimentVariant ||
    referrerExperimentVariant === 'off' ||
    referrerExperimentVariant.includes('control')
  ) {
    displayData = data ?? [];
  } else if (referrerExperimentVariant === 'search') {
    displayData = getRelatedContentData(blocks).map(
      mapOptimoBlockToRecommendation,
    );
    console.log('displayData from related content: ', displayData);
    // Log the nested blocks for inspection
  } else if (referrerExperimentVariant === 'direct') {
    displayData = Array.isArray(topStoriesContent) ? topStoriesContent : [];
  } else if (referrerExperimentVariant === 'social') {
    displayData = Array.isArray(featuresContent) ? featuresContent : [];
  }

  if (!enabled || !displayData.length) return null;

  const labelId = 'recommendations-heading';

  const a11yAttributes = {
    role: 'region',
    'aria-labelledby': labelId,
  };

  const { skipLink, header } = recommendations || {};

  const { text, endTextVisuallyHidden } = skipLink || {
    text: 'Skip %title% and continue reading',
    endTextVisuallyHidden: 'End of %title%',
  };

  const title = header ?? 'Most read';

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
