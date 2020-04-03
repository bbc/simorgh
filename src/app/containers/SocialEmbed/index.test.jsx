import React from 'react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';
import SocialEmbedContainer from '.';
import { twitterBlock, twitterBlockNoEmbed } from './fixtures';

describe('SocialEmbedContainer', () => {
  const toggleState = {
    socialEmbed: {
      enabled: true,
    },
  };

  describe('Canonical', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <RequestContextProvider
        isAmp={false}
        pageType="STY"
        service="news"
        pathname="/pathname"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider
            value={{ toggleState, toggleDispatch: jest.fn() }}
          >
            <SocialEmbedContainer blocks={[twitterBlock]} />,
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>,
    );

    shouldMatchSnapshot(
      'should render correctly without an embed block',
      <RequestContextProvider
        isAmp={false}
        pageType="STY"
        service="news"
        pathname="/pathname"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider
            value={{ toggleState, toggleDispatch: jest.fn() }}
          >
            <SocialEmbedContainer blocks={[twitterBlockNoEmbed]} />,
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>,
    );
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      <RequestContextProvider
        isAmp
        pageType="STY"
        service="news"
        pathname="/pathname"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider
            value={{ toggleState, toggleDispatch: jest.fn() }}
          >
            <SocialEmbedContainer blocks={[twitterBlock]} />,
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>,
    );
  });
});
