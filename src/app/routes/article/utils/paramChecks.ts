import { Article } from '#app/models/types/optimo';

export const advertisingAllowed = (pageType: string, article: Article) => {
  if (pageType === 'cpsAsset') {
    return article?.metadata?.options?.allowAdvertising ?? false;
  }
  return article?.metadata?.allowAdvertising ?? false;
};

export const isSfv = (article: Article) =>
  article?.metadata?.consumableAsSFV ?? false;
