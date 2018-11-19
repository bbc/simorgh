import config from '../../lighthouse';

import runLighthouse from './runLighthouse';
import launchLighthouseAndLogResults from './index';
import logResults from './logResults';

jest.mock('./runLighthouse', () => jest.fn().mockResolvedValue(1));
jest.mock('./logResults', () => ({
  logHighLevelScores: jest.fn().mockResolvedValue(2),
  checkFailures: jest.fn(),
}));

describe('index', () => {
  it('should launch lighthouse, then log scores, then check for failures', async () => {
    await launchLighthouseAndLogResults();
    expect(runLighthouse).toHaveBeenCalledWith(config);
    expect(logResults.logHighLevelScores).toHaveBeenCalledWith(1);
    expect(logResults.checkFailures).toHaveBeenCalledWith(2);
  });
});
