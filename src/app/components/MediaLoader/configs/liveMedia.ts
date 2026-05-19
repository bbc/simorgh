import filterForBlockType from '#lib/utilities/blockHandlers';
import moment from 'moment';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import onClient from '#app/lib/utilities/onClient';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import type { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
  pageType,
  lang,
  defaultImage,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveMediaBlock } = filterForBlockType(blocks, 'liveMedia');
  let warning: string | null = null;
  const {
    imageUrlTemplate: holdingImageURL,
    version: video,
    title,
    synopses: { short },
    masterbrand: { id },
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
    pageType === LIVE_TV_PAGE ? defaultImage : holdingImageURL;

  const holdingImageURLForLiveTV = getPlaceholderURL();

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: shouldAutoplay,
      supportFakeFullscreen: true,
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
      // Currently no simple way to determine from the data wether to load the plugin, as a Dazzler stream can't be distinguished from media collection items in TIPO.
      plugins: {
        toLoad: [
          {
            html: 'https://static.files.bbci.co.uk/dazzler-edge-plugin/v1_0_1/DazzlerEdgePlugin.min.js',
            playerOnly: true,
            // @ts-expect-error - this is a custom property used to pass data to the plugin when it initializes
            data: {
              env: getEnvConfig().SIMORGH_APP_ENV === 'live' ? 'live' : 'test',
              sid: id,
              holdingImageURL: holdingImageURLForLiveTV,
              uiLanguage: lang,
            },
          },
        ],
      },
    },
    mediaType: 'video',
    showAds: false,
  };
};
