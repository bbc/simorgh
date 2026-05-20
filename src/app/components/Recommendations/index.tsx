import { use } from 'react';
import { useTheme } from '@emotion/react';

import useViewTracker from '#app/hooks/useViewTracker';
import type { ComponentExperimentProps } from '#app/models/types/global';
import type { Recommendation } from '#app/models/types/onwardJourney';
import SkipLinkWrapper from '#components/SkipLinkWrapper';
import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';
import SectionLabel from '#psammead/psammead-section-label/src';
import styles from './index.styles';
import RecommendationsItem from './RecommendationsItem';

interface RecommendationsProps {
  data: Recommendation[];
  experimentProps?: ComponentExperimentProps;
}

const Recommendations = ({ data, experimentProps }: RecommendationsProps) => {
  const { recommendations, mostRead, dir } = use(ServiceContext);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const { enabled } = useToggle('midArticleOnwardJourney');

  const { skipLink, header } = recommendations || {};

  const title = header ?? 'Most read';

  const componentName = 'midarticle-mostread';
  const groupTracker = {
    name: title,
    type: componentName,
    itemCount: 4,
  };

  const eventTrackingData = {
    componentName,
    groupTracker,
    ...(experimentProps && experimentProps),
  };

  const viewTracker = useViewTracker(eventTrackingData);

  const { hasMostRead } = mostRead || {};

  if (!enabled || !hasMostRead || !data?.length) return null;

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

  const isSinglePromo = data.length === 1;

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
      <SkipLinkWrapper {...skipLinkProps}>
        {title ? (
          <SectionLabel
            css={styles.labelComponent}
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
          <RecommendationsItem recommendation={data?.[0]} />
        ) : (
          <ul css={styles.recommendationsList} role="list" {...viewTracker}>
            {data?.map((recommendation, index) => (
              <li key={recommendation.id} role="listitem">
                <RecommendationsItem
                  recommendation={recommendation}
                  eventTrackingData={{
                    ...eventTrackingData,
                    itemTracker: {
                      type: 'midarticle-mostread-promo',
                      text: recommendation.title,
                      position: index + 1,
                    },
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </SkipLinkWrapper>
    </section>
  );
};

export default Recommendations;
