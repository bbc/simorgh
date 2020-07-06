export const mapsWithoutPreroll = {
  local: [],
  test: [],
  live: [
    {
      reason: 'service does not have preroll ads enabled',
      paths: [
        'https://www.bbc.com/pidgin/media-44221514', // CPS Video
      ],
    },
    {
      reason: 'Castaway advertising flag is false',
      paths: [
        'https://www.bbc.com/mundo/media-48938201', // CPS Video
      ],
    },
    {
      reason: 'duration is less than 30 seconds',
      paths: [
        'https://www.bbc.com/mundo/media-52481764', // CPS Video
      ],
    },
  ],
};

export const mapsWithPreroll = {
  local: [],
  test: [],
  live: [
    'https://www.bbc.com/afrique/media-53045965', // CPS Video, advertising enabled, preroll enabled for afrique service
    'https://www.bbc.com/zhongwen/simp/science-53136501', // CPS Video. advertising enabled, preroll enabled for zhongwen service
    // 'https://www.bbc.com/russian/media-52728860', // CPS Video
  ],
};
