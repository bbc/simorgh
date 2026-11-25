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

const extract = (
  eventTrackingData: Parameters<
    typeof extractATITrackingProps
  >[0]['eventTrackingData'],
  wrapper?: ReturnType<typeof withExperiment>,
) =>
  renderHook(
    () => extractATITrackingProps({ eventTrackingData, eventType: VIEW_EVENT }),
    { wrapper },
  ).result.current;

describe('extractATITrackingProps - experiment context', () => {
  it('has no experiment details outside an ExperimentProvider', () => {
    const result = extract({ componentName: 'banner' });

    expect(result.experimentName).toBeUndefined();
    expect(result.experimentVariant).toBeUndefined();
    expect(result.sendOptimizelyEvents).toBeUndefined();
  });

  it('inherits the experiment and opts in to Optimizely events inside an ExperimentProvider', () => {
    const result = extract(
      { componentName: 'banner' },
      withExperiment('variant_1'),
    );

    expect(result).toMatchObject({
      experimentName: 'my_experiment',
      experimentVariant: 'variant_1',
      sendOptimizelyEvents: true,
    });
  });

  it.each([null, 'off'])(
    'does not inherit the experiment when the variation is %p',
    variation => {
      const result = extract(
        { componentName: 'banner' },
        withExperiment(variation),
      );

      expect(result.experimentName).toBeUndefined();
      expect(result.experimentVariant).toBeUndefined();
      expect(result.sendOptimizelyEvents).toBeUndefined();
    },
  );

  it('prefers experiment details passed explicitly in eventTrackingData', () => {
    const result = extract(
      {
        componentName: 'banner',
        experimentName: 'explicit_experiment',
        experimentVariant: 'explicit_variant',
        sendOptimizelyEvents: false,
      },
      withExperiment('variant_1'),
    );

    expect(result).toMatchObject({
      experimentName: 'explicit_experiment',
      experimentVariant: 'explicit_variant',
      sendOptimizelyEvents: false,
    });
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
      sendOptimizelyEvents: true,
    });
  });
});
