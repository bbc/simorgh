export const audioEpisodesFixture = [
  {
    id: '1',
    url: 'https://www.bbc.com/blahasda',
    brandTitle: 'Magazine de la Culture',
    date: '4 Avril 2020',
    dateTime: '2020-04-04',
    duration: 'PT3M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
  {
    id: '2',
    url: 'https://www.bbc.com/1',
    brandTitle: 'Le Journal',
    episodeTitle: "Le premier rendez-vous d'information de la soirée.",
    date: '20 octobre 2020',
    dateTime: '2020-10-20',
    duration: 'PT1H30M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
  {
    id: '3',
    url: 'https://www.bbc.com/2',
    brandTitle: 'Afrique Avenir',
    episodeTitle: 'Tout savoir sur les jeunes entrepreneurs africains.',
    date: '21 octobre 2020',
    dateTime: '2020-10-21',
    duration: 'PT59M',
    durationLabel: 'Durée',
    time: '14:00',
    locale: 'fr',
  },
];

const rtlAudioSingleEpisodeFixture = {
  brandTitle: 'یونیورسٹی کی اندھیری',
  date: 'بی بی سی اردو ڈاٹ کام، کرا',
  durationLabel: 'المدة',
  time: 'ریشان',
  locale: 'ar',
};

export const rtlAudioEpisodesFixture = [
  {
    id: '1',
    url: 'https://www.bbc.com',
    duration: 'PT3M',
    episodeTitle: 'بی بی سی ا یونیورسٹی ردو',
    ...rtlAudioSingleEpisodeFixture,
  },
  {
    id: '2',
    url: 'https://www.bbc.com/a',
    duration: 'PT1H30M',
    ...rtlAudioSingleEpisodeFixture,
  },
  {
    id: '3',
    url: 'https://www.bbc.com/b',
    duration: 'PT59M',
    ...rtlAudioSingleEpisodeFixture,
  },
];

export const videoEpisodesFixture = audioEpisodesFixture.map(episode => ({
  ...episode,
  image: 'https://ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
  altText: 'BBC News Afrique',
}));

export const rtlVideoEpisodesFixture = rtlAudioEpisodesFixture.map(episode => ({
  ...episode,
  image: 'https://ichef.bbci.co.uk/images/ic/768x432/p08b22y1.png',
  altText: 'BBC News Afrique',
}));
