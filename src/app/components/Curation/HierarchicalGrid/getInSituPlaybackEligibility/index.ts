import type { MediaBlock } from '#app/components/MediaLoader/types';
import type { Summary } from '#app/models/types/curationData';

export type InSituPlaybackIneligibilityReason =
  | 'not-first-promo'
  | 'not-media-article-promo'
  | 'missing-media';

type EligibleInSituPlayback = {
  isEligible: true;
  mediaBlocks: MediaBlock[];
};

type IneligibleInSituPlayback = {
  isEligible: false;
  reason: InSituPlaybackIneligibilityReason;
};

type InSituPlaybackEligibility =
  | EligibleInSituPlayback
  | IneligibleInSituPlayback;

type Props = {
  promo: Summary;
  promoIndex: number;
  mediaBlocks?: MediaBlock[] | null;
};

const isOptimoArticlePromo = (link?: string) =>
  /\/articles\/c[a-zA-Z0-9]{10,}o/.test(link ?? '');

export default ({
  promo,
  promoIndex,
  mediaBlocks,
}: Props): InSituPlaybackEligibility => {
  if (promoIndex !== 0) {
    return { isEligible: false, reason: 'not-first-promo' };
  }

  if (promo.type !== 'video' || !isOptimoArticlePromo(promo.link)) {
    return { isEligible: false, reason: 'not-media-article-promo' };
  }

  if (!mediaBlocks?.length) {
    return { isEligible: false, reason: 'missing-media' };
  }

  return { isEligible: true, mediaBlocks };
};
