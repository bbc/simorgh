import { shape, arrayOf, string } from 'prop-types';

const versionPropTypes = shape({
  available: string.isRequired,
  caption: string.isRequired,
  duration: string,
  embedding: string,
  externalId: string.isRequired,
  format: string.isRequired,
  id: string.isRequired,
  live: string.isRequired,
  subType: string,
  type: string.isRequired,
  title: string.isRequired,
  versions: arrayOf(
    shape({
      versionId: string.isRequired,
    }),
  ),
});

export default versionPropTypes;
