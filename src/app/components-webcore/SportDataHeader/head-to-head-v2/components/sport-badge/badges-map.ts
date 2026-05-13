import type { BadgePlaceholderFallbackType } from '../../types';

type BadgesMap = Record<string, string>;

const badgesMap: BadgesMap = {
  // TODO: Add badge mappings when assets are available
  // 0: placeholder,
  // ...americanFootball,
  // ...basketball,
  // etc.
};

interface GetImageParams {
  id?: string;
  usePlaceholderFallback: boolean;
  placeholderFallbackType?: BadgePlaceholderFallbackType;
}

export const getImage = ({
  id,
  usePlaceholderFallback,
  placeholderFallbackType,
}: GetImageParams): string | null => {
  const image = id ? badgesMap[id] : undefined;

  if (!image && usePlaceholderFallback) {
    switch (placeholderFallbackType) {
      case 'badge':
        return null; // TODO - add badge placeholder asset and return it here
      case 'flag':
        return null; // TODO - add flag placeholder asset and return it here
      default:
        throw new Error(
          `Invalid placeholder fallback type '${placeholderFallbackType}'`,
        );
    }
  }

  return image || null;
};

export const hasMapping = (id?: string): boolean =>
  Boolean(id && getImage({ id, usePlaceholderFallback: false }));

export default badgesMap;
