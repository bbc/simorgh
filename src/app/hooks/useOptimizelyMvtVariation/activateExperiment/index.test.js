import onClient from '#lib/utilities/onClient';
import activateExperiment from '.';

jest.mock('#lib/utilities/onClient');

describe('activateExperiment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockOptimizely = {
    onReady: jest.fn(),
    setForcedVariation: jest.fn(),
    activate: jest.fn(),
  };

  const mockExperimentName = 'foo';
  const mockExperimentVariation = 'bar';

  it('should set a forced variation and activate experiment when on client', async () => {
    onClient.mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment(
      mockOptimizely,
      mockExperimentName,
      mockExperimentVariation,
    );

    expect(mockOptimizely.onReady).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.setForcedVariation).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.setForcedVariation).toHaveBeenCalledWith(
      'foo',
      'bar',
    );
    expect(mockOptimizely.activate).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.activate).toHaveBeenCalledWith('foo');
  });

  it('should not set a forced variation or experiment when on server', async () => {
    onClient.mockReturnValueOnce(false);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment(
      mockOptimizely,
      mockExperimentName,
      mockExperimentVariation,
    );

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.setForcedVariation).not.toHaveBeenCalled();
    expect(mockOptimizely.activate).not.toHaveBeenCalled();
  });
});
