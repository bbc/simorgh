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
    setForcedDecision: jest.fn(),
    decide: jest.fn(),
  };

  const mockExperimentName = 'foo';
  const mockExperimentVariation = 'bar';

  it('should set a forced decision and decide the experiment when on client', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.onReady).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.setForcedDecision).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.setForcedDecision).toHaveBeenCalledWith(
      { ruleKey: 'foo', flagKey: 'foo' },
      { variationKey: 'bar' },
    );
    expect(mockOptimizely.decide).toHaveBeenCalledTimes(1);
    expect(mockOptimizely.decide).toHaveBeenCalledWith('foo');
  });

  it('should not set a forced decision or decide the experiment on server', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(false);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.setForcedDecision).not.toHaveBeenCalled();
    expect(mockOptimizely.decide).not.toHaveBeenCalled();
  });

  it('should not decide the same experiment more than once', async () => {
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

    expect(mockOptimizely.decide).toHaveBeenCalledTimes(1);
  });

  it('should only decide the same experiment once for concurrent hook instances', async () => {
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

    expect(mockOptimizely.decide).toHaveBeenCalledTimes(1);
  });

  it('should not set a forced decision or decide when onReady resolves with success: false', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: false });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
    });

    expect(mockOptimizely.setForcedDecision).not.toHaveBeenCalled();
    expect(mockOptimizely.decide).not.toHaveBeenCalled();
  });
});
