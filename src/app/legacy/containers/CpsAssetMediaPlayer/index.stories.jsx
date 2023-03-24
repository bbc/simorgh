import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { BrowserRouter } from 'react-router-dom';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import WithTimeMachine from '#testHelpers/withTimeMachine';
import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';
import CpsAssetMediaPlayerContainer from '.';
import videoBlock from './fixtures';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';
import { ThemeProvider } from '../../../components/ThemeProvider';

const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

// eslint-disable-next-line react/prop-types
const Component = ({ isAmp }) => {
  return (
    <ThemeProvider service="pidgin">
      <ToggleContextProvider toggles={defaultToggles}>
        <ServiceContextProvider service="pidgin">
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
        </ServiceContextProvider>
      </ToggleContextProvider>
    </ThemeProvider>
  );
};

export default {
  Component,
  title: 'Containers/MAP Media Player',
  decorators: [
    withKnobs,
    story => <WithTimeMachine>{story()}</WithTimeMachine>,
  ],
};

export const Canonical = Component;

export const Amp = props => <Component isAmp {...props} />;
Amp.decorators = [AmpDecorator];
