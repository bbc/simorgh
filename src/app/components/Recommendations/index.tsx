/** @jsx jsx */
import { useContext } from 'react';
import { jsx, useTheme } from '@emotion/react';

import useToggle from '#hooks/useToggle';
import SectionLabel from '#psammead/psammead-section-label/src';
import SkipLinkWrapper from '#components/SkipLinkWrapper';

import { ServiceContext } from '#contexts/ServiceContext';
import useViewTracker from '#app/hooks/useViewTracker';
import { Recommendation } from '#app/models/types/onwardJourney';
import RecommendationsItem from './RecommendationsItem';
import styles from './index.styles';

const eventTrackingData = {
  componentName: 'midarticle-mostread',
};

const Recommendations = ({ data }: { data: Recommendation[] }) => {
  const { recommendations, mostRead, script, service, dir } =
    useContext(ServiceContext);

  const viewEventTracker = useViewTracker(eventTrackingData);

  const {
    palette: { GREY_2 },
  } = useTheme();

  const { enabled } = useToggle('mostRead');

  const { hasMostRead } = mostRead || {};

  if (!enabled || !hasMostRead || !data?.length) return null;

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

  const isSinglePromo = data?.length === 1;

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
          <RecommendationsItem recommendation={data?.[0]} />
        ) : (
          <ul
            css={styles.recommendationsList}
            role="list"
            ref={viewEventTracker}
          >
            {data?.map(recommendation => (
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
