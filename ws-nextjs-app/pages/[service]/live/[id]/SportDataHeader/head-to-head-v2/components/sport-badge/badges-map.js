// import placeholder from '@bbc/web-assets/static/sport/placeholders/placeholder-badge.svg';
// import flagPlaceholder from '@bbc/web-assets/static/sport/placeholders/placeholder-flag.svg';

// import { americanFootball } from './mappings/american-football.js';
// import basketball from './mappings/basketball.js';
// import { getBaseCountryFlagsMapping } from './mappings/country-flags.js';
// import netball from './mappings/netball.js';
// import englishFootball from './mappings/football-english-domestic.js';
// import europeanFootball from './mappings/football-european-domestic.js';
// import footballWorldwideDomestic from './mappings/football-worldwide-domestic.js';
// import scottishFootball from './mappings/football-scottish-domestic.js';
// import internationalFootball from './mappings/international-football.js';
// import olympics from './mappings/olympics.js';
// import paralympics from './mappings/paralympics.js';
// import rugbyUnion from './mappings/rugby-union.js';
// import iceHockey from './mappings/ice-hockey.js';

const badgesMap = {
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

// TO DO - either get these from static assets or use a fallback URL
const tempPlaceholderSrc =
  'https://static.files.bbci.co.uk/core/website/assets/static/sport/placeholders/placeholder-badge.4476e22b04.svg';
const tempFlagPlaceholderSrc =
  'https://static.files.bbci.co.uk/core/website/assets/static/sport/placeholders/placeholder-flag.9cbbd1b8e7.svg';

export const getImage = ({
  id,
  usePlaceholderFallback,
  placeholderFallbackType,
}) => {
  const image = badgesMap[id];

  if (!image && usePlaceholderFallback) {
    switch (placeholderFallbackType) {
      case 'badge':
        return tempPlaceholderSrc;
      case 'flag':
        return tempFlagPlaceholderSrc;
      default:
        throw new Error(
          `Invalid placeholder fallback type '${placeholderFallbackType}'`,
        );
    }
  }

  return image;
};

export const hasMapping = id =>
  Boolean(getImage({ id, usePlaceholderFallback: false }));

export default badgesMap;
