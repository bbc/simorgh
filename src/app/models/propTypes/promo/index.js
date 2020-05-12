import { number, shape, string, arrayOf, bool, oneOfType } from 'prop-types';

export const mediaPromoPropTypes = {
  name: string.isRequired,
  summary: string.isRequired,
  uri: string,
  contentType: string,
  id: string,
  type: string,
};

export const optimoPromoSummaryPropTypes = {
  blocks: arrayOf(
    shape({
      model: shape({
        blocks: arrayOf(
          shape({
            model: shape({
              blocks: arrayOf(
                shape({
                  model: shape({
                    text: string,
                  }),
                }),
              ),
            }),
          }),
        ),
      }),
    }),
  ),
};

export const optimoPromoPropTypes = {
  id: string.isRequired,
  headlines: shape({
    seoHeadline: string.isRequired,
    promoHeadline: string,
  }),
  locators: shape({
    optimoUrn: string.isRequired,
  }),
  summary: oneOfType([shape(optimoPromoSummaryPropTypes), string]),
  timestamp: number,
};

export const cpsFrontPagePromoPropTypes = {
  id: string,
  name: string.isRequired,
  subType: string,
  type: string,
  uri: string,
};

export const cpsAssetPagePromoPropTypes = {
  id: string,
  summary: string.isRequired,
  timestamp: number,
  type: string,
  headlines: shape({
    headline: string.isRequired,
    shortHeadline: string,
  }).isRequired,
  locators: shape({
    assetUri: string,
    cpsUrn: string,
    curie: string,
  }),
  indexImage: shape({
    altText: string,
    copyrightHolder: string,
    height: number,
    href: string,
    id: string,
    path: string,
    subType: string,
    type: string,
    width: number,
  }),
  passport: shape({
    category: shape({
      categoryId: string,
      categoryName: string,
    }),
    campaigns: arrayOf(
      shape({
        campaignId: string,
        campaignName: string,
      }),
    ),
  }),
  media: shape({
    advertising: bool,
    caption: string,
    embedding: bool,
    format: string,
    id: string,
    imageCopyright: string,
    imageUrl: string,
    subType: string,
    title: string,
    type: string,
    synopses: shape({
      short: string,
      medium: string,
      long: string,
    }),
    versions: arrayOf(
      shape({
        availableFrom: number,
        duration: number,
        durationISO8601: string,
        versionId: string,
        types: arrayOf(string),
        warnings: shape({}),
        availableTerritories: shape({
          uk: bool,
          nonUk: bool,
        }),
      }),
    ),
  }),
};
