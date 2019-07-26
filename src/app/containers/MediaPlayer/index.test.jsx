import React from 'react';
import renderer from 'react-test-renderer';
import { shouldShallowMatchSnapshot, isNull } from '../../../testHelpers';
import {
  NoData,
  NoAresMedia,
  VideoClipGlobalWithCaption,
  VideoClipGlobalWithoutCaption,
  VideoClipGlobalPortrait,
  VideoClipUkWithGuidance,
  VideoClipNonUk,
  AudioClipGlobalGuidanceWithCaption,
  AudioClipUk,
  AudioClipNonUk,
} from './helpers/fixtureData';
import MediaPlayerContainer from '.';
import { videoClipGlobalGuidanceBlock } from './helpers/fixtures';
import * as gridComponents from '../../lib/styledGrid';
import { RequestContextProvider } from '../../contexts/RequestContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';

describe('MediaPlayer', () => {
  describe('with no data', () => {
    isNull('canonical - should render null', NoData({ platform: 'canonical' }));
    isNull('amp - should render null', NoData({ platform: 'amp' }));
  });

  describe('with no aresMedia block', () => {
    isNull(
      'canonical - should render null',
      NoAresMedia({ platform: 'canonical' }),
    );
    isNull('amp - should render null', NoAresMedia({ platform: 'amp' }));
  });

  describe('with Video data', () => {
    it('should render', () => {
      const mockGridItem = jest.fn().mockReturnValue('whatever');
      gridComponents.GridItemConstrainedLargeNoMargin = mockGridItem;

      renderer.create(
        <RequestContextProvider isAmp>
          <ToggleContextProvider>
            <MediaPlayerContainer blocks={[videoClipGlobalGuidanceBlock]} />
          </ToggleContextProvider>
        </RequestContextProvider>,
      );

      expect(mockGridItem).toHaveBeenCalledTimes(1);
    });

    shouldShallowMatchSnapshot(
      'canonical - should render the video without a caption',
      VideoClipGlobalWithoutCaption({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video without a caption',
      VideoClipGlobalWithoutCaption({ platform: 'amp' }),
    );

    shouldShallowMatchSnapshot(
      'canonical - should render portrait video with global visibility',
      VideoClipGlobalPortrait({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render portrait video with global visibility',
      VideoClipGlobalPortrait({ platform: 'amp' }),
    );

    shouldShallowMatchSnapshot(
      'canonical - should render the video without a caption',
      VideoClipUkWithGuidance({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video without a caption',
      VideoClipUkWithGuidance({ platform: 'amp' }),
    );

    shouldShallowMatchSnapshot(
      'canonical - should render the video without a caption',
      VideoClipNonUk({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video without a caption',
      VideoClipNonUk({ platform: 'amp' }),
    );
  });

  describe('with Video data and a caption', () => {
    shouldShallowMatchSnapshot(
      'canonical - should render the video and caption',
      VideoClipGlobalWithCaption({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video and caption',
      VideoClipGlobalWithCaption({ platform: 'amp' }),
    );
  });

  describe('with Audio data', () => {
    shouldShallowMatchSnapshot(
      'canonical - should render audio clip global with guidance and caption',
      AudioClipGlobalGuidanceWithCaption({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render audio clip global with guidance and caption',
      AudioClipGlobalGuidanceWithCaption({ platform: 'amp' }),
    );

    shouldShallowMatchSnapshot(
      'canonical - should render audio clip UK only',
      AudioClipUk({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render audio clip UK only',
      AudioClipUk({ platform: 'amp' }),
    );

    shouldShallowMatchSnapshot(
      'canonical - should render audio clip non-UK only',
      AudioClipNonUk({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render audio clip non-UK only',
      AudioClipNonUk({ platform: 'amp' }),
    );
  });
});
