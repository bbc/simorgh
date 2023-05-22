import { Services } from '../../../../models/types/global';
import { serviceNumerals } from '../../Canonical/Rank';

export const getInnerScript = () => {
  return `
    if (!data.items || (data.items && data.items.length === 0)) {
      throw new Error('Empty records from mostread endpoint');
    }

    data.items.map((item, index) => {
      return {
        ...item,
        rankTranslation: translations[index + 1],
      };
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
  // @ts-expect-error only a subset of services need to override the default service numerals
  const translations = serviceNumerals[service];

  const innerscript = getInnerScript();

  return `
  const translations = JSON.stringify(${translations});

  try {
    const response = await fetch("${endpoint}");
    const data = await response.json();

    ${innerscript}

    return data;
  } catch (error) {
    console.warn(error);
    return [];
  }

  exportFunction('getRemoteData', getRemoteData);
  `;
};
