import { config } from './fixtures';
// import { validatedPassingScores } from './fixtures';

const { indexRunner } = require('./index');

jest.setTimeout(30000);

describe('indexRunner', () => {
  it('Should resolve to true if called with passing config', async () => {
    await expect(indexRunner(config)).resolves.toEqual(true);
  });
});
