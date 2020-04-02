const getDataAttribute = (type) => (value) =>
  type === 'cookie' ? { 'data-cookie-banner': value } : null;

export default getDataAttribute;
