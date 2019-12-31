import { shape, string } from 'prop-types';

const mostReadTranslationsPropTypes = shape({
  header: string.isRequired,
  lastUpdated: string.isRequired,
});

export default mostReadTranslationsPropTypes;
