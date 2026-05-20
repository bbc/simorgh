import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import afrique from '#data/afrique/bbc_afrique_radio/liveradio.json';
import LiveRadioPage from './LiveRadioPage';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';

const Component = () => {
  return (
    <PageLayoutWrapper pageData={afrique.data} status={200}>
      <LiveRadioPage
        pageData={afrique.data}
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
