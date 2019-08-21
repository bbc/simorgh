import { number, shape, string } from 'prop-types';

export const mediaPromoPropTypes = {
  name: string.isRequired,
  summary: string.isRequired,
  uri: string,
  contentType: string,
  id: string,
  type: string,
};

export const optimoPromoPropTypes = {
  id: string.isRequired,
  headlines: shape({
    seoHeadline: string.isRequired,
    promoHeadline: string,
  }),
  locators: shape({
    optimoUrn: string.isRequired,
  }),
  summary: string,
  timestamp: number,
};

export const cpsPromoPropTypes = {
  id: string,
  name: string.isRequired,
  subType: string,
  type: string,
  uri: string,
};
