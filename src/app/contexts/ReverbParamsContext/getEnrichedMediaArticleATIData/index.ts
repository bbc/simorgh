import { MEDIA_ASSET_PAGE } from '#app/routes/utils/pageTypes';

export default ({ pageMetadata, serviceContext }) => {
  const { brandName } = serviceContext;

  const { atiAnalytics: atiData = {}, type } = pageMetadata ?? {};

  const isCpsMap = type === MEDIA_ASSET_PAGE;

  const enrichedData = {
    ...atiData,
    ...(isCpsMap && { pageTitle: `${atiData.pageTitle} - ${brandName}` }),
  };

  return enrichedData;
};
