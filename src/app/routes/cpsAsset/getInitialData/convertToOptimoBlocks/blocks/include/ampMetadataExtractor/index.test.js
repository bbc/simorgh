import loggerMock from '#testHelpers/loggerMock';

import { INCLUDE_IFRAME_REQUEST_RECEIVED } from '#lib/logger.const';
import ampMetadataExtractor from '.';

const includeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';

describe('Amp Metadata Extractor', () => {
  const initialBaseAmpUrlEnv = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;
  beforeAll(() => {
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = 'https://news.files.bbci.co.uk';
  });

  afterAll(() => {
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = initialBaseAmpUrlEnv;
    loggerMock.info.mockClear();
  });

  it('should return image src, width, height and iframe src metadata for a supported classification', () => {
    const actual = ampMetadataExtractor(
      includeSupportingAmp,
      process.env.SIMORGH_INCLUDES_BASE_AMP_URL,
    );
    const expected = {
      imageWidth: '640',
      imageHeight: '360',
      image:
        'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      src: 'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    };
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(
      INCLUDE_IFRAME_REQUEST_RECEIVED,
      {
        url: 'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      },
    );
    expect(actual).toEqual(expected);
  });
});
