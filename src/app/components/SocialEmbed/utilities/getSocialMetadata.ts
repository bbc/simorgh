import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import {
  ARTICLE_PAGE,
  CORRESPONDENT_STORY_PAGE,
  STORY_PAGE,
} from '#app/routes/utils/pageTypes';
import { Translations } from '#app/models/types/translations';
import { PageTypes, SocialEmbedProviders } from '#app/models/types/global';
import { getProviderFromSource, getIdFromSource } from './sourceHelpers';
import createTranslations from './translations';
import { getCaptionText } from '.';

type Props = {
  blocks: {
    type: SocialEmbedProviders;
    indexOfType: number;
    model: object;
  }[];
  source: string;
  pageType: PageTypes;
  translations: Translations;
};

type OEmbed = {
  html: string;
  height: number;
};

export default ({ blocks, source, pageType, translations }: Props) => {
  let id = '';
  let oEmbed;
  let fallback;
  let skipLink;
  let caption;
  let provider;

  if (pageType === STORY_PAGE || pageType === CORRESPONDENT_STORY_PAGE) {
    const { type: SocialProvider, indexOfType, model } = blocks[0];
    provider = SocialProvider;
    const index = indexOfType + 1;

    id = pathOr('', ['id'], model);
    const href = path(['href'], model);

    oEmbed = path<OEmbed>(['embed', 'oembed'], model);

    const {
      fallback: fallbackTranslations,
      skipLink: skipLinkTranslations,
      caption: captionTranslations,
    } = createTranslations({ translations, index });

    fallback = {
      ...fallbackTranslations,
      linkHref: href,
    };

    skipLink = {
      ...skipLinkTranslations,
      endTextId: `end-of-%provider%-content-${index}`,
    };

    caption = SocialProvider === 'youtube' ? captionTranslations : null;
  }

  if (pageType === ARTICLE_PAGE) {
    const { model } = blocks[0];
    provider = getProviderFromSource(source);

    id = getIdFromSource(source);

    oEmbed = path<OEmbed>(['blocks', 0, 'model', 'oembed'], model);
    const oEmbedIndexOfType = path(['indexOfType'], oEmbed);
    const oEmbedPosition = (oEmbedIndexOfType as number) + 1;

    const {
      fallback: fallbackTranslations,
      skipLink: skipLinkTranslations,
      caption: captionTranslations,
    } = createTranslations({ translations, index: oEmbedPosition });

    fallback = {
      ...fallbackTranslations,
      linkHref: source,
    };

    skipLink = {
      ...skipLinkTranslations,
      endTextId:
        oEmbedPosition > 0
          ? `end-of-%provider%-content-${oEmbedPosition}`
          : `end-of-%provider%-content`,
    };

    caption = captionTranslations;
  }

  const embedCaption = getCaptionText({ pageType, caption, provider });

  return {
    id,
    oEmbed,
    fallback,
    skipLink,
    embedCaption,
    provider,
  };
};
