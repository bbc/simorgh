import { blockContainingText, blockArrayModel } from '#models/blocks';

const landscapeImageLocator = `7098/production/_104842882_students.jpg`;
const portraitImageLocator = `439A/production/_100960371_syrians_and_asylum_v2-nc.png`;
const squareImageLocator = `114FE/production/_104801907_79010.jpg`;
const customImageLocator = `164BB/production/_104032319_03270dcc-9dda-4bd4-96a0-db89f6b915ae.jpg`;

export const landscape = {
  alt: 'Student sitting an exam',
  attribution: '',
  locator: landscapeImageLocator,
  width: 1024,
  height: 576,
};

export const portrait = {
  alt:
    'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.',
  attribution: 'BBC',
  locator: portraitImageLocator,
  width: 1024,
  height: 1280,
};

export const square = {
  alt: 'Tracks through the snow',
  attribution: 'BBC',
  locator: squareImageLocator,
  width: 1024,
  height: 1024,
};

export const custom = {
  alt: 'By Elisa Decker, from her series "Sidewalk"',
  attribution: 'Elisa Decker',
  locator: customImageLocator,
  width: 445,
  height: 547,
};

export const imageData = image =>
  blockArrayModel([
    {
      type: 'rawImage',
      model: {
        width: image.width,
        height: image.height,
        locator: image.locator,
        originCode: 'cpsprodpb',
        copyrightHolder: image.attribution,
      },
    },
    blockContainingText('altText', image.alt),
  ]);
