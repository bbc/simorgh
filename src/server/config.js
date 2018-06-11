/* eslint-disable import/prefer-default-export */

export const getPublicDirectory = () =>
  process.env.NODE_ENV === 'production'
    ? process.env.RAZZLE_PUBLIC_DIR
    : process.env.RAZZLE_PUBLIC_DIR_DEV;
