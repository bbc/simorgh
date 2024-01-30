export const SLOT_TYPES = {
  LEADERBOARD: 'leaderboard',
  MPU: 'mpu',
} as const;

export type SlotType = (typeof SLOT_TYPES)[keyof typeof SLOT_TYPES];

export interface AdProps {
  slotType: SlotType;
  adcampaign?: string;
  className?: string;
}
