import { Services, Toggles } from '#app/models/types/global';
import getToggle from '#lib/utilities/getToggle';
import SERVICES from '#app/lib/config/services';

export type CspTier = 'strict' | 'nonce' | 'relaxed';

const isCountryInList = (
  countryList: string | number | undefined,
  country: string,
) => {
  if (!country) return false;

  return String(countryList ?? '')
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean)
    .includes(country.toLowerCase());
};

type GetCspTierProps = {
  service: Services;
  country: string;
  toggles: Toggles;
  isAmp: boolean;
  isLite: boolean;
};

const getCspTier = ({
  service,
  country,
  toggles,
  isAmp,
  isLite,
}: GetCspTierProps): CspTier => {
  if (!SERVICES.includes(service)) return 'strict';

  const { enabled: relaxedCspEnabled, value: relaxedCspCountries } = getToggle(
    toggles,
    'relaxedCsp',
  );

  if (relaxedCspEnabled && isCountryInList(relaxedCspCountries, country)) {
    return 'relaxed';
  }

  const { enabled: adsNonceEnabled, value: adsNonceCountries } = getToggle(
    toggles,
    'adsNonce',
  );

  // AMP and Lite pages cannot carry a nonce on their inline scripts
  const supportsNonce = !isAmp && !isLite;

  if (
    supportsNonce &&
    adsNonceEnabled &&
    isCountryInList(adsNonceCountries, country)
  ) {
    return 'nonce';
  }

  return 'strict';
};

export default getCspTier;
