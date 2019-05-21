import {
  shouldShallowMatchSnapshot,
  isNull,
} from '../../helpers/tests/testHelpers';
import {
  NoData,
  NoAresMedia,
  VideoClipGlobalWithCaption,
  VideoClipGlobalWithoutCaption,
} from './fixtureData';

describe('Video', () => {
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

  describe('with data', () => {
    shouldShallowMatchSnapshot(
      'canonical - should render the video without a caption',
      VideoClipGlobalWithoutCaption({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video without a caption',
      VideoClipGlobalWithoutCaption({ platform: 'amp' }),
    );
  });

  describe('with data and a caption', () => {
    shouldShallowMatchSnapshot(
      'canonical - should render the video and caption',
      VideoClipGlobalWithCaption({ platform: 'canonical' }),
    );
    shouldShallowMatchSnapshot(
      'amp - should render the video and caption',
      VideoClipGlobalWithCaption({ platform: 'amp' }),
    );
  });
});
