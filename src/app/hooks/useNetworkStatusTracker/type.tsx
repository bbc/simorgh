export type EffectiveNetworkType =
  | 'slow-2g'
  | '2g'
  | '3g'
  | '4g'
  | '5g'
  | 'unknown';

export type NetworkStatus = {
  isOnline: boolean;
  networkType: EffectiveNetworkType;
};
