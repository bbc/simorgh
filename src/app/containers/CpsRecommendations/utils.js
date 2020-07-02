// Transfomrs a list of recommendation items to a story promo format
const transformToStoryPromoItems = items =>
  items.map(({ assetUri, shortHeadline, imageHref }) => ({
    headlines: {
      headline: shortHeadline,
    },
    locators: {
      assetUri,
    },
    indexImage: {
      path: imageHref,
      altText: 'Image Alt text', // This value would be changed as it's on our list of improvements.
    },
    uri: assetUri,
  }));

export default transformToStoryPromoItems;
