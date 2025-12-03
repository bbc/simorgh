import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { EventTrackingMetadata } from '#app/models/types/eventTracking';
import LiveLabel from '../../LiveLabel';
import styles from './index.styles';

interface PromoProps {
  block: TopStoryItem;
  eventTrackingData?: EventTrackingMetadata;
}

const Promo = ({ block, eventTrackingData }: PromoProps) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  const overtypedHeadline = block?.headlines?.overtyped ?? '';
  const mainHeadline = block?.headlines?.headline ?? '';
  const headlineBlockText =
    // @ts-expect-error - Optimo nested block structure
    block?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
      ?.text ?? '';
  const name = block?.name ?? '';

  const title =
    overtypedHeadline ||
    mainHeadline ||
    headlineBlockText ||
    name ||
    block.headline ||
    '';

  const canonicalUrl = block?.locators?.canonicalUrl ?? '';
  const assetUri = block?.locators?.assetUri ?? '';
  const uri = block?.uri ?? '';

  const href =
    canonicalUrl ||
    assetUri ||
    uri ||
    (block.destinationUrl ? `https://www.bbc.com${block.destinationUrl}` : '');

  const { isLive } = block;

  const isOperaMini = useOperaMiniDetection();

  const promoBoxStyles = isOperaMini ? styles.operaPromoBox : styles.promoBox;

  return (
    <div css={promoBoxStyles}>
      <a
        css={styles.link}
        aria-label={title}
        href={href}
        {...clickTrackerHandler}
      >
        {isLive && <LiveLabel />}
        {title}
      </a>
    </div>
  );
};

export default Promo;
