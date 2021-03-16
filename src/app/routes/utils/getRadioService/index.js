const RADIO_SERVICE_MAPPINGS = {
  indonesia: 'indonesian',
  persian: 'dari',
  afaanoromoo: 'oromo',
  bengali: 'bangla',
};

export default ({ service, pathname }) => {
  const isPodcast = pathname.includes('podcasts');
  const isPersianRadioMasterBrand = pathname.includes('bbc_persian_radio');

  if (service === 'persian' && (isPersianRadioMasterBrand || isPodcast)) {
    return 'persian';
  }

  return RADIO_SERVICE_MAPPINGS[service] || service;
};
