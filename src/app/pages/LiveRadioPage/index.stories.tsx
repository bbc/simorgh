import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import afrique from '#data/afrique/bbc_afrique_radio/liveradio.json';
import LiveRadioPage from './LiveRadioPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';

const Component = () => {
  const pageData = afrique.data;

  return (
    <ServiceContextProvider service="afrique">
      <PageLayoutWrapper
        // @ts-expect-error - Fixture data
        pageData={pageData}
        status={200}
      >
        <LiveRadioPage
          // @ts-expect-error - Fixture data
          pageData={pageData}
          status={200}
          service="afrique"
          loading={false}
          error=""
          pageType={LIVE_RADIO_PAGE}
        />
      </PageLayoutWrapper>
    </ServiceContextProvider>
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
