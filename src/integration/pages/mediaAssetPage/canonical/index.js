import runCommonTests from './common';
import runUserTests from './user';

export default () => {
  describe('Canonical', () => {
    runCommonTests();
    runUserTests();
  });
};
