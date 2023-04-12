import { Direction } from '#app/models/types/global';
import { SlotType } from '../../types';

const getAdsAriaLabel = (
  adsLabel: string,
  dir: Direction,
  slotType: SlotType,
) => {
  const mpuLabel =
    dir === 'ltr' || adsLabel === 'Advertisement'
      ? `${adsLabel} 2`
      : `2 ${adsLabel}`;
  const ariaLabel = slotType === 'leaderboard' ? adsLabel : mpuLabel;
  return ariaLabel;
};

export default getAdsAriaLabel;
