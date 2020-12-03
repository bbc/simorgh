import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { storiesOf } from '@storybook/react'; // eslint-disable-line
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import MediaPlayerContainer from '.';
import { validVideoWithCaptionBlock } from './fixtureData';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';

const defaultToggles = {
  mediaPlayer: {
    enabled: true,
  },
};

const articleID = 'c3wmq4d1y3wo';

storiesOf('Containers|Media Player/Canonical', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('default', ({ service }) => {
    return (
      <RequestContextProvider
        isAmp={false}
        service={service}
        platform="canonical"
        pathname="/pathname"
        id={articleID}
        pageType={ARTICLE_PAGE}
        bbcOrigin="https://www.test.bbc.com"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
            <BrowserRouter>
              <MediaPlayerContainer
                blocks={validVideoWithCaptionBlock}
                assetId={articleID}
                assetType="articles"
                showPlaceholder
              />
            </BrowserRouter>
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>
    );
  });

storiesOf('Containers|Media Player/AMP', module)
  .addParameters({ chromatic: { disable: true } })
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .addDecorator(AmpDecorator)
  .add('default', ({ service }) => {
    return (
      <RequestContextProvider
        isAmp
        service={service}
        platform="amp"
        id="c3wmq4d1y3wo"
        pageType={ARTICLE_PAGE}
        pathname="/pathname"
        bbcOrigin="https://www.test.bbc.com"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider value={{ toggleState: defaultToggles }}>
            <BrowserRouter>
              <MediaPlayerContainer
                blocks={validVideoWithCaptionBlock}
                assetId={articleID}
                assetType="articles"
                showPlaceholder
              />
            </BrowserRouter>
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>
    );
  });
