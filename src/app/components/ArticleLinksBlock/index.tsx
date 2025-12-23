import { use } from 'react';
import isEmpty from 'ramda/src/isEmpty';
import tail from 'ramda/src/tail';
import { GridItemMediumNoMargin } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import idSanitiser from '#lib/utilities/idSanitiser';
import { OptimoBlock } from '#app/models/types/optimo';
import { ServiceContext } from '../../contexts/ServiceContext';
import Promo from './Promo';
import PromoList from './PromoList';
import styles from './index.styles';

interface ArticleLinksBlockProps {
  blocks: OptimoBlock[];
  blockGroupIndex?: number | null;
}

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
        <strong
          css={styles.labelComponent}
          id={ariaLabel}
          data-testid="eoj-recommendations-heading"
          dir={dir}
        >
          {title}
        </strong>
      )}
      {isSingleItem ? (
        <div css={styles.promoContainer} dir={dir} {...viewTracker}>
          <Promo block={blocksWithoutTitle[0]} {...clickTracker} />
        </div>
      ) : (
        <PromoList
          blocks={blocksWithoutTitle}
          {...viewTracker}
          clickTracker={clickTracker}
          a11yAttributes={a11yAttributes}
        />
      )}
    </GridItemMediumNoMargin>
  );
}

export default ArticleLinksBlock;
