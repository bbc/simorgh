import { PageTypes, SocialEmbedProviders } from '#app/models/types/global';
import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';

export const checkIsSupportedProvider = (
  provider: SocialEmbedProviders,
  pageType: PageTypes,
) => {
  // Optimo Articles support all social media providers
  if (pageType === ARTICLE_PAGE) return provider;

  // CPS Pages only support a select few
  if ([STORY_PAGE, CORRESPONDENT_STORY_PAGE].includes(pageType)) {
    return ['twitter', 'instagram', 'youtube'].includes(provider);
  }

  // Only Optimo and CPS articles support social embeds
  return false;
};

/**
 * Returns a string of a known provider name.
 * @param {String} provider A given provider.
 */
export const getProviderName = (provider: SocialEmbedProviders) => {
  if (typeof provider !== 'string')
    throw Error("Expected 'provider' to be a string.");
  return {
    instagram: 'Instagram',
    twitter: 'Twitter',
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
export const detokenise = (
  text: string,
  dictionary: {
    [key: string]: string;
  },
) => {
  if (typeof text !== 'string' || dictionary !== Object(dictionary))
    return null;
  return text.replace(/%\w+%/g, match => dictionary[match] || match);
};

/**
 * Returns an object that can be used to map tokens to values.
 * @param {Object} definitions An object containing definitions.
 */
export const dictionaryFactory = ({
  provider,
}: {
  provider: SocialEmbedProviders;
}) => ({
  '%provider_name%': getProviderName(provider) || provider,
  '%provider%': provider,
});

export const getCaptionText = ({
  pageType,
  caption,
  provider,
}: {
  pageType: PageTypes;
  caption?: {
    text: string;
    textPrefixVisuallyHidden: string;
    articleText: string;
    articleAdditionalText: string;
  };
  provider: SocialEmbedProviders;
}) => {
  if (!caption) return null;

  if (pageType === ARTICLE_PAGE) {
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

/**
 * These styles are lifted from #psammead/psammead-visually-hidden-text/src, which we
 * cannot use directly as we require control over _when_ they are applied.
 */
export const visuallyHiddenStyle = `
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  width: 1px;
  margin: 0;
`;
