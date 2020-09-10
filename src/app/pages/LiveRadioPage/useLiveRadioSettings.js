import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import pathOr from 'ramda/src/pathOr';

import { ServiceContext } from '../../contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import getMediaId from '#lib/utilities/getMediaId';
import getMasterbrand from '#lib/utilities/getMasterbrand';
import getEmbedUrl from '#lib/utilities/getEmbedUrl';

const staticAssetsPath = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}`;

const placeholderSrc = `${staticAssetsPath}images/amp_audio_placeholder.png`;

const useLiveRadioSettings = masterBrand => {
  const { service, lang, liveRadioOverrides, translations } = useContext(
    ServiceContext,
  );

  const { isAmp } = useContext(RequestContext);
  const location = useLocation();
  const assetId = 'liveradio';
  const mediaId = getMediaId({
    assetId,
    masterBrand: getMasterbrand(masterBrand, liveRadioOverrides),
    lang,
    service,
  });
  const embedUrl = getEmbedUrl({
    mediaId,
    type: 'media',
    isAmp,
    queryString: location.search,
  });
  const iframeTitle = pathOr(
    'Audio player',
    ['mediaAssetPage', 'audioPlayer'],
    translations,
  );

  return {
    assetId,
    embedUrl,
    iframeTitle,
    placeholderSrc,
  };
};

export default useLiveRadioSettings;
