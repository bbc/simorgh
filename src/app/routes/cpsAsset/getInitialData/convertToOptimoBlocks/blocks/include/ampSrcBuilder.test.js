import ampSrcBuilder from './ampSrcBuilder';

const includeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';

describe('Amp Src Builder', () => {
  beforeEach(() => {
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN =
      'https://news.files.bbci.co.uk';
  });

  afterEach(() => {
    delete process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN;
  });
  it('should return a url with amp inserted between the url path and query parameters', () => {
    const actual = ampSrcBuilder(includeSupportingAmp);
    expect(actual).toEqual(
      'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    );
  });
});
