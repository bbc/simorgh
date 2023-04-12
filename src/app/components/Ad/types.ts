import { PageTypes, Services, Direction } from '#app/models/types/global';

export type SlotType = 'leaderboard' | 'mpu';

export interface AdProps {
  slotType: SlotType;
  className?: string;
}

type SlotFunction = (slotType: string) => void;

interface Ads {
  registerSlot: SlotFunction;
  destroySlot: SlotFunction;
}

type PushFunction = (slotFunction: SlotFunction) => void;

interface Cmd {
  push: PushFunction;
}

export interface WindowWithDotCom {
  cmd: Cmd;
  ads: Ads;
}

export interface CanonicalAdBootstrapJsProps {
  adcampaign?: string | null;
}

export interface AdJsonDataProps {
  service: Services;
  slotType: SlotType;
  assetType: string;
}

export interface AmpAdSlotProps {
  service: Services;
  slotType: SlotType;
  pageType: PageTypes;
}

export interface AmpAdContentProps extends AmpAdSlotProps {
  dir: Direction;
  label: string;
}

export interface AmpAdProps extends AmpAdContentProps {
  ariaLabel: string;
}
