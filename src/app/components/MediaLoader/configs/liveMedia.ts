import filterForBlockType from '#lib/utilities/blockHandlers';
import moment from 'moment';
import { LIVE_TV_PAGE } from '#app/routes/utils/pageTypes';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
  pageType,
}: ConfigBuilderProps): ConfigBuilderReturnProps => {
  const { model: liveMediaBlock } = filterForBlockType(blocks, 'liveMedia');
  let warning = null;

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

  const isInternalReferrer = document.referrer.includes(
    window.location.hostname,
  );

  // Enable autoplay only on live TV pages when the user is coming to the page from an internal link
  const shouldAutoplay = pageType === LIVE_TV_PAGE && isInternalReferrer;

  console.log('Referrer:', document.referrer);
  console.log('Hostname:', window.location.hostname);

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
        holdingImageURL,
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
