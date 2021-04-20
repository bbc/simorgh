import pathOr from 'ramda/src/pathOr';

const createTranslations = ({ translations, index }) => ({
  fallback: {
    text: pathOr(
      'Content is not available',
      ['socialEmbed', 'fallback', 'text'],
      translations,
    ),
    linkText: pathOr(
      'View content on %provider_name%',
      ['socialEmbed', 'fallback', 'linkText'],
      translations,
    ),
    linkTextSuffixVisuallyHidden: pathOr(
      ', external',
      ['socialEmbed', 'fallback', 'linkTextSuffixVisuallyHidden'],
      translations,
    ),
    warningText: pathOr(
      null,
      ['socialEmbed', 'fallback', 'warningText'],
      translations,
    ),
  },

  skipLink: {
    text: `${pathOr(
      'Skip %provider_name% content',
      ['socialEmbed', 'skipLink', 'text'],
      translations,
    )}, ${index}`,
    endTextVisuallyHidden: `${pathOr(
      'End of %provider_name% content',
      ['socialEmbed', 'skipLink', 'endTextVisuallyHidden'],
      translations,
    )}, ${index}`,
  },

  caption: {
    textPrefixVisuallyHidden: pathOr(
      'Video caption, ',
      ['socialEmbed', 'caption', 'textPrefixVisuallyHidden'],
      translations,
    ),
    text: pathOr(
      'Warning: Third party content may contain adverts',
      ['socialEmbed', 'caption', 'text'],
      translations,
    ),
  },
});

export default createTranslations;
