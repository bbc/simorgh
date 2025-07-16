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

const ScrollablePromo = ({
  blocks,
  blockGroupIndex = null,
  experimentVariant = null,
}) => {
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

  // Common classes for directional margins
  const getDirectionalMargin = (size) => {
    return dir === 'ltr' ? `ml-${size}` : `mr-${size}`;
  };

  return experimentVariant ? (
    <>
      <strong
        id={ariaLabel}
        data-testid="oj-top-bar"
        className={`
          text-brevier font-sans-regular inline-block mb-double
          text-shadow dark:text-grey-2
          ${getDirectionalMargin('single')} group-2:${getDirectionalMargin('double')} group-4:${getDirectionalMargin('0')}
          px-single group-2:px-double group-2:mx-[-0.2rem] group-3:mx-[-0.8rem] group-3-max:hidden
          flex items-center h-quadruple bg-grey-2 w-screen
        `}
      >
        {title}
      </strong>
      <div className={`
        bg-grey-2 p-single flex overflow-x-auto
        scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]
        [&::-webkit-scrollbar]:hidden
        ${experimentVariant && experimentVariant !== 'off' ? `
          p-0 pb-double mx-0 group-2:px-double group-2:pb-double group-2:mx-[-0.2rem]
          group-3:mx-[-0.8rem] group-3-max:hidden w-screen
        ` : ''}
      `}>
        <GridItemMediumNoMargin>
          <PromoList
            blocks={blocks}
            experimentVariant={experimentVariant}
            viewTracker={viewTracker}
            clickTracker={clickTracker}
            a11yAttributes={a11yAttributes}
          />
        </GridItemMediumNoMargin>
      </div>
    </>
  ) : (
    <GridItemMediumNoMargin {...a11yAttributes} data-e2e="scrollable-promos">
      {title && (
        <strong
          id={ariaLabel}
          data-testid="eoj-recommendations-heading"
          className={`
            block text-double-pica font-sans-regular mb-double
            text-shadow dark:text-grey-2
            ${getDirectionalMargin('single')} group-2:${getDirectionalMargin('double')} group-4:${getDirectionalMargin('0')}
          `}
        >
          {title}
        </strong>
      )}
      {isSingleItem ? (
        <div className={`${getDirectionalMargin('single')} group-2:${getDirectionalMargin('double')} group-4:${getDirectionalMargin('0')}`} {...viewTracker}>
          <Promo block={blocksWithoutTitle[0]} clickTracker={clickTracker} />
        </div>
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

export default ScrollablePromo;
