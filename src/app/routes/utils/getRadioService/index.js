const RADIO_SERVICE_MAPPINGS = {
  indonesia: 'indonesian',
  persian: 'dari',
  afaanoromoo: 'oromo',
  bengali: 'bangla',
};

export default ({ service, pathname }) => {
  const isPodcast = pathname.includes('podcasts');

  if (
    service === 'persian' &&
    (pathname.includes('bbc_persian_radio') || isPodcast)
  ) {
    return 'persian';
  }

  return RADIO_SERVICE_MAPPINGS[service] || service;
};
