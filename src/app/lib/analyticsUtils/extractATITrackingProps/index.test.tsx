import { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react';
import { ExperimentProvider } from '#app/contexts/ExperimentContext';
import { VIEW_EVENT } from '../analytics.const';
import extractATITrackingProps from '.';

const withExperiment =
  (experimentVariant: string | null) =>
  ({ children }: PropsWithChildren) => (
    <ExperimentProvider
      experimentName="my_experiment"
      experimentVariant={experimentVariant}
    >
      {children}
    </ExperimentProvider>
  );

const extract = (wrapper?: ReturnType<typeof withExperiment>) =>
  renderHook(
    () =>
      extractATITrackingProps({
        eventTrackingData: { componentName: 'banner' },
        eventType: VIEW_EVENT,
      }),
    { wrapper },
  ).result.current;

describe('extractATITrackingProps - experiment context', () => {
  it('has no experiment details outside an ExperimentProvider', () => {
    const result = extract();

    expect(result.experimentName).toBeUndefined();
    expect(result.experimentVariant).toBeUndefined();
  });

  it('takes the experiment from the nearest ExperimentProvider', () => {
    const result = extract(withExperiment('variant_1'));

    expect(result).toMatchObject({
      experimentName: 'my_experiment',
      experimentVariant: 'variant_1',
    });
  });

  it.each([null, 'off'])(
    'has no experiment details when the variation is %p',
    variation => {
      const result = extract(withExperiment(variation));

      expect(result.experimentName).toBeUndefined();
      expect(result.experimentVariant).toBeUndefined();
    },
  );

  it('ignores experiment details smuggled into eventTrackingData', () => {
    const { result } = renderHook(() =>
      extractATITrackingProps({
        eventTrackingData: {
          componentName: 'banner',
          // @ts-expect-error experiment details can only come from <Experiment>
          experimentName: 'explicit_experiment',
          experimentVariant: 'explicit_variant',
        },
        eventType: VIEW_EVENT,
      }),
    );

    expect(result.current.experimentName).toBeUndefined();
    expect(result.current.experimentVariant).toBeUndefined();
  });

  it('uses experimentContextFromHook instead of reading context', () => {
    const { result } = renderHook(() =>
      extractATITrackingProps({
        eventTrackingData: { componentName: 'banner' },
        eventType: VIEW_EVENT,
        eventTrackingContextFromHook: {},
        experimentContextFromHook: {
          experimentName: 'from_hook',
          experimentVariant: 'variant_2',
        },
      }),
    );

    expect(result.current).toMatchObject({
      experimentName: 'from_hook',
      experimentVariant: 'variant_2',
    });
  });
});
