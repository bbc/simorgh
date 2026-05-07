type PlaceholderFallbackType = 'badge' | 'flag';

const badgesMap: Record<string, string> = {
  // 0: placeholder,
  // ...americanFootball,
  // ...basketball,
  // ...netball,
  // ...englishFootball,
  // ...europeanFootball,
  // ...footballWorldwideDomestic,
  // ...scottishFootball,
  // ...internationalFootball,
  // ...olympics,
  // ...paralympics,
  // ...rugbyUnion,
  // ...iceHockey,
  // ...getBaseCountryFlagsMapping('formula1'),
  // ...getBaseCountryFlagsMapping('athletics'),
  // ...getBaseCountryFlagsMapping('cycling'),
  // ...getBaseCountryFlagsMapping('golf'),
  // ...getBaseCountryFlagsMapping('darts'),
  // ...getBaseCountryFlagsMapping('snooker'),
  // ...getBaseCountryFlagsMapping('tennis'),
};

interface GetImageParams {
  id?: string;
  usePlaceholderFallback?: boolean;
  placeholderFallbackType?: PlaceholderFallbackType;
}

export const getImage = ({
  id,
  usePlaceholderFallback,
  placeholderFallbackType,
}: GetImageParams): string | null | undefined => {
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

  return image;
};

export const hasMapping = (id?: string): boolean =>
  Boolean(getImage({ id, usePlaceholderFallback: false }));

export default badgesMap;
