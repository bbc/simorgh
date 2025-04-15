import filterForBlockType from '#lib/utilities/blockHandlers';
import moment from 'moment';
import { ConfigBuilderProps, ConfigBuilderReturnProps } from '../types';

export default ({
  blocks,
  basePlayerConfig,
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

  return {
    playerConfig: {
      ...basePlayerConfig,
      autoplay: false,
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
