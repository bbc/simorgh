/* eslint-disable import/prefer-default-export */
export const localBaseUrl = `${process.env.SIMORGH_PROTOCOL ||
  'http'}://${process.env.SIMORGH_HOST_URL || 'localhost'}`;
