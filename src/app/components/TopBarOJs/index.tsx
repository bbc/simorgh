/** @jsx jsx */
/* @jsxFrag React.Fragment */
import { jsx } from '@emotion/react';
import React, { use } from 'react';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { TopStoriesOnwardJourney } from '#app/models/types/onwardJourney';
import { ServiceContext } from '../../contexts/ServiceContext';
import PromoList from './PromoList';
import styles from './index.styles';

interface TopBarOJsProps {
  blocks: TopStoriesOnwardJourney[];
  id?: string;
}

const TopBarOJs = ({
  blocks,
  id = 'top-bar-onward-journeys',
}: TopBarOJsProps) => {
  const { translations } = use(ServiceContext);

  const eventTrackingData = {
    componentName: 'top-bar-oj',
    sendOptimizelyEvents: true,
    viewThreshold: 0,
  };

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
        <GridItemMediumNoMargin>
          <PromoList
            blocks={blocks}
            viewTracker={viewTracker}
            clickTracker={clickTracker}
            a11yAttributes={a11yAttributes}
          />
        </GridItemMediumNoMargin>
      </div>
    </>
  );
};

export default TopBarOJs;
