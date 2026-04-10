import getUUID from '#app/lib/utilities/getUUID';
import { Toggles } from '#app/models/types/global';
import getToggleDefinitions from '#app/lib/utilities/getToggleDefinition';

interface InjectNonceHeader {
  toggles: Toggles;
  country: string;
  showAdsBasedOnLocation: boolean;
  isLite: boolean;
  isAmp: boolean;
}

const isNonceEnabledForCountry = (
  nonceCountries: string | number | undefined,
  country: string,
): boolean => {
  if (!nonceCountries || nonceCountries.toString().trim() === '') {
    return true;
  }

  const allowedCountries = nonceCountries
    .toString()
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(Boolean);

  return allowedCountries.includes(country.toLowerCase());
};

export default ({
  toggles,
  country,
  showAdsBasedOnLocation,
  isLite,
  isAmp,
}: InjectNonceHeader) => {
  const toggleDefinitions = getToggleDefinitions(toggles);
  const { enabled: isNonceToggleEnabled, value: nonceCountries = '' } =
    toggleDefinitions.adsNonce || {};
  const { enabled: isAdsToggleEnabled } = toggleDefinitions.ads || {};

  if (
    isLite ||
    isAmp ||
    !isNonceToggleEnabled ||
    !isAdsToggleEnabled ||
    !showAdsBasedOnLocation ||
    !isNonceEnabledForCountry(nonceCountries, country)
  ) {
    return null;
  }

  const nonce = getUUID();
  return nonce;
};
