import React from 'react';
import { LIVE_RADIO_PAGE } from '#app/routes/utils/pageTypes';
import afrique from '#data/afrique/bbc_afrique_radio/liveradio.json';
import { LiveRadioPage } from '..';

const Component = () => {
  return (
    <LiveRadioPage
      pageData={afrique.data}
      status={200}
      service="afrique"
      loading={false}
      error=""
      pageType={LIVE_RADIO_PAGE}
    />
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
  },
};

export const Page = Component;
