import { use } from 'react';
import styled from '@emotion/styled';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_GROUP_0_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import Promo from './Promo';
import PromoList from './PromoList';

interface ArticleLinksBlockProps {
  blocks: OptimoBlock[];
  blockGroupIndex?: number | null;
}

const PromoWrapper = styled.div<{ dir: string }>(({ dir }) => ({
  [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: GEL_SPACING,
  [`@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN})`]: {
    [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: GEL_SPACING_DBL,
  },
  [`@media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`]: {
    [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: 0,
  },
}));

const LabelComponent = styled.strong<{ dir: string }>(({ theme, dir }) => ({
  display: 'block',
  ...theme.fontSizes.doublePica,
  ...theme.fontVariants.sansRegular,
  marginBottom: GEL_SPACING_DBL,
  color: theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.SHADOW,
  [`@media (min-width: ${GEL_GROUP_0_SCREEN_WIDTH_MIN})`]: {
    [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: GEL_SPACING,
  },
  [`@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN})`]: {
    [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: GEL_SPACING_DBL,
  },
  [`@media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`]: {
    [`margin${dir === 'ltr' ? 'Left' : 'Right'}`]: 0,
  },
}));

function ArticleLinksBlock({
  blocks,
  blockGroupIndex = null,
}: ArticleLinksBlockProps) {
  const { dir, translations } = use(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!blocks || isEmpty(blocks)) {
    return null;
  }

  const title =
    blocks[0]?.type === 'title'
      ? // @ts-expect-error - deeply nested
        (blocks[0]?.model?.blocks?.[0].model?.blocks?.[0]?.model?.text ??
        undefined)
      : undefined;

  const blocksWithoutTitle =
    blocks[0]?.type === 'title' ? tail(blocks) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const ariaLabel = title ? idSanitiser(title) : undefined;

  const a11yAttributes = {
    as: 'section',
    role: 'region',
    ...(ariaLabel
      ? { 'aria-labelledby': ariaLabel }
      : {
          'aria-label': translations?.relatedContent ?? 'Related Content',
        }),
  };

  return (
    <GridItemMediumNoMargin {...a11yAttributes} data-e2e="scrollable-promos">
      {typeof title === 'string' && title.length > 0 && (
        <LabelComponent
          id={ariaLabel}
          data-testid="eoj-recommendations-heading"
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
          a11yAttributes={a11yAttributes}
        />
      )}
    </GridItemMediumNoMargin>
  );
}

export default ArticleLinksBlock;
