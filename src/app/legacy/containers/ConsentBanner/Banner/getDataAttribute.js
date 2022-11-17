const getDataAttribute = type =>
  function (value) {
    return type === 'cookie' ? { 'data-cookie-banner': value } : null;
  };

export default getDataAttribute;
