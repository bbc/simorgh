import vjIncludeClassifier from './vjIncludeClassifier';

const vjIncludeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
const vjIncludeNotSupportingAmp =
  '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png';

const canonicalPathname = 'https://www.bbc.com/service/foo';
const ampPathname = 'https://www.bbc.com/service/foo.amp';

describe('VJ Include Classifier', () => {
  it('should classify VJ include supporting AMP on Amp platform', () => {
    const expected = 'vj-include-supports-amp';

    const actual = vjIncludeClassifier({
      href: vjIncludeSupportingAmp,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include not supporting AMP on Amp platform', () => {
    const expected = 'vj-include-not-supporting-amp';

    const actual = vjIncludeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include supporting AMP on canonical platform', () => {
    const expected = 'vj-include-canonical';

    const actual = vjIncludeClassifier({
      href: vjIncludeSupportingAmp,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include not supporting AMP on canonical platform', () => {
    const expected = 'vj-include-canonical';

    const actual = vjIncludeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });
});
