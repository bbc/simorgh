import buildPlaceholderConfig from '.';
import { PlaceholderConfig } from '../../types';

describe('BuildPlaceholderConfig', () => {
  const title = 'Media Title';
  const duration = 100;
  const durationISO8601 = 'PT1M1S';
  const holdingImageURL = 'https://image-url.webp';
  const placeholderImageLocator = 'locator';
  const placeholderImageOriginCode = 'originCode';
  const type = 'video';

  it('generates a placeholder config with minimum config', () => {
    expect(
      buildPlaceholderConfig({
        title,
        duration,
        durationISO8601,
        type,
        holdingImageURL,
        placeholderImageLocator,
        placeholderImageOriginCode,
      }),
    ).toStrictEqual({
      mediaInfo: {
        title: 'Media Title',
        datetime: durationISO8601,
        duration: '01:40',
        durationSpoken: 'Duration 1,40',
        guidanceMessage: undefined,
        type: 'video',
      },
      placeholderSrc: holdingImageURL,
      placeholderSrcset:
        'https://ichef.bbci.co.uk/ace/ws/240/originCode/locator 240w, https://ichef.bbci.co.uk/ace/ws/320/originCode/locator 320w, https://ichef.bbci.co.uk/ace/ws/480/originCode/locator 480w, https://ichef.bbci.co.uk/ace/ws/624/originCode/locator 624w, https://ichef.bbci.co.uk/ace/ws/800/originCode/locator 800w',
      translatedNoJSMessage:
        'This video cannot play in your browser. Please enable JavaScript or try a different browser.',
    } satisfies PlaceholderConfig);
  });

  it('returns a duration with minutes padded', () => {
    const placeholderConfig = buildPlaceholderConfig({
      title,
      duration: 61,
      durationISO8601,
      type,
      holdingImageURL,
      placeholderImageLocator,
      placeholderImageOriginCode,
    });

    expect(placeholderConfig.mediaInfo.duration).toBe('01:01');
  });

  it('returns a translated spoken duration', () => {
    const placeholderConfig = buildPlaceholderConfig({
      title,
      duration,
      durationISO8601,
      type,
      holdingImageURL,
      placeholderImageLocator,
      placeholderImageOriginCode,
      translations: {
        // @ts-expect-error partial data required for testing purposes
        media: {
          duration: 'Translated_Duration',
        },
      },
    });

    expect(placeholderConfig.mediaInfo.durationSpoken).toBe(
      'Translated_Duration 1,40',
    );
  });

  it('uses media type in the translated No JS Message', () => {
    const placeholderConfig = buildPlaceholderConfig({
      title,
      duration,
      durationISO8601,
      type: 'audio',
      holdingImageURL,
      placeholderImageLocator,
      placeholderImageOriginCode,
    });

    expect(placeholderConfig.translatedNoJSMessage).toBe(
      'This audio cannot play in your browser. Please enable JavaScript or try a different browser.',
    );
  });
});
