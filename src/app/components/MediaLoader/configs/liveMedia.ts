import filterForBlockType from '#lib/utilities/blockHandlers';
import moment from 'moment';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import onClient from '#app/lib/utilities/onClient';
import buildIChefURL from '#app/lib/utilities/ichefURL';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
  pageType,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveMediaBlock } = filterForBlockType(blocks, 'liveMedia');
  let warning: string | null = null;

  const {
    imageUrlTemplate: holdingImageURL,
    version: video,
    title,
    synopses: { short },
  } = liveMediaBlock;

  const {
    warnings,
    serviceId: serviceID,
    vpid: versionID,
    status,
    duration,
  } = video || {};

  if (warnings) {
    warning = warnings.warning_text;
  }

  const rawDuration = moment.duration(duration).asSeconds();

  const isInternalReferrer = onClient()
    ? document.referrer.includes(window.location.hostname)
    : false;

  // Enable autoplay only on live TV pages when the user is coming to the page from an internal link
  const shouldAutoplay = pageType === LIVE_TV_PAGE && isInternalReferrer;

  const getPlaceholderURL = () =>
    pageType === LIVE_TV_PAGE
      ? buildIChefURL({
          originCode: 'pips',
          locator: liveMediaBlock?.masterbrand?.imageUrlTemplate,
          resolution: 800,
        })
      : holdingImageURL;

  const holdingImageURLForLiveTV = getPlaceholderURL();

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: shouldAutoplay,
      statsObject: {
        ...basePlayerConfig.statsObject,
        episodePID: liveMediaBlock.id,
      },
      playlistObject: {
        title,
        holdingImageURL: holdingImageURLForLiveTV,
        items: [
          {
            ...(serviceID && { serviceID }),
            ...(!serviceID && {
              versionID,
              duration: rawDuration,
            }),
            kind: 'programme',
            live: status === 'LIVE',
          },
        ],
        summary: short,
        ...(warning && { warning }),
      },
    },
    mediaType: 'video',
    showAds: false,
  };
};
