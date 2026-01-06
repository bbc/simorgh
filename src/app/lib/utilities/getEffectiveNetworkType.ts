import { EffectiveNetworkType } from '#app/models/types/global';

const getEffectiveNetworkType = (): EffectiveNetworkType => {
  if (typeof window === 'undefined' || !navigator) {
    return 'unknown';
  }

  const { connection } = navigator as Navigator & {
    connection?: {
      effectiveType?: EffectiveNetworkType;
    };
  };

  if (connection?.effectiveType) {
    const { effectiveType } = connection;
    if (['slow-2g', '2g', '3g', '4g', '5g'].includes(effectiveType)) {
      return effectiveType;
    }
  }

  return 'unknown';
};

export default getEffectiveNetworkType;
