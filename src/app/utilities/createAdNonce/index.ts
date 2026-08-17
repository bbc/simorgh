import getUUID from '#app/lib/utilities/getUUID';
import getToggle from '#app/lib/utilities/getToggle';
import { Toggles } from '#app/models/types/global';

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
  const { enabled: isNonceToggleEnabled, value: nonceCountries = '' } =
    getToggle(toggles, 'adsNonce');
  const { enabled: isAdsToggleEnabled } = getToggle(toggles, 'ads');

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
