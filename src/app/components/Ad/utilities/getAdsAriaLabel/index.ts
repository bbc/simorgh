import { Direction } from '#models/types/global';
import { SLOT_TYPES, SlotType } from '../../types';

interface AdsAriaLabelProps {
  label: string;
  dir: Direction;
  slotType: SlotType;
}

const getAdsAriaLabel = ({ label, dir, slotType }: AdsAriaLabelProps) => {
  const mpuLabel =
    dir === 'ltr' || label === 'Advertisement' ? `${label} 2` : `2 ${label}`;

  const ariaLabel = slotType === SLOT_TYPES.LEADERBOARD ? label : mpuLabel;

  return ariaLabel;
};

export default getAdsAriaLabel;
