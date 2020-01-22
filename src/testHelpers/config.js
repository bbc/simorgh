/* eslint-disable import/prefer-default-export */
export const localBaseUrl = `${process.env.PROTOCOL || 'http'}://${process.env
  .HOST_URL || 'localhost'}`;
