import {
  CurationData,
  VisualProminence,
  VisualStyle,
} from '#app/models/types/curationData';

const getPositionsOfCurationsByStyleAndProminence = (
  curations: CurationData[],
) => {
  const positionsOfCurationsByStyleAndProminence = new Map();

  curations.forEach(({ visualStyle, visualProminence, position }) => {
    const key = `${visualStyle}_${visualProminence}`;

    const positions = positionsOfCurationsByStyleAndProminence.get(key) || [];

    // Captures the positions of each curation by visual style and prominence
    positionsOfCurationsByStyleAndProminence.set(key, [...positions, position]);
  });

  return positionsOfCurationsByStyleAndProminence;
};

interface NthCurationByStyleAndProminence {
  curations: CurationData[];
  visualStyle?: VisualStyle | string;
  visualProminence: VisualProminence | string;
  position: number;
}

export default ({
  curations,
  visualStyle,
  visualProminence,
  position,
}: NthCurationByStyleAndProminence) => {
  const positionsOfCurationsByStyleAndProminence =
    getPositionsOfCurationsByStyleAndProminence(curations);

  const positions = positionsOfCurationsByStyleAndProminence.get(
    `${visualStyle}_${visualProminence}`,
  );

  return positions?.findIndex((x: number) => x === position) + 1;
};
