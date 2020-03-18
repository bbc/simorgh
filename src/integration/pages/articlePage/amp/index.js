import runCommonTests from './common';
import runUserTests from './user';

export default () => {
  describe('When I am on amp', () => {
    runCommonTests();
    runUserTests({
      imageAltText: 'Comrade Adams Oshiomole',
    });
  });
};
