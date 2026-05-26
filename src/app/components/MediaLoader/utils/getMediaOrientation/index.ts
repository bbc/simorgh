import type { Orientations } from '../../types';

const ORIENTATION_MAPPING: Record<string, Orientations> = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  ORIGINAL: 'landscape',
};

export default (mediaOrientationConfig?: string[]): Orientations => {
  if (!mediaOrientationConfig) {
    return ORIENTATION_MAPPING.ORIGINAL;
  }

  const transformedConfig = mediaOrientationConfig.map(setting =>
    setting.toUpperCase(),
  );

  const orientationType =
    transformedConfig.find(
      orientationConfig => orientationConfig in ORIENTATION_MAPPING,
    ) ?? 'ORIGINAL';

  return ORIENTATION_MAPPING[orientationType];
};
