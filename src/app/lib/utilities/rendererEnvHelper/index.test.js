import hasLiveOverride from '.';

const liveOverrideParam = 'renderer_env=live';
const testOverrideParam = 'renderer_env=test';
const additionalParam = 'param1=1';
const url = 'https://www.test.com';

describe('hasLiveOverride', () => {
  const environment = process.env.APP_ENV;

  it('should return false if no params exist', () => {
    expect(hasLiveOverride(url)).toBe(false);
  });

  describe('in non-live environment', () => {
    beforeEach(() => {
      process.env.APP_ENV = 'non-live';
    });

    describe('with single param', () => {
      it('should return true if renderer_env is live', () => {
        expect(hasLiveOverride(`${url}?${liveOverrideParam}`)).toBe(true);
      });
      it('should return false if renderer_env is test', () => {
        expect(hasLiveOverride(`${url}?${testOverrideParam}`)).toBe(false);
      });
    });

    describe('with multiple params', () => {
      it('should return true if renderer_env is live', () => {
        expect(
          hasLiveOverride(`${url}?${liveOverrideParam}&${additionalParam}`),
        ).toBe(true);
      });
      it('should return false if renderer_env is test', () => {
        expect(
          hasLiveOverride(`${url}?${testOverrideParam}&${additionalParam}`),
        ).toBe(false);
      });
    });

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });

  describe('in live environment', () => {
    beforeEach(() => {
      process.env.APP_ENV = 'live';
    });

    describe('with single param', () => {
      it('should return false if renderer_env is live', () => {
        expect(hasLiveOverride(`${url}?${liveOverrideParam}`)).toBe(false);
      });
      it('should return false if renderer_env is test', () => {
        expect(hasLiveOverride(`${url}?${testOverrideParam}`)).toBe(false);
      });
    });

    describe('with multiple params', () => {
      it('should return false if renderer_env is live', () => {
        expect(
          hasLiveOverride(`${url}?${liveOverrideParam}&${additionalParam}`),
        ).toBe(false);
      });
      it('should return false if renderer_env is test', () => {
        expect(
          hasLiveOverride(`${url}?${testOverrideParam}&${additionalParam}`),
        ).toBe(false);
      });
    });

    afterEach(() => {
      process.env.APP_ENV = environment;
    });
  });
});
