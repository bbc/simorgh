const isLiveRadio = assetId => assetId === 'liveradio';

const getMediaId = ({ assetId, masterBrand, lang, service }) =>
  isLiveRadio(assetId)
    ? `${masterBrand}/${assetId}/${lang}` // liveradio
    : `${service}/${masterBrand}/${assetId}/${lang}`; // ondemand

export default getMediaId;
