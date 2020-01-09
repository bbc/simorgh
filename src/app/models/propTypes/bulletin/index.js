import { number, shape, string } from 'prop-types';

export const itemImage = {
  path: string,
  height: number,
  width: number,
  altText: string,
  copyrightHolder: string,
};

export const tvBulletinItem = {
  name: string.isRequired,
  summary: string,
  indexImage: shape(itemImage),
  uri: string.isRequired,
};

export const radioBulletinItem = {
  name: string.isRequired,
  summary: string,
  indexImage: shape(itemImage),
  uri: string.isRequired,
};
