import * as OperaMiniHookModule from '#app/hooks/useOperaMiniDetection';

import { renderHook } from '#app/components/react-testing-library-with-providers';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services } from '#app/models/types/global';
import React, { PropsWithChildren, act } from 'react';
import useDeterminePlaceholderMode, { Mode } from '.';

const ServiceContextWrapper =
  (service: Services) =>
  ({ children }: PropsWithChildren) => (
    <ServiceContextProvider service={service}>
      {children}
    </ServiceContextProvider>
  );

describe('useDeterminePlaceholder', () => {
  it.each([
    {
      title:
        'Returns default mode for any service that is not Mundo, provided they are NOT on data saver or low battery',
      isOperaMini: false,
      service: 'afaanoromoo' as Services,
      dataSaver: false,
      batteryLevel: '1',
      hasTranscript: true,
      expected: Mode.DEFAULT,
    },
    {
      title:
        'Returns sustainability message mode for Mundo under any circumstance',
      isOperaMini: false,
      service: 'mundo' as Services,
      dataSaver: false,
      batteryLevel: '1',
      hasTranscript: true,
      expected: Mode.SHOW_SUSTAINABILITY_MSG,
    },
    {
      title:
        'Returns sustainability message mode for any service with data saver',
      isOperaMini: false,
      service: 'afaanoromoo' as Services,
      dataSaver: true,
      batteryLevel: '1',
      hasTranscript: true,
      expected: Mode.SHOW_SUSTAINABILITY_MSG,
    },
    {
      title:
        'Returns sustainability message mode for any service with power less equal to 20%',
      isOperaMini: false,
      service: 'afaanoromoo' as Services,
      dataSaver: false,
      batteryLevel: '0.2',
      hasTranscript: true,
      expected: Mode.SHOW_SUSTAINABILITY_MSG,
    },

    {
      title:
        'Returns sustainability message mode for any service with on operaMini',
      isOperaMini: true,
      service: 'afaanoromoo' as Services,
      dataSaver: false,
      batteryLevel: '1',
      hasTranscript: true,
      expected: Mode.SHOW_SUSTAINABILITY_MSG,
    },
    {
      title: 'Returns default for Mundo services with no transcript',
      isOperaMini: true,
      service: 'mundo' as Services,
      dataSaver: false,
      batteryLevel: '1',
      hasTranscript: false,
      expected: Mode.DEFAULT,
    },
  ])(
    '$title',
    async ({
      isOperaMini,
      service,
      dataSaver,
      batteryLevel,
      hasTranscript,
      expected,
    }) => {
      global.navigator.connection = { saveData: dataSaver };
      global.navigator.getBattery = () =>
        Promise.resolve({ level: batteryLevel });

      jest.spyOn(OperaMiniHookModule, 'default').mockReturnValue(isOperaMini);

      const { current } = await act(async () => {
        const { result } = await renderHook(
          () => useDeterminePlaceholderMode(hasTranscript),
          {
            wrapper: ServiceContextWrapper(service),
          },
        );
        return result;
      });

      expect(current).toBe(expected);
    },
  );
});
