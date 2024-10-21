import { pathOr } from 'rambda';

const createTranslations = ({ translations, index }) => {
  const skipLinkText = pathOr(
    'Skip %provider_name% content',
    ['socialEmbed', 'skipLink', 'text'],
    translations,
  ).concat(index > 0 ? `, ${index}` : '');

  const skipLinkEndTextVisuallyHidden = pathOr(
    'End of %provider_name% content',
    ['socialEmbed', 'skipLink', 'endTextVisuallyHidden'],
    translations,
  ).concat(index > 0 ? `, ${index}` : '');

  return {
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
      text: skipLinkText,
      endTextVisuallyHidden: skipLinkEndTextVisuallyHidden,
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
      articleText: pathOr(
        'Warning: The BBC is not responsible for the content of external sites.',
        ['socialEmbed', 'caption', 'articleText'],
        translations,
      ),
      articleAdditionalText: pathOr(
        '%provider_name% content may contain adverts',
        ['socialEmbed', 'caption', 'articleAdditionalText'],
        translations,
      ),
    },
  };
};

export default createTranslations;
