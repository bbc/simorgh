import runUserTests from './user';

export default () => {
  describe('When I am on canonical or amp', () => {
    runUserTests();
  });
};
