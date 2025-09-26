export default () => {
  // randomUUID is not supported on http
  if (crypto && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return crypto.getRandomValues(new Uint16Array(5)).join('-');
};
