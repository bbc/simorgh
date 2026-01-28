import isLive from '#app/lib/utilities/isLive';

export const getIdctaBaseUrl = (): string => {
  return isLive()
    ? 'https://idcta.api.bbc.com/idcta'
    : 'https://idcta.test.api.bbc.com/idcta';
};

export const getIdctaConfigUrl = (): string => `${getIdctaBaseUrl()}/config`;
