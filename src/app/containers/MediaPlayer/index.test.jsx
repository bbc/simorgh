import React from 'react';
import { string, shape, node } from 'prop-types';
import { shouldMatchSnapshot } from '../../../testHelpers';
import MediaPlayerContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import { validVideoFixture, missingVpidFixture } from './helpers/fixtures';

const defaultToggles = {
  test: {
    mediaPlayer: {
      enabled: true,
    },
  },
  live: {
    mediaPlayer: {
      enabled: false,
    },
  },
};

const mockToggleDispatch = jest.fn();
const ContextWrapper = ({ platform, children, toggleState }) => (
  <RequestContextProvider
    isAmp={platform === 'amp'}
    service="news"
    platform={platform}
    id="foo"
    pageType="article"
  >
    <ToggleContext.Provider
      value={{ toggleState, toggleDispatch: mockToggleDispatch }}
    >
      {children}
    </ToggleContext.Provider>
  </RequestContextProvider>
);

ContextWrapper.propTypes = {
  children: node.isRequired,
  platform: string.isRequired,
  toggleState: shape({}),
};

ContextWrapper.defaultProps = {
  toggleState: defaultToggles,
};

describe('MediaPlayer', () => {
  describe('is called correctly', () => {
    shouldMatchSnapshot(
      'Calls the canonical placeholder when platform is canonical',
      <ContextWrapper platform="canonical">
        <MediaPlayerContainer blocks={validVideoFixture} />
      </ContextWrapper>,
    );

    shouldMatchSnapshot(
      'Calls the canonical player when platform is canonical and placeholder is false',
      <ContextWrapper platform="canonical">
        <MediaPlayerContainer blocks={validVideoFixture} placeholder={false} />
      </ContextWrapper>,
    );

    shouldMatchSnapshot(
      'Calls the AMP player when platform is AMP',
      <ContextWrapper platform="amp">
        <MediaPlayerContainer blocks={validVideoFixture} />
      </ContextWrapper>,
    );
  });

  describe('Fails and returns early when', () => {
    shouldMatchSnapshot(
      'there is no versionId',
      <ContextWrapper platform="canonical">
        <MediaPlayerContainer blocks={missingVpidFixture} />
      </ContextWrapper>,
    );

    const toggleState = {
      test: {
        mediaPlayer: {
          enabled: false,
        },
      },
    };

    shouldMatchSnapshot(
      'component is toggled off',
      <ContextWrapper platform="canonical" toggleState={toggleState}>
        <MediaPlayerContainer blocks={validVideoFixture} />
      </ContextWrapper>,
    );
  });
});
