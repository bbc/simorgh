export const SLOT_TYPES = {
  LEADERBOARD: 'leaderboard',
  MPU: 'mpu',
};

export type SlotType = (typeof SLOT_TYPES)[keyof typeof SLOT_TYPES];

export interface AdProps {
  slotType: SlotType;
  className: string;
}
