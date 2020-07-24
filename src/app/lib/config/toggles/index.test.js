/* eslint-disable no-underscore-dangle */
import toggles from '.';

describe('toggles', () => {
  ['local', 'test', 'live'].forEach(environment => {
    describe(`when application environment is ${environment}`, () => {
      it('should retrieve correct toggle value', () => {
        const environmentToggles = toggles[environment];
        expect(environmentToggles._environment.value).toBe(environment);
      });
    });
  });
});
