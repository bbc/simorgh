import makeRelativeUrlPath from '../makeRelativeUrlPath';
import { variants } from '../variantHandler';

export const getAssetTypeCode = item => item?.assetTypeCode ?? null;

export const getHeadline = item => {
  const overtypedHeadline = item?.headlines?.overtyped ?? '';
  const headline =
    overtypedHeadline ||
    (item?.headlines?.headline ?? '') ||
    (item?.headlines?.promoHeadline?.blocks?.[0]?.model?.blocks?.[0]?.model
      ?.text ??
      '') ||
    (item?.name ?? '');

  return headline;
};

export const getUrl = (item, variant = null) => {
  const assetUri = item?.locators?.assetUri ?? null;
  const canonicalUrl = item?.locators?.canonicalUrl ?? null;
  let uri = item?.uri ?? null;
  if (uri && variant) {
    const hasVariantPath =
      uri.indexOf('/articles/') !== -1 ||
      uri.indexOf('/watch/') !== -1 ||
      uri.indexOf('/listen/') !== -1;
    if (hasVariantPath && uri.indexOf(`/${variant}`) === -1) {
      const hasKnownVariant = variants.some(knownVariant =>
        uri.endsWith(`/${knownVariant}`),
      );
      uri = hasKnownVariant
        ? uri.replace(/\/[^/]+$/, `/${variant}`)
        : `${uri}/${variant}`;
    }
  }

  return assetUri || makeRelativeUrlPath(uri) || canonicalUrl;
};

export const getIsLive = item =>
  getAssetTypeCode(item) === null ? item?.cpsType === 'LIV' : false;
