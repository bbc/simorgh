const mostReadItems = ({ data, numberOfItems }) =>
  data.records
    .slice(0, numberOfItems)
    .map(({ id, promo: { headlines, locators, timestamp } }) => ({
      id,
      title: headlines.shortHeadline,
      href: locators.assetUri,
      timestamp,
    }));

export default mostReadItems;
