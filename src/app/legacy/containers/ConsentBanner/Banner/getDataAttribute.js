const getDataAttribute = type => value =>
  type === 'cookie'
    ? { 'data-cookie-banner': value }
    : { 'data-terms-banner': value };

export default getDataAttribute;
