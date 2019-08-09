import React from 'react';
import renderer from 'react-test-renderer';
import { string, shape, node } from 'prop-types';
import MediaPlayerContainer from '.';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContext } from '../../contexts/ToggleContext';
import validVideoBlocksArray from './helpers/fixtures';

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
  toggleState: shape,
};

ContextWrapper.defaultProps = {
  toggleState: defaultToggles,
};

describe('MediaPlayer', () => {
  describe('Calls the correct props', () => {
    it('Calls the canonical player when platform is canonical', () => {
      const tree = renderer.create(
        <ContextWrapper platform="canonical">
          <MediaPlayerContainer blocks={validVideoBlocksArray} />
        </ContextWrapper>,
      );

      expect(tree).toMatchSnapshot();
    });

    it('Calls the AMP player when platform is AMP', () => {
      const tree = renderer.create(
        <ContextWrapper platform="amp">
          <MediaPlayerContainer blocks={validVideoBlocksArray} />
        </ContextWrapper>,
      );

      expect(tree).toMatchSnapshot();
    });
  });

  describe('Fails and returns early when', () => {
    xit('there is no versionId', () => {});

    it('component is toggled off', () => {
      const toggleState = {
        test: {
          mediaPlayer: {
            enabled: false,
          },
        },
      };

      const tree = renderer.create(
        <ContextWrapper platform="canonical" toggleState={toggleState}>
          <MediaPlayerContainer blocks={validVideoBlocksArray} />
        </ContextWrapper>,
      );

      expect(tree).toMatchSnapshot();
    });

    xit('blocks object is falsy', () => {});
  });
});
