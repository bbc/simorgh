import { StoryArgs, StoryProps } from '#app/models/types/storybook';
import koreanAudioResponse from '#data/korean/bbc_korean_radio/w3ct1vk5.json';
import gahuzaAudioResponse from '#data/gahuza/bbc_gahuza_radio/p02pcb5c.json';
import portugueseAudioResponse from '#data/portuguese/podcasts/p07r3r3t.json';
import _OnDemandAudioPage from './OnDemandAudioLayout';
import withMediaError from '#app/lib/utilities/episodeAvailability/withMediaError';
import PageLayoutWrapper from '#app/components/PageLayoutWrapper';

const OnDemandAudioPage = withMediaError(_OnDemandAudioPage);

const externalLinks = [
  {
    linkText: 'Spotify',
    linkUrl: 'https://open.spotify.com/show/4KqTMEWcOUzHFHAPCt54Uk',
    linkType: 'spotify',
  },
  {
    linkText: 'Apple',
    linkUrl:
      'https://podcasts.apple.com/br/podcast/que-hist%C3%B3ria/id1492686435',
    linkType: 'apple',
  },
  {
    linkText: 'YouTube',
    linkUrl:
      'https://www.youtube.com/playlist?list=PLCX5XjxKTpTmh19ipbvr6OACmBWczOLJO',
    linkType: 'youtube',
  },
  {
    linkText: 'Amazon Music',
    linkUrl:
      'https://music.amazon.co.uk/podcasts/51c33ac0-d208-4026-bc4d-396205703a8f/que-hist%C3%B3ria',
    linkType: 'amazon',
  },
  {
    linkUrl: 'https://podcasts.files.bbci.co.uk/p07r3r3t.rss',
    linkText: 'RSS',
    linkType: 'rss',
  },
  {
    linkUrl:
      'https://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download-low/proto/https/vpid/p0jdsnyw.mp3',
    linkText: 'Baixar episódio',
    linkType: 'download',
  },
];

const gahuza = gahuzaAudioResponse.data;
const korean = koreanAudioResponse.data;
const portuguese = { ...portugueseAudioResponse.data, externalLinks };

const onDemandAudioFixtures = {
  gahuza,
  korean,
  portuguese,
};

const Component = ({ service }: StoryProps) => {
  const pageData = onDemandAudioFixtures[service] || gahuza;
  return (
    <PageLayoutWrapper pageData={pageData} status={200}>
      <OnDemandAudioPage pageData={pageData} />
    </PageLayoutWrapper>
  );
};

export default {
  Component,
  title: 'Pages/OnDemand Audio Page',
  parameters: {
    chromatic: {
      diffThreshold: 0.2,
    },
    layout: 'fullscreen',
  },
};

export const Example = {
  render: (_: StoryArgs, { service, variant }: StoryProps) => (
    <Component service={service} variant={variant} />
  ),
  parameters: { chromatic: { disableSnapshot: true } },
};

// This story is for chromatic testing purposes only
export const TestRadio = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="gahuza" variant={variant} />
  ),
  tags: ['!dev'],
};

// This story is for chromatic testing purposes only
export const TestRadioLite = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="gahuza" variant={variant} isLite />
  ),
  tags: ['!dev'],
  parameters: {
    chromatic: {
      viewports: [
        399, // Group 1
        899, // Group 3
      ],
    },
  },
};

// This story is for chromatic testing purposes only
export const TestPodcast = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="portuguese" variant={variant} />
  ),
  tags: ['!dev'],
  parameters: {
    chromatic: {
      viewports: [
        399, // Group 1
        899, // Group 3
      ],
    },
  },
};

// This story is for chromatic testing purposes only
export const TestPodcastLite = {
  render: (_: StoryArgs, { variant }: StoryProps) => (
    <Component service="portuguese" variant={variant} isLite />
  ),
  tags: ['!dev'],
  parameters: {
    chromatic: {
      viewports: [
        399, // Group 1
        899, // Group 3
      ],
    },
  },
};
