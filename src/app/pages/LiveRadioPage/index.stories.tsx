import afrique from '#data/afrique/bbc_afrique_radio/liveradio.json';
import LiveRadioPage from './LiveRadioPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';

const Component = () => {
  const pageData = afrique.data;

  return (
    <ToggleContextProvider
      toggles={{
        liveRadioSchedule: {
          enabled: true,
        },
      }}
    >
      <ServiceContextProvider service="afrique">
        <PageLayoutWrapper
          // @ts-expect-error - Fixture data
          pageData={pageData}
          status={200}
        >
          <LiveRadioPage
            // @ts-expect-error - Fixture data
            pageData={pageData}
          />
        </PageLayoutWrapper>
      </ServiceContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Pages/Radio Page',
  globals: {
    service: { service: 'afrique' },
  },
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
      delay: 8000,
      pauseAnimationAtEnd: false,
    },
    layout: 'fullscreen',
  },
};

export const Page = Component;
