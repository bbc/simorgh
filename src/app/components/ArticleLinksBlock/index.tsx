import { use } from 'react';
import useViewTracker from '#hooks/useViewTracker';
import idSanitiser from '#lib/utilities/idSanitiser';
import { OptimoBlock } from '#app/models/types/optimo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import SkipLinkWrapper from '#app/legacy/components/SkipLinkWrapper';
import { ServiceContext } from '../../contexts/ServiceContext';
import Promo from './Promo';
import PromoList from './PromoList';
import styles from './index.module.scss';

interface ArticleLinksBlockProps {
  blocks: OptimoBlock[];
  blockGroupIndex?: number | null;
}

const ArticleLinksBlock = ({
  blocks,
  blockGroupIndex = null,
}: ArticleLinksBlockProps) => {
  const { translations, recommendations } = use(ServiceContext);

  const eventTrackingData = {
    componentName: `edoj${blockGroupIndex}`,
    format: 'CHD=edoj',
  };

  const viewTracker = useViewTracker(eventTrackingData);
  const clickTracker = useClickTrackerHandler(eventTrackingData);

  if (!blocks || blocks.length === 0) return null;

  const title =
    blocks[0]?.type === 'title'
      ? // @ts-expect-error - deeply nested
        (blocks[0]?.model?.blocks?.[0].model?.blocks?.[0]?.model?.text ??
        undefined)
      : undefined;

  const blocksWithoutTitle =
    blocks[0]?.type === 'title' ? blocks.slice(1) : blocks;

  const isSingleItem = blocksWithoutTitle.length === 1;

  const ariaLabel = title ? idSanitiser(title) : undefined;

  const a11yAttributes = {
    role: 'region',
    ...(ariaLabel
      ? { 'aria-labelledby': ariaLabel }
      : {
          'aria-label': translations?.relatedContent ?? 'Related Content',
        }),
  };

  const { skipLink } = recommendations || {};

  const { text, endTextVisuallyHidden } = skipLink || {
    text: 'Skip content and continue reading',
    endTextVisuallyHidden: 'End of content',
  };

  const terms = { '%title%': title || 'content' };

  const endTextId = `end-of-article-links-block`;

  const skipLinkProps = {
    endTextId,
    terms,
    text: text.replace('%title%', terms['%title%']),
    endTextVisuallyHidden,
  };

  return (
    <section {...a11yAttributes} data-e2e="article-links-block">
      <SkipLinkWrapper {...skipLinkProps}>
        {typeof title === 'string' && title.length > 0 && (
          <strong
            className={styles.labelComponent}
            id={ariaLabel}
            data-testid="eoj-recommendations-heading"
          >
            {title}
          </strong>
        )}
        {isSingleItem ? (
          <div className={styles.promoContainer} {...viewTracker}>
            <Promo block={blocksWithoutTitle[0]} clickTracker={clickTracker} />
          </div>
        ) : (
          <PromoList
            blocks={blocksWithoutTitle}
            viewTracker={viewTracker}
            clickTracker={clickTracker}
          />
        )}
      </SkipLinkWrapper>
    </section>
  );
};

export default ArticleLinksBlock;
