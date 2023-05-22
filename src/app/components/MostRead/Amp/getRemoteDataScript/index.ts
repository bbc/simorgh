import { Services } from '../../../../models/types/global';
import { serviceNumerals } from '../../Canonical/Rank';

export default ({
  endpoint,
  service,
}: {
  endpoint: string;
  service: Services;
}) => {
  const translation = serviceNumerals(service);

  return `
  const translations = ${JSON.stringify(translation)}
  const getRemoteData = async () => {
    try{
      const response = await fetch("${endpoint}");
      const data = await response.json();

      if(data.records.length === 0){
        throw new Error("Empty records from mostread endpoint");
      }

      data.records.forEach((item, index) => {
        item.rankTranslation = translations[index+1];

        if (!item.promo.headlines.shortHeadline) {
          item.promo.headlines.shortHeadline = item.promo.headlines.seoHeadline;
        }

        if(!item.promo.locators.assetUri) {
          item.promo.locators.assetUri = item.promo.locators.canonicalUrl;
        }

      });

      return data;
    } catch(error){
      console.warn(error);
      return [];
    }
  }
    exportFunction('getRemoteData', getRemoteData);`;
};
