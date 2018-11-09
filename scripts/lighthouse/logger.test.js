// logger.test.js

import { logger } from './logger';

describe('failures', () => {
  it('Should log failure message', () => {
    global.console.log = jest.fn();
    logger();
    expect(global.console.log).toHaveBeenCalled();
  });
});
