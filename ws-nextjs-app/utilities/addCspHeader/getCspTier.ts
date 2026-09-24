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

// Selects one of three CSP tiers per request based on allow-listed countries.
// Precedence: relaxed > nonce > strict (the default for unlisted countries, and always for AMP/Lite pages).
const getCspTier = ({
  service,
  country,
  toggles,
  isAmp,
  isLite,
}: GetCspTierProps): CspTier => {
  if (!SERVICES.includes(service) || isAmp || isLite) return 'strict';

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

  if (adsNonceEnabled && isCountryInList(adsNonceCountries, country)) {
    return 'nonce';
  }

  return 'strict';
};

export default getCspTier;
