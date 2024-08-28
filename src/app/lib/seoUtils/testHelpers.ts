import { VISUAL_PROMINENCE } from '#models/types/curationData';

export const baseCurations = [
  {
    curationId: 'a',
    curationType: 'tipo-curation',
    visualProminence: VISUAL_PROMINENCE.NORMAL,
    position: 1,
  },
  {
    curationId: 'b',
    curationType: 'tipo-curation',
    visualProminence: VISUAL_PROMINENCE.HIGH,
    position: 2,
  },
];

export const curationsWithSummaries = baseCurations.map((curation, index) => {
  return {
    ...curation,
    summaries: [
      {
        title: `Title ${index}`,
        type: `Type ${index}`,
        link: `https://www.bbc.com/mundo/${index}`,
      },
    ],
  };
});
