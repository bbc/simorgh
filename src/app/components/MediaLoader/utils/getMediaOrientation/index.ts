import { Orientations } from '../../types';

const ORIENTATION_MAPPING: Record<string, Orientations> = {
  PORTRAIT: 'portrait',
  LANDSCAPE: 'landscape',
  ORIGINAL: 'landscape',
};

const transformOrientationConfigToUpperCase = (
  orientationConfig: string[],
): string[] => {
  return orientationConfig.map(setting => setting.toUpperCase());
};

export default (mediaOrientationConfig?: string[]): Orientations => {
  if (!mediaOrientationConfig) {
    return ORIENTATION_MAPPING.ORIGINAL;
  }

  const transformedConfig = transformOrientationConfigToUpperCase(
    mediaOrientationConfig,
  );

  const orientationType =
    transformedConfig.find(orientationConfig =>
      Object.keys(ORIENTATION_MAPPING).includes(
        orientationConfig.toUpperCase(),
      ),
    ) ?? 'ORIGINAL';

  return ORIENTATION_MAPPING[orientationType];
};
