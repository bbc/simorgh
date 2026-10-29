/* eslint-disable no-underscore-dangle */
import toggles from '.';

describe('Toggles Config', () => {
  ['local', 'test', 'live'].forEach(environment => {
    describe(`when application environment is ${environment}`, () => {
      const environmentToggles = toggles[environment];

      it('should retrieve correct toggle value for environment', () => {
        expect(environmentToggles._environment).toBe(environment);
      });

      it('should contain correct default values', () => {
        expect(environmentToggles).toMatchSnapshot();
      });
    });
  });
});
