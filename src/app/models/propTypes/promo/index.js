import { number, shape, string } from 'prop-types';

const promoPropTypes = {
  id: string.isRequired,
  headlines: shape({
    seoHeadline: string,
    promoHeadline: string,
  }),
  locators: shape({
    optimoUrn: string.isRequired,
  }),
  summary: string,
  timestamp: number,
};

export default promoPropTypes;
