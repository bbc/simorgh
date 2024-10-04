import moment from 'moment-timezone';
import formatDuration from '#app/lib/utilities/formatDuration';
import { Translations } from '#app/models/types/translations';
import { getPlaceholderSrcSet } from '#app/lib/utilities/srcSet';
import { MediaType } from '#app/models/types/media';
import { PlaceholderConfig } from '../../types';

type BuildPlaceholderConfigParams = {
  title: string;
  holdingImageURL: string;
  type: MediaType;
  duration?: number;
  durationISO8601?: string;
  placeholderImageOriginCode?: string;
  placeholderImageLocator?: string;
  translations?: Translations;
  guidanceMessage?: string | null;
};

export default ({
  title,
  duration,
  durationISO8601,
  holdingImageURL,
  placeholderImageOriginCode,
  placeholderImageLocator,
  translations,
  guidanceMessage,
  type,
}: BuildPlaceholderConfigParams): PlaceholderConfig => {
  const momentDuration = moment.duration(duration, 'seconds');

  const durationTranslation = translations?.media?.duration || 'Duration';

  const translatedNoJSMessage =
    translations?.media?.noJs ||
    `This ${type} cannot play in your browser. Please enable JavaScript or try a different browser.`;

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
      guidanceMessage,
      type,
    },
  };
};
