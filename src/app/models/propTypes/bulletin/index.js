import { string, shape } from 'prop-types';

export const tvBulletinItem = {
  name: string.isRequired,
  summary: string,
  indexImage: shape({
    href: string.isRequired,
    altText: string.isRequired,
  }),
  uri: string.isRequired,
};

export const radioBulletinItem = {
  name: string.isRequired,
  summary: string,
  indexImage: shape({
    href: string.isRequired,
    altText: string.isRequired,
  }),
  uri: string.isRequired,
};
