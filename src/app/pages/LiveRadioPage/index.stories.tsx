import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import afrique from '#data/afrique/bbc_afrique_radio/liveradio.json';
import LiveRadioPage from './LiveRadioPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';

const Component = () => {
  const pageData = afrique.data;
  return (
    // @ts-expect-error - Fixture data
    <PageLayoutWrapper pageData={pageData} status={200}>
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
  );
};

export default {
  Component,
  title: 'Pages/Radio Page',
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
