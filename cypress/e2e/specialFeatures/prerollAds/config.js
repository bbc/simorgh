export const mapsWithoutPreroll = {
  local: [],
  test: [],
  live: [
    {
      reason: 'service does not have preroll ads enabled',
      paths: [
        'https://www.bbc.com/pidgin/media-55222820', // CPS Video
      ],
    },
    {
      reason: 'Castaway advertising flag is false',
      paths: [],
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
    {
      service: 'afrique',
      paths: [
        'https://www.bbc.com/afrique/media-53045965', // CPS Video, advertising enabled, preroll enabled for afrique service
      ],
    },
    {
      service: 'zhongwen',
      paths: [
        'https://www.bbc.com/zhongwen/simp/science-53136501', // CPS Video, advertising enabled, preroll enabled for zhongwen service
      ],
    },
    {
      service: 'mundo',
      paths: [
        'https://www.bbc.com/mundo/media-41174775', // CPS Video, advertising enabled, preroll enabled for mundo service
      ],
    },
  ],
};
