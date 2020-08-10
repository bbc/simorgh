const RADIO_SERVICE_MAPPINGS = {
  indonesia: 'indonesian',
  persian: 'dari',
  afaanoromoo: 'oromo',
  bengali: 'bangla',
};

export default ({ service, pathname }) => {
  if (service === 'persian' && pathname.includes('bbc_persian_radio')) {
    return 'persian';
  }
  return RADIO_SERVICE_MAPPINGS[service] || service;
};
