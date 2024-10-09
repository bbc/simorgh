import React from 'react';
import { renderHook } from '#app/components/react-testing-library-with-providers';
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

  const renderUseOptimizelyMvtVariation = (mvtExperiments, flagId) => {
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
    return renderHook(() => useOptimizelyMvtVariation(flagId), {
      wrapper,
    }).result.current;
  };

  it('should return null if mvtExperiments is falsy', () => {
    const result = renderUseOptimizelyMvtVariation(undefined, 'foo');
    expect(result).toEqual(null);
  });

  it('should return null if mvtExperiments is an empty array', () => {
    const result = renderUseOptimizelyMvtVariation([], 'foo');
    expect(result).toEqual(null);
  });

  it('should return null if given experiment is not in array', () => {
    const mockMvtExperiments = [
      {
        experimentName: 'foo',
        variation: 'control',
        enabled: true,
      },
    ];
    const result = renderUseOptimizelyMvtVariation(mockMvtExperiments, 'bar');
    expect(result).toEqual(null);
  });

  it('should return a variation when the experiment is enabled', () => {
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

  it('should return null when the experiment is not enabled', () => {
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

  it('should call activate experiment if experiment is enabled', () => {
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

  it('should not call activate experiment if experiment is disabled', () => {
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
