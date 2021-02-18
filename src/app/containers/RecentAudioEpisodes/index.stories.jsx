import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '@bbc/psammead-storybook-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';

/* eslint-disable react/prop-types */
const RecentAudioEpisodesWithContext = ({
  masterBrand,
  brandId,
  pageType,
  episodes,
  service,
  variant,
}) => (
  <ServiceContextProvider service={service}>
    <RequestContextProvider
      service={service}
      pageType="media"
      pathname={`/${service}`}
      isAmp={false}
      variant={variant}
    >
      <RecentAudioEpisodes
        masterBrand={masterBrand}
        episodes={episodes}
        brandId={brandId}
        pageType={pageType}
      />
    </RequestContextProvider>
  </ServiceContextProvider>
);

storiesOf('Containers/EpisodeList2', module)
  .addDecorator(withKnobs)
  .addDecorator(withServicesKnob())
  .add('audio', ({ service, dir }) => {
    return (
      <RecentAudioEpisodesWithContext
        episodes={dir === 'rtl' ? arabic : indonesian}
        pageType="Podcast"
        masterBrand={
          dir === 'rtl' ? 'bbc_arabic_radio' : 'bbc_indonesian_radio'
        }
        service={service}
      />
    );
  });
// .add('audio - single episode', ({ script, service, dir }) =>
//   AudioEpisodesExample({
//     episodes:
//       dir === 'rtl'
//         ? [rtlAudioEpisodesFixture[0]]
//         : [audioEpisodesFixture[0]],
//     script,
//     service,
//     dir,
//   }),
// )
// .add('audio - with surrounding components', ({ script, service, dir }) => {
//   return AudioEpisodesExample({
//     episodes: dir === 'rtl' ? rtlAudioEpisodesFixture : audioEpisodesFixture,
//     script,
//     service,
//     dir,
//     withSurroundingComponents: true,
//   });
// });
