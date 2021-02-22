import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob, themes } from '@bbc/psammead-storybook-helpers';
import {
  audioEpisodesFixture,
  rtlAudioEpisodesFixture,
  videoEpisodesFixture,
  rtlVideoEpisodesFixture,
} from './examples/fixtureData';
import AudioEpisodesExample from './examples/AudioEpisodesExample';
import VideoEpisodesExample from './examples/VideoEpisodesExample';

storiesOf('Containers/EpisodeList1', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('audio', ({ script, service, dir }) =>
    AudioEpisodesExample({
      episodes: dir === 'rtl' ? rtlAudioEpisodesFixture : audioEpisodesFixture,
      script,
      service,
      dir,
    }),
  )
  .add('audio - single episode', ({ script, service, dir }) =>
    AudioEpisodesExample({
      episodes:
        dir === 'rtl'
          ? [rtlAudioEpisodesFixture[0]]
          : [audioEpisodesFixture[0]],
      script,
      service,
      dir,
    }),
  )
  .add('audio - with surrounding components', ({ script, service, dir }) => {
    return AudioEpisodesExample({
      episodes: dir === 'rtl' ? rtlAudioEpisodesFixture : audioEpisodesFixture,
      script,
      service,
      dir,
      withSurroundingComponents: true,
    });
  })
  .add('video', ({ script, service, dir }) =>
    VideoEpisodesExample({
      episodes: dir === 'rtl' ? rtlVideoEpisodesFixture : videoEpisodesFixture,
      script,
      service,
      dir,
    }),
  )
  .add('video - single episode', ({ script, service, dir }) =>
    VideoEpisodesExample({
      episodes:
        dir === 'rtl'
          ? [rtlVideoEpisodesFixture[0]]
          : [videoEpisodesFixture[0]],
      script,
      service,
      dir,
    }),
  )
  .add('video - with surrounding components', ({ script, service, dir }) => {
    return VideoEpisodesExample({
      episodes: dir === 'rtl' ? rtlVideoEpisodesFixture : videoEpisodesFixture,
      script,
      service,
      dir,
      withSurroundingComponents: true,
    });
  })
  .add(
    'video - with surrounding components (dark)',
    ({ script, service, dir }) => {
      return VideoEpisodesExample({
        episodes:
          dir === 'rtl' ? rtlVideoEpisodesFixture : videoEpisodesFixture,
        script,
        service,
        dir,
        withSurroundingComponents: true,
        darkMode: true,
      });
    },
    {
      options: {
        theme: themes.dark,
      },
    },
  );
