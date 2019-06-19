import { shouldShallowMatchSnapshot, isNull } from '../../../testHelpers';
import {
  NoData,
  NoAresMedia,
  VideoClipGlobalWithCaption,
  VideoClipGlobalWithoutCaption,
  VideoClipGlobalPortrait,
  VideoClipUkWithGuidance,
  VideoClipNonUk,
  AudioClipGlobalGuidance,
  AudioClipUk,
  AudioClipNonUk,
  AudioEpisodeGlobal,
} from './fixtureData';

describe('AudioVideo', () => {
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
      'canonical - should render audio clip global with guidance',
      AudioClipGlobalGuidance({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render audio clip global with guidance',
      AudioClipGlobalGuidance({ platform: 'amp' }),
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

    shouldShallowMatchSnapshot(
      'canonical - should render audio episode global',
      AudioEpisodeGlobal({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render audio episode global',
      AudioEpisodeGlobal({ platform: 'amp' }),
    );
  });
});
