import { BrowserRouter } from 'react-router-dom';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '#psammead/psammead-storybook-helpers/src';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { validVideoWithCaptionBlock } from './fixtureData';
import MediaPlayerContainer from '.';
import AmpDecorator from '../../../../../.storybook/helpers/ampDecorator';

// eslint-disable-next-line react/prop-types
const Component = ({ service, isAmp = false }) => {
  return (
    <RequestContextProvider
      isAmp={isAmp}
      service={service}
      platform={isAmp ? 'amp' : 'canonical'}
      pathname="/pathname"
      id="c3wmq4d1y3wo"
      pageType={ARTICLE_PAGE}
      bbcOrigin="https://www.test.bbc.com"
    >
      <ServiceContextProvider service="news">
        <ToggleContext.Provider
          value={{
            toggleState: {
              mediaPlayer: {
                enabled: true,
              },
            },
          }}
        >
          <BrowserRouter>
            <MediaPlayerContainer
              blocks={validVideoWithCaptionBlock}
              assetId="c3wmq4d1y3wo"
              assetType="articles"
              showPlaceholder
            />
          </BrowserRouter>
        </ToggleContext.Provider>
      </ServiceContextProvider>
    </RequestContextProvider>
  );
};

export default {
  title: 'Containers/Media Player',
  Component,
  parameters: { chromatic: { disable: true } },
  decorators: [withKnobs, withServicesKnob()],
};

export const Amp = props => <Component isAmp {...props} />;
export const Canonical = Component;

Amp.decorators = [AmpDecorator];
