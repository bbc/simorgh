import React, { use } from 'react';
import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Promo from './Promo';
import PromoList from './PromoList';

// interface TopBarOJsProps {
//     blocks: ,
//     blockGroupIndex?: number | null;
//     eventTrackingData?: EventTrackingMetadata;
// };

const TopBarOJs = ({
  blocks,
  blockGroupIndex = null,
  experimentVariant = null,
}: TopBarOJsProps) => {
  const { script, service, dir, translations, mostRead } = use(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
    ...(experimentVariant && {
      componentName: 'top-bar-oj',
      sendOptimizelyEvents: true,
      viewThreshold: 0,
    }),
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  let title;
  if (
    ['top-bar-top-stories', 'read-more-a-and-top-stories'].includes(
      experimentVariant,
    )
  ) {
    title = translations.topStoriesTitle || 'Top Stories';
  } else if (experimentVariant === 'top-bar-most-read') {
    title = mostRead.header || 'Most Read';
  } else {
    title =
      blocks[0].type === 'title' &&
      path(
        ['0', 'model', 'blocks', '0', 'model', 'blocks', '0', 'model', 'text'],
        blocks,
      );
  }

  const blocksWithoutTitle = blocks[0].type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const ariaLabel = title && idSanitiser(title);

  const a11yAttributes = {
    ...(!experimentVariant && {
      as: 'section',
      role: 'region',
    }),
    ...(ariaLabel
      ? { 'aria-labelledby': ariaLabel }
      : {
          'aria-label': pathOr(
            'Related Content',
            ['relatedContent'],
            translations,
          ),
        }),
  };

  return experimentVariant ? (
    <>
      <LabelComponentOJTopBar
        id={ariaLabel}
        data-testid="oj-top-bar"
        script={script}
        service={service}
        dir={dir}
      >
        {title}
      </LabelComponentOJTopBar>
      <ScrollablePromoContainer experimentVariant={experimentVariant}>
        <GridItemMediumNoMargin>
          <PromoList
            blocks={blocks}
            experimentVariant={experimentVariant}
            viewTracker={viewTracker}
            clickTracker={clickTracker}
            a11yAttributes={a11yAttributes}
          />
        </GridItemMediumNoMargin>
      </ScrollablePromoContainer>
    </>
  ) : (
    <GridItemMediumNoMargin {...a11yAttributes} data-e2e="scrollable-promos">
      {title && (
        <LabelComponent
          id={ariaLabel}
          data-testid="eoj-recommendations-heading"
          script={script}
          service={service}
          dir={dir}
        >
          {title}
        </LabelComponent>
      )}
      {isSingleItem ? (
        <PromoWrapper dir={dir} {...viewTracker}>
          <Promo block={blocksWithoutTitle[0]} clickTracker={clickTracker} />
        </PromoWrapper>
      ) : (
        <PromoList
          blocks={blocksWithoutTitle}
          viewTracker={viewTracker}
          clickTracker={clickTracker}
        />
      )}
    </GridItemMediumNoMargin>
  );
};

export default TopBarOJs;
