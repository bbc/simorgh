import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { BrowserRouter } from 'react-router-dom';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import VideoPlayer from '.';

const origin = 'http://localhost:7080';

const defaultTvPlayerProps = {
  assetId: 'id',
  placeholderSrc: 'https://ichef.bbci.co.uk/images/ic/1024x576/p063j1dv.jpg',
  title: 'On Demand TV',
  embedUrl:
    'https://polling.test.bbc.co.uk/ws/av-embeds/media/pashto/bbc_pashto_tv/w172xcldhhrdqgb/ps/amp?morph_env=live',
  iframeTitle: 'video player',
  type: 'video',
};

const defaultRequestContextValue = { platform: 'foobar', origin };

/* eslint-disable react/prop-types */
const renderComponent = ({
  videoPlayerProps = defaultTvPlayerProps,
  requestContextValue = defaultRequestContextValue,
  service = 'pashto',
}) => (
  <RequestContext.Provider value={requestContextValue}>
    <ServiceContextProvider service={service}>
      <BrowserRouter>
        <VideoPlayer {...videoPlayerProps} />
      </BrowserRouter>
    </ServiceContextProvider>
  </RequestContext.Provider>
);
/* eslint-enable react/prop-types */

describe('VideoPlayer', () => {
  shouldMatchSnapshot(
    'should render correctly for canonical',
    renderComponent({
      requestContextValue: { platform: 'canonical', isAmp: false, origin },
    }),
  );

  shouldMatchSnapshot(
    'should render correctly for amp',
    renderComponent({
      requestContextValue: { platform: 'amp', isAmp: true, origin },
    }),
  );
});
