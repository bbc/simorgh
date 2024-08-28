import moment from 'moment-timezone';
import formatDuration from '#app/lib/utilities/formatDuration';
import { Translations } from '#app/models/types/translations';
import { getPlaceholderSrcSet } from '#app/lib/utilities/srcSet';
import { PlaceholderConfig, MediaType } from '../../types';

type BuildPlaceholderConfigParams = {
  title: string;
  duration: number;
  holdingImageURL: string;
  placeholderImageOriginCode: string;
  placeholderImageLocator: string;
  type: MediaType;
  durationISO8601?: string;
  translations?: Translations;
};

export default ({
  title,
  duration,
  durationISO8601,
  holdingImageURL,
  placeholderImageOriginCode,
  placeholderImageLocator,
  translations,
  type,
}: BuildPlaceholderConfigParams): PlaceholderConfig => {
  const momentDuration = moment.duration(duration, 'seconds');

  const durationTranslation = translations?.media?.duration || 'Duration';

  const translatedNoJSMessage = `This ${type} cannot play in your browser. Please enable JavaScript or try a different browser.`;

  const placeholderSrcset = getPlaceholderSrcSet({
    originCode: placeholderImageOriginCode,
    locator: placeholderImageLocator,
    isWebP: true,
  });

  return {
    placeholderSrc: holdingImageURL,
    placeholderSrcset,
    translatedNoJSMessage,
    mediaInfo: {
      title,
      datetime: durationISO8601,
      duration: formatDuration({
        duration: momentDuration,
        padMinutes: true,
      }),
      durationSpoken: `${durationTranslation} ${formatDuration({ duration: momentDuration, separator: ',' })}`,
      type,
    },
  };
};
