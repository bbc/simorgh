import { shape, string } from 'prop-types';

const mostReadTranslationsPropTypes = {
  mostReadTranslations: shape({
    header: string.isRequired,
    lastUpdated: string.isRequired,
  }),
};

export default mostReadTranslationsPropTypes;
