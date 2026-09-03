import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';
import activateExperiment, { resetActivatedExperiments } from '.';

jest.mock('#lib/utilities/onClient');

describe('activateExperiment', () => {
  afterEach(() => {
    jest.clearAllMocks();
    resetActivatedExperiments();
  });

  const mockOptimizely = {
    onReady: jest.fn(),
    setForcedVariation: jest.fn(),
    activate: jest.fn(),
  };

  const mockExperimentName = 'foo';
  const mockExperimentVariation = 'bar';

  it('should set a forced variation and activate experiment when on client', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

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
    (onClient as jest.Mock).mockReturnValueOnce(false);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.setForcedVariation).not.toHaveBeenCalled();
    expect(mockOptimizely.activate).not.toHaveBeenCalled();
  });

  it('should not activate again if the experiment was already activated', async () => {
    (onClient as jest.Mock).mockReturnValue(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.activate).toHaveBeenCalledTimes(1);
  });

  it('should not activate again for a concurrent hook instance activating the same experiment', async () => {
    (onClient as jest.Mock).mockReturnValue(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await Promise.all([
      activateExperiment({
        optimizely: mockOptimizely as unknown as ReactSDKClient,
        experimentName: mockExperimentName,
        experimentVariation: mockExperimentVariation,
      }),
      activateExperiment({
        optimizely: mockOptimizely as unknown as ReactSDKClient,
        experimentName: mockExperimentName,
        experimentVariation: mockExperimentVariation,
      }),
    ]);

    expect(mockOptimizely.activate).toHaveBeenCalledTimes(1);
  });

  it('should not set a forced variation or activate when onReady resolves with success: false', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: false });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.setForcedVariation).not.toHaveBeenCalled();
    expect(mockOptimizely.activate).not.toHaveBeenCalled();
  });
});
