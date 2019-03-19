import { blockContainingText, blockArrayModel } from '../../../models/blocks';

const landscapeImageLocator = `7098/production/_104842882_students.jpg`;
const landscapeImageAlt = 'Student sitting an exam';
const portraitImageLocator = `439A/production/_100960371_syrians_and_asylum_v2-nc.png`;
const portraitImageAlt =
  'Map of the UK displaying Syrian refugees and asylum seekers per 10000 population. Ranges from 0 to 17.';
const squareImageLocator = `114FE/production/_104801907_79010.jpg`;
const squareImageAlt = 'Tracks through the snow';
const customImageLocator = `164BB/production/_104032319_03270dcc-9dda-4bd4-96a0-db89f6b915ae.jpg`;
const customImageAlt = 'By Elisa Decker, from her series "Sidewalk"';

export const landscape = {
  alt: landscapeImageAlt,
  attribution: '',
  locator: landscapeImageLocator,
  width: 1024,
  height: 576,
};

export const smallLandscape = {
  alt: landscapeImageAlt,
  attribution: '',
  locator: landscapeImageLocator,
  width: 102.4,
  height: 57.6,
};

export const portrait = {
  alt: portraitImageAlt,
  attribution: 'BBC',
  locator: portraitImageLocator,
  width: 1024,
  height: 1280,
};

export const smallPortrait = {
  alt: portraitImageAlt,
  attribution: 'BBC',
  locator: portraitImageLocator,
  width: 102.4,
  height: 128,
};

export const square = {
  alt: squareImageAlt,
  attribution: 'BBC',
  locator: squareImageLocator,
  width: 1024,
  height: 1024,
};

export const smallSquare = {
  alt: squareImageAlt,
  attribution: 'BBC',
  locator: squareImageLocator,
  width: 102.4,
  height: 102.4,
};

export const custom = {
  alt: customImageAlt,
  attribution: 'Elisa Decker',
  locator: customImageLocator,
  width: 445,
  height: 547,
};

export const smallCustom = {
  alt: customImageAlt,
  attribution: 'Elisa Decker',
  locator: customImageLocator,
  width: 44.5,
  height: 54.7,
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
