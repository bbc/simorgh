import { storiesOf } from '@storybook/react'; // eslint-disable-line
import {
  AudioClipGlobalGuidanceWithCaption,
  AudioClipNonUk,
  AudioClipUk,
  VideoClipNonUk,
  VideoClipGlobalPortrait,
  VideoClipGlobalWithCaption,
  VideoClipUkWithGuidance,
  VideoClipGlobalWithoutCaption,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Video Container', module)
  .add('video, clip, with guidance, with caption', () =>
    VideoClipGlobalWithCaption({ platform: 'canonical' }),
  )
  .add('video, clip, with guidance, without caption', () =>
    VideoClipGlobalWithoutCaption({ platform: 'canonical' }),
  )
  .add('video, clip, UK, with guidance', () =>
    VideoClipUkWithGuidance({ platform: 'canonical' }),
  )
  .add('video, clip, non-UK, without guidance', () =>
    VideoClipNonUk({ platform: 'canonical' }),
  )
  .add('video, clip, global, without guidance, portrait', () =>
    VideoClipGlobalPortrait({ platform: 'canonical' }),
  )
  .add('audio, clip, global, with guidance', () =>
    AudioClipGlobalGuidanceWithCaption({ platform: 'canonical' }),
  )
  .add('audio, clip, UK, without guidance', () =>
    AudioClipUk({ platform: 'canonical' }),
  )
  .add('audio, clip, non-UK, without guidance', () =>
    AudioClipNonUk({ platform: 'canonical' }),
  );

storiesOf('Video Container - AMP', module)
  .addDecorator(AmpDecorator)
  .add('video, clip, with guidance, with caption', () =>
    VideoClipGlobalWithCaption({ platform: 'amp' }),
  )
  .add('video, clip, with guidance, without caption', () =>
    VideoClipGlobalWithoutCaption({ platform: 'amp' }),
  )
  .add('video, clip, UK, with guidance', () =>
    VideoClipUkWithGuidance({ platform: 'amp' }),
  )
  .add('video, clip, non-UK, without guidance', () =>
    VideoClipNonUk({ platform: 'amp' }),
  )
  .add('video, clip, global, without guidance, portrait', () =>
    VideoClipGlobalPortrait({ platform: 'amp' }),
  )
  .add('audio, clip, global, with guidance', () =>
    AudioClipGlobalGuidanceWithCaption({ platform: 'amp' }),
  )
  .add('audio, clip, UK, without guidance', () =>
    AudioClipUk({ platform: 'amp' }),
  )
  .add('audio, clip, non-UK, without guidance', () =>
    AudioClipNonUk({ platform: 'amp' }),
  );
