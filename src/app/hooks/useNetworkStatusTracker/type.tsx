import { EffectiveNetworkType } from '#app/models/types/global';

export type NetworkStatus = {
  isOnline: boolean;
  networkType: EffectiveNetworkType;
};
