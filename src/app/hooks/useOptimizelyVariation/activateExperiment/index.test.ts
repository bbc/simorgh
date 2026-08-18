import onClient from '#lib/utilities/onClient';
import { ReactSDKClient } from '@optimizely/react-sdk';
import { RefObject } from 'react';
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

  const getActivatedExperiments = (): RefObject<string[]> => ({
    current: [],
  });

  it('should set a forced variation and activate experiment when on client', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
      activatedExperiments: getActivatedExperiments(),
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
      activatedExperiments: getActivatedExperiments(),
    });

    expect(mockOptimizely.onReady).not.toHaveBeenCalled();
    expect(mockOptimizely.setForcedVariation).not.toHaveBeenCalled();
    expect(mockOptimizely.activate).not.toHaveBeenCalled();
  });

  it('should call onExperimentActivated once when activation succeeds', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });
    const onExperimentActivated = jest.fn();

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
      activatedExperiments: getActivatedExperiments(),
      onExperimentActivated,
    });

    expect(onExperimentActivated).toHaveBeenCalledTimes(1);
    expect(onExperimentActivated).toHaveBeenCalledWith('foo', 'bar');
  });

  it('should not activate again or call onExperimentActivated if the experiment was already activated', async () => {
    (onClient as jest.Mock).mockReturnValue(true);
    mockOptimizely.onReady.mockResolvedValue({ success: true });
    const onExperimentActivated = jest.fn();
    const activatedExperiments = getActivatedExperiments();

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
      activatedExperiments,
      onExperimentActivated,
    });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
      activatedExperiments,
      onExperimentActivated,
    });

    expect(mockOptimizely.activate).toHaveBeenCalledTimes(1);
    expect(onExperimentActivated).toHaveBeenCalledTimes(1);
  });

  it('should not set a forced variation or activate when onReady resolves with success: false', async () => {
    (onClient as jest.Mock).mockReturnValueOnce(true);
    mockOptimizely.onReady.mockResolvedValue({ success: false });

    await activateExperiment({
      optimizely: mockOptimizely as unknown as ReactSDKClient,
      experimentName: mockExperimentName,
      experimentVariation: mockExperimentVariation,
      activatedExperiments: getActivatedExperiments(),
    });

    expect(mockOptimizely.setForcedVariation).not.toHaveBeenCalled();
    expect(mockOptimizely.activate).not.toHaveBeenCalled();
  });
});
