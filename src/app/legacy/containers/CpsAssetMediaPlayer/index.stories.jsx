import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_ASSET_PAGE } from '#routes/utils/pageTypes';
import CpsAssetMediaPlayerContainer from '.';
import videoBlock from './fixtures';
import AmpDecorator from '#storybook/helpers/ampDecorator';

const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

const Component = ({ isAmp }) => {
  return (
    <ToggleContextProvider toggles={defaultToggles}>
      <RequestContextProvider
        isAmp={isAmp}
        pageType={MEDIA_ASSET_PAGE}
        origin="https://www.bbc.com"
        service="pidgin"
        pathname="/pathname"
      >
        <BrowserRouter>
          <CpsAssetMediaPlayerContainer
            blocks={[videoBlock]}
            assetUri="/pidgin/23248703"
          />
        </BrowserRouter>
      </RequestContextProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Containers/MAP Media Player',
  decorators: [story => <WithTimeMachine>{story()}</WithTimeMachine>],
};

export const Canonical = Component;

export const Amp = () => <Component isAmp />;
Amp.decorators = [AmpDecorator];
