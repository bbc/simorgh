import { ARTICLE_PAGE, LIVE_PAGE } from '#app/routes/utils/pageTypes';

/**
 * Returns a string of a known provider name.
 * @param {String} provider A given provider.
 */
export const getProviderName = provider => {
  if (typeof provider !== 'string')
    throw Error("Expected 'provider' to be a string.");
  return {
    instagram: 'Instagram',
    twitter: 'X',
    youtube: 'YouTube',
    facebook: 'Facebook',
    tiktok: 'TikTok',
  }[provider];
};

/**
 * Returns a string that has had its tokens replaced.
 * @param {String} text A word or words containing tokens.
 * @param {Object} dictionary An object which maps keys as tokens to values.
 */
export const detokenise = (text, dictionary) => {
  if (typeof text !== 'string' || dictionary !== Object(dictionary))
    return null;
  return text.replace(/%\w+%/g, match => dictionary[match] || match);
};

/**
 * Returns an object that can be used to map tokens to values.
 * @param {Object} definitions An object containing definitions.
 */
export const dictionaryFactory = ({ provider }) => ({
  '%provider_name%': getProviderName(provider) || provider,
  '%provider%': provider,
});

export const getCaptionText = ({ pageType, caption, provider }) => {
  if (!caption) return null;

  if (pageType === ARTICLE_PAGE || pageType === LIVE_PAGE) {
    const dictionary = dictionaryFactory({ provider });

    const ADDITIONAL_TEXT_PROVIDERS = ['youtube', 'tiktok'];

    return {
      text: caption.articleText,
      ...(ADDITIONAL_TEXT_PROVIDERS.includes(provider) && {
        additionalText: detokenise(caption.articleAdditionalText, dictionary),
      }),
      textPrefixVisuallyHidden: caption.textPrefixVisuallyHidden,
    };
  }

  return {
    text: caption.text,
    textPrefixVisuallyHidden: caption.textPrefixVisuallyHidden,
  };
};
