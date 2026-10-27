export default ({ pageMetadata, serviceContext }) => {
  const {
    brandName,
    mostRead: { header },
  } = serviceContext;

  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  const enrichedData = { ...atiData, pageTitle: `${header} - ${brandName}` };

  return enrichedData;
};
