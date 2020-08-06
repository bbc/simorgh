const RADIO_SERVICE_MAPPINGS = {
  indonesia: 'indonesian',
  persian: 'dari',
  afaanoromoo: 'oromo',
  bengali: 'bangla',
};

export default service => {
  return RADIO_SERVICE_MAPPINGS[service] || service;
};
