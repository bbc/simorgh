import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';

import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { ToggleContext } from '#contexts/ToggleContext';

import SocialEmbedContainer from '.';
import { twitterBlock, twitterBlockNoEmbed } from './fixtures';

describe('SocialEmbedContainer', () => {
  const withContexts = (Component, { isAmp, isEnabled }) => {
    return (props) => (
      <RequestContextProvider
        isAmp={isAmp}
        pageType="STY"
        service="news"
        pathname="/pathname"
      >
        <ServiceContextProvider service="news">
          <ToggleContext.Provider
            value={{
              toggleState: {
                socialEmbed: {
                  enabled: isEnabled,
                },
              },
              toggleDispatch: jest.fn(),
            }}
          >
            <Component {...props} />
          </ToggleContext.Provider>
        </ServiceContextProvider>
      </RequestContextProvider>
    );
  };

  describe('Canonical', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({ blocks: [twitterBlock] }),
    );

    it('should not render when disabled', () => {
      const { container } = render(
        withContexts(SocialEmbedContainer, {
          isAmp: false,
          isEnabled: false,
        })({ blocks: [twitterBlock] }),
      );
      expect(container.firstChild).toBeNull();
    });

    shouldMatchSnapshot(
      'should render correctly without an embed block',
      withContexts(SocialEmbedContainer, {
        isAmp: false,
        isEnabled: true,
      })({ blocks: [twitterBlockNoEmbed] }),
    );
  });

  describe('AMP', () => {
    shouldMatchSnapshot(
      'should render correctly',
      withContexts(SocialEmbedContainer, {
        isAmp: true,
        isEnabled: true,
      })({ blocks: [twitterBlock] }),
    );
  });
});
