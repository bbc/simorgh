import { ampSrcBuilder, ampSupported } from './ampSrcBuilder';

const includeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
const includeNotSupportingAmp =
  '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png';

describe('Amp Src Builder', () => {
  it('should return a url with amp inserted between the url path and query parameters', () => {
    const actual = ampSrcBuilder(includeSupportingAmp);
    expect(actual).toEqual(
      'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
    );
  });
});

describe('Amp supported include', () => {
  it('should return true if AMP is supported', () => {
    const actual = ampSupported(includeSupportingAmp);
    expect(actual).toEqual(true);
  });
  it('should return false if AMP is not supported', () => {
    const actual = ampSupported(includeNotSupportingAmp);
    expect(actual).toEqual(false);
  });
});
