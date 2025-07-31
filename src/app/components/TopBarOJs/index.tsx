/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import { ServiceContext } from '../../contexts/ServiceContext';
import PromoList from './PromoList';
import styles from './index.styles';

interface TopBarOJsProps {
  blocks: TopStoryItem[];
  id?: string;
  eventTrackingData?: EventTrackingMetadata;
}

const TopBarOJs = ({
  blocks,
  id = 'top-bar-onward-journeys',
  eventTrackingData,
}: TopBarOJsProps) => {
  const { translations } = use(ServiceContext);

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  const title = translations.topStoriesTitle || 'Top Stories';

  const ariaLabel = title && idSanitiser(title);

  const a11yAttributes = ariaLabel
    ? { 'aria-labelledby': ariaLabel }
    : {
        'aria-label': pathOr(
          'Related Content',
          ['relatedContent'],
          translations,
        ),
      };

  return (
    <>
      <section role="region" aria-labelledby={id} data-testid={id} />
      <div css={styles.labelComponent} id={ariaLabel} data-testid="oj-top-bar">
        {title}
      </div>
      <div css={styles.promoContainer}>
        <PromoList
          blocks={blocks}
          viewTracker={viewTracker}
          clickTracker={clickTracker}
          a11yAttributes={a11yAttributes}
        />
      </div>
    </>
  );
};

export default TopBarOJs;
