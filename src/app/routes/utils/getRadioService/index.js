const RADIO_SERVICES = {
  indonesia: 'indonesian',
  persian: 'dari',
  afaanoromoo: 'oromo',
  bengali: 'bangla',
};

export default service => {
  return RADIO_SERVICES[service];
};
