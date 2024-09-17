import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import { ARTICLE_PAGE } from '#routes/utils/pageTypes';
import { validVideoWithCaptionBlock } from './fixtureData';
import MediaPlayerContainer from '.';
import AmpDecorator from '#storybook/helpers/ampDecorator';

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
    </RequestContextProvider>
  );
};

export default {
  title: 'Containers/Media Player',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Amp = (_, { service }) => <Component isAmp service={service} />;
export const Canonical = Component;

Amp.decorators = [AmpDecorator];
