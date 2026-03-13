import { Toggles } from '#app/models/types/global';
import generateNonceValue from '.';

const MOCK_UUID = '12345678-abcd-1fed-0123-a1b2c3d4e5f6';

jest.mock('#app/lib/utilities/getUUID', () =>
  jest.fn().mockImplementation(() => MOCK_UUID),
);

describe('generateAdNonce', () => {
  const defaultToggles: Toggles = {
    _environment: 'test',
    adsNonce: { enabled: true, value: '' },
    ads: { enabled: true },
  };

  const defaultParams = {
    toggles: defaultToggles,
    country: 'LT',
    showAdsBasedOnLocation: true,
    isLite: false,
    isAmp: false,
  };

  it('should not return nonce value when adsNonce is disabled', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      adsNonce: { enabled: false, value: '' },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBeNull();
  });

  it('should not return nonce value when ads toggle is disabled', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      ads: { enabled: false },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBeNull();
  });

  it('should not return nonce value when isLite is true', () => {
    const result = generateNonceValue({ ...defaultParams, isLite: true });
    expect(result).toBeNull();
  });

  it('should not return nonce value when isAmp is true', () => {
    const result = generateNonceValue({ ...defaultParams, isAmp: true });
    expect(result).toBeNull();
  });

  it('should not return nonce value when showAdsBasedOnLocation is false', () => {
    const result = generateNonceValue({
      ...defaultParams,
      showAdsBasedOnLocation: false,
    });

    expect(result).toBeNull();
  });

  it('should return nonce when toggle is enabled and nonceCountries is empty (i.e. enabled for all countries)', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      adsNonce: { enabled: true, value: '' },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBe(MOCK_UUID);
  });

  it('should return nonce when toggle is enabled and country matches nonceCountries list', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      adsNonce: { enabled: true, value: 'LT,US,CA' },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBe(MOCK_UUID);
  });

  it('should return nonce when nonceCountries has mixed case and extra spaces', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      adsNonce: { enabled: true, value: 'lt ,us,CA' },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBe(MOCK_UUID);
  });

  it('should not return nonce when country does not match nonceCountries list', () => {
    const toggles: Toggles = {
      ...defaultToggles,
      adsNonce: { enabled: true, value: 'US,CA' },
    };

    const result = generateNonceValue({ ...defaultParams, toggles });
    expect(result).toBeNull();
  });

  it('should not return nonce when toggles are missing', () => {
    const result = generateNonceValue({
      ...defaultParams,
      toggles: {},
    });

    expect(result).toBeNull();
  });
});
