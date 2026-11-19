import { Services, Toggles } from '#app/models/types/global';
import getToggle from '#lib/utilities/getToggle';
import SERVICES from '#app/lib/config/services';

export type CspTier = 'strict' | 'nonce' | 'relaxed';

const isCountryInList = (
  countryList: string | number | undefined,
  country: string,
) => {
  if (!country) return false;

  const countries = String(countryList ?? '')
    .split(',')
    .map(entry => entry.trim().toLowerCase())
    .filter(Boolean);

  if (countries.length === 0) return true;

  return countries.includes(country.toLowerCase());
};

type GetCspTierProps = {
  service: Services;
  country: string;
  toggles: Toggles;
  isAmp: boolean;
  isLite: boolean;
  showAdsBasedOnLocation: boolean;
};

// Selects one of three CSP tiers per request when ads are enabled and available.
// Empty country values apply the toggle to all countries; comma-delimited values scope to listed countries.
// Precedence: nonce > relaxed > strict (always strict for AMP/Lite pages).
const getCspTier = ({
  service,
  country,
  toggles,
  isAmp,
  isLite,
  showAdsBasedOnLocation,
}: GetCspTierProps): CspTier => {
  const { enabled: adsEnabled } = getToggle(toggles, 'ads');
  const { enabled: relaxedCspEnabled, value: relaxedCspCountries } = getToggle(
    toggles,
    'relaxedCsp',
  );
  const { enabled: adsNonceEnabled, value: adsNonceCountries } = getToggle(
    toggles,
    'adsNonce',
  );

  if (
    isAmp ||
    isLite ||
    !showAdsBasedOnLocation ||
    !SERVICES.includes(service) ||
    !adsEnabled
  ) {
    return 'strict';
  }

  if (adsNonceEnabled && isCountryInList(adsNonceCountries, country)) {
    return 'nonce';
  }

  if (relaxedCspEnabled && isCountryInList(relaxedCspCountries, country)) {
    return 'relaxed';
  }

  return 'strict';
};

export default getCspTier;
