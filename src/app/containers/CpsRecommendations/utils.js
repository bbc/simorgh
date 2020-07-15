const getIchefSrc = href => {
  const DEFAULT_IMAGE_RES = 660;

  const path = href.replace('http://c.files.bbci.co.uk', '/cpsprodpb');

  return `https://ichef.bbci.co.uk/news/${DEFAULT_IMAGE_RES}${path}`;
};

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
      path: getIchefSrc(imageHref),
      altText: 'Image Alt text', // This value would be changed as it's on our list of improvements.
    },
    uri: assetUri,
  }));

export default transformToStoryPromoItems;
