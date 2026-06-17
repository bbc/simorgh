export default ({ pageMetadata, serviceContext }) => {
  const { atiAnalytics: atiData = {} } = pageMetadata ?? {};

  const {
    brandName,
    mostRead: { header },
  } = serviceContext;

  const enrichedData = { ...atiData, pageTitle: `${header} - ${brandName}` };

  return enrichedData;
};
