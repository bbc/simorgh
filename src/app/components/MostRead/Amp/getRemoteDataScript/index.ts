import { Services } from '../../../../models/types/global';
import { serviceNumerals } from '../../Canonical/Rank';

export const transformData = () => {
  return `
    data.items = data.records;

    if (!data.items || (data.items && data.items.length === 0)) {
      throw new Error('Empty records from mostread endpoint');
    }

    data.items.forEach((item, index) => {
      item.rankTranslation = translations[index + 1];
    });
  `;
};

export default ({
  endpoint,
  service,
}: {
  endpoint: string;
  service: Services;
}) => {
  return `
  const translations = ${JSON.stringify(serviceNumerals(service))}

  const getRemoteData = async () => {
    try {
      const response = await fetch("${endpoint}");
      const data = await response.json();

      ${transformData()}
      
      return data;
    } catch (error) {
      console.warn(error);
      return [];
    }
  }

  exportFunction('getRemoteData', getRemoteData);
  `;
};
