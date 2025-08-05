/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import { use } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { ServiceContext } from '../../contexts/ServiceContext';
import PromoList from './PromoList';
import styles from './index.styles';

interface TopBarOJsProps {
  blocks: TopStoryItem[];
  id?: string;
}

const eventTrackingData = {
  componentName: 'top-bar-oj',
};

const TopBarOJs = ({
  blocks,
  id = 'top-bar-onward-journeys',
}: TopBarOJsProps) => {
  const { translations } = use(ServiceContext);

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = {
    ...eventTrackingData,
    ...useClickTrackerHandler(eventTrackingData),
  };

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  const title = translations.topStoriesTitle || 'Top Stories';

  return (
    <section
      role="region"
      aria-labelledby={id}
      data-testid={id}
      {...viewTracker}
    >
      <strong css={styles.labelComponent} id={id}>
        {title}
      </strong>
      <div css={styles.promoContainer}>
        <PromoList blocks={blocks} eventTrackingData={clickTracker} />
      </div>
    </section>
  );
};

export default TopBarOJs;
