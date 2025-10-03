import { Response } from 'express';
import getUUID from '#app/lib/utilities/getUUID';
import { Toggles, ToggleDefinition } from '#app/models/types/global';

interface InjectNonceHeader {
  res: Response;
  toggles: Toggles;
  country: string;
  showAdsBasedOnLocation: boolean;
  isLite: boolean;
}

const getToggleDefinitions = (
  toggles: Toggles,
): Record<string, ToggleDefinition> => {
  const { _environment, ...toggleDefinitions } = toggles;
  return toggleDefinitions;
};

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

const injectNonceHeader = ({
  res,
  toggles,
  country,
  showAdsBasedOnLocation,
  isLite,
}: InjectNonceHeader) => {
  const toggleDefinitions = getToggleDefinitions(toggles) || {};
  const { enabled: isNonceToggleEnabled, value: nonceCountries = '' } =
    toggleDefinitions.adsNonce;
  const { enabled: isAdsToggleEnabled } = toggleDefinitions.ads;

  if (
    isLite ||
    !isNonceToggleEnabled ||
    !isAdsToggleEnabled ||
    !showAdsBasedOnLocation ||
    !isNonceEnabledForCountry(nonceCountries, country)
  ) {
    return null;
  }

  const nonce = getUUID();
  res.set('x-nonce', nonce);

  return nonce;
};

export default injectNonceHeader;
