import { shape, arrayOf, string, bool, number } from 'prop-types';

const versionPropTypes = shape({
  id: string.isRequired,
  subType: string.isRequired,
  format: string.isRequired,
  title: string,
  imageUrl: string,
  embedding: bool,
  advertising: bool,
  versions: arrayOf(
    shape({
      versionId: string,
      types: arrayOf(string),
      duration: number,
      durationISO8601: string,
      warnings: shape({}),
      availableTerritories: shape({
        uk: bool,
        nonUk: bool,
        world: bool,
      }),
      availableUntil: number,
      availableFrom: number,
    }),
  ),
  synopses: shape({
    short: string,
    medium: string,
  }),
  imageCopyright: string,
});

export default versionPropTypes;
