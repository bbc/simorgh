/* eslint react/prop-types: 0 */
import { renderHook } from '@testing-library/react-hooks';
import { RequestContextProvider } from '#contexts/RequestContext';
import useOptimizelyMvtVariation from '.';
import * as activateExperiment from './activateExperiment';

const spyActivateExperiment = jest
  .spyOn(activateExperiment, 'default')
  .mockImplementation(jest.fn());

describe('useOptimizelyMvtVariation custom hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderUseOptimizelyMvtVariation = (mvtExperiments, experimentId) => {
    const props = {
      mvtExperiments,
      isAmp: false,
      pageType: 'STY',
      service: 'foo',
      pathname: 'bar',
    };
    const wrapper = ({ children }) => (
      <RequestContextProvider {...props}>{children}</RequestContextProvider>
    );
    return renderHook(() => useOptimizelyMvtVariation(experimentId), {
      wrapper,
    }).result.current;
  };

  it('should return null if mvtExperiments is falsy', async () => {
    const result = renderUseOptimizelyMvtVariation(undefined, 'foo');
    expect(result).toEqual(null);
  });

  it('should return null if mvtExperiments is an empty array', async () => {
    const result = renderUseOptimizelyMvtVariation([], 'foo');
    expect(result).toEqual(null);
  });

  it('should return a variation when the experiment is enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    const result = renderUseOptimizelyMvtVariation(mockMvtExperiments, 'foo');
    expect(result).toEqual('control');
  });

  it('should return null when the experiment is not enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    const result = renderUseOptimizelyMvtVariation(mockMvtExperiments, 'foo');
    expect(result).toBeFalsy();
  });

  it('should call activate experiment if experiment is enabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];

    renderUseOptimizelyMvtVariation(mockMvtExperiments, 'foo');
    expect(spyActivateExperiment).toHaveBeenCalled();
  });

  it('should not call activate experiment if experiment is disabled', async () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: false,
      },
    ];

    renderUseOptimizelyMvtVariation(mockMvtExperiments, 'foo');
    expect(spyActivateExperiment).not.toHaveBeenCalled();
  });
});
