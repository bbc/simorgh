import { Services, Toggles } from '#app/models/types/global';
import getCspTier from './getCspTier';

const defaultProps = {
  service: 'pidgin' as Services,
  isAmp: false,
  isLite: false,
  showAdsBasedOnLocation: true,
};

const toggles = ({
  ads = { enabled: true },
  relaxedCsp,
  adsNonce,
}: {
  ads?: { enabled: boolean };
  relaxedCsp?: { enabled: boolean; value?: string };
  adsNonce?: { enabled: boolean; value?: string };
}) =>
  ({
    ads,
    ...(relaxedCsp && { relaxedCsp }),
    ...(adsNonce && { adsNonce }),
  }) as Toggles;

describe('getCspTier', () => {
  describe('strict by default', () => {
    it('should return strict when no CSP toggles are present', () => {
      expect(getCspTier({ ...defaultProps, country: 'gb', toggles: {} })).toBe(
        'strict',
      );
    });

    it('should return strict when the country is not in any list', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'kg',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'ng' },
        }),
      });

      expect(tier).toBe('strict');
    });

    it('should return strict when the country list is empty', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'in',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: '' },
          adsNonce: { enabled: true, value: '' },
        }),
      });

      expect(tier).toBe('strict');
    });

    it('should return strict when no country can be resolved', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: '',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'ng' },
        }),
      });

      expect(tier).toBe('strict');
    });

    it('should return strict for an unknown service', () => {
      const tier = getCspTier({
        ...defaultProps,
        service: 'notAService' as Services,
        country: 'in',
        toggles: toggles({ relaxedCsp: { enabled: true, value: 'in' } }),
      });

      expect(tier).toBe('strict');
    });

    it.each(['relaxedCsp', 'adsNonce'])(
      'should return strict when %s is disabled for the service',
      toggleName => {
        const tier = getCspTier({
          ...defaultProps,
          country: 'in',
          toggles: { [toggleName]: { enabled: false, value: 'in' } } as Toggles,
        });

        expect(tier).toBe('strict');
      },
    );

    it('should return strict when ads are disabled', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'in',
        toggles: toggles({
          ads: { enabled: false },
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'in' },
        }),
      });

      expect(tier).toBe('strict');
    });

    it('should return strict when ads are unavailable for the location', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'in',
        showAdsBasedOnLocation: false,
        toggles: toggles({
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'in' },
        }),
      });

      expect(tier).toBe('strict');
    });
  });

  describe('relaxed', () => {
    it('should return relaxed when the country is in the relaxed list', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'in',
        toggles: toggles({ relaxedCsp: { enabled: true, value: 'in,br' } }),
      });

      expect(tier).toBe('relaxed');
    });

    it('should take precedence over the nonce list', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'in',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'in' },
        }),
      });

      expect(tier).toBe('relaxed');
    });
  });

  describe('nonce', () => {
    it('should return nonce when the country is only in the nonce list', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'ng',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: 'in' },
          adsNonce: { enabled: true, value: 'ng,ke' },
        }),
      });

      expect(tier).toBe('nonce');
    });

    it.each(['isAmp', 'isLite'])(
      'should fall back to strict when %s is true',
      pageFormat => {
        const tier = getCspTier({
          ...defaultProps,
          [pageFormat]: true,
          country: 'ng',
          toggles: toggles({ adsNonce: { enabled: true, value: 'ng' } }),
        });

        expect(tier).toBe('strict');
      },
    );
  });

  describe('country list parsing', () => {
    it.each(['NG', 'nG'])(
      'should match country %s case insensitively',
      country => {
        const tier = getCspTier({
          ...defaultProps,
          country,
          toggles: toggles({ relaxedCsp: { enabled: true, value: 'ng' } }),
        });

        expect(tier).toBe('relaxed');
      },
    );

    it('should tolerate whitespace and mixed case in the toggle value', () => {
      const tier = getCspTier({
        ...defaultProps,
        country: 'ke',
        toggles: toggles({
          relaxedCsp: { enabled: true, value: ' IN , ke ,' },
        }),
      });

      expect(tier).toBe('relaxed');
    });
  });
});
