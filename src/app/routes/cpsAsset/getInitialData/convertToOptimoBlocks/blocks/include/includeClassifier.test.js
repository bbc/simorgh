import includeClassifier from './includeClassifier';

const vjIncludeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
const vjIncludeNotSupportingAmp =
  '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png';
const idt1Include = 'indepthtoolkit/quizzes/123-456';
const idt2Include = 'idt2/111-222-333-444-555';

const canonicalPathname = 'https://www.bbc.com/service/foo';
const ampPathname = 'https://www.bbc.com/service/foo.amp';

describe('Include Classifier', () => {
  it('should classifiy idt1 include as idt1 on canonical', () => {
    const expected = { includeType: 'idt1', classification: 'idt1-canonical' };

    const actual = includeClassifier({
      href: idt1Include,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classifiy idt1 include as idt1 on amp', () => {
    const expected = { includeType: 'idt1', classification: 'idt1-amp' };

    const actual = includeClassifier({
      href: idt1Include,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classifiy idt2 include as idt2 on canonical', () => {
    const expected = { includeType: 'idt2', classification: 'idt2-canonical' };

    const actual = includeClassifier({
      href: idt2Include,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classifiy idt2 include as idt2 on amp', () => {
    const expected = { includeType: 'idt2', classification: 'idt2-amp' };

    const actual = includeClassifier({
      href: idt2Include,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include supporting AMP on Amp platform', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-include-supports-amp',
    };

    const actual = includeClassifier({
      href: vjIncludeSupportingAmp,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include not supporting AMP on Amp platform', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-include-not-supporting-amp',
    };

    const actual = includeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include supporting AMP on canonical platform', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-include-canonical',
    };

    const actual = includeClassifier({
      href: vjIncludeSupportingAmp,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify VJ include not supporting AMP on canonical platform', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-include-canonical',
    };

    const actual = includeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify a non-supported include as not supported on canonical', () => {
    const expected = { includeType: null, classification: 'not-supported' };

    const actual = includeClassifier({
      href: 'idt3/blah',
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify a non-supported include as not supported on amp', () => {
    const expected = { includeType: null, classification: 'not-supported' };

    const actual = includeClassifier({
      href: 'idt3/blah',
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });
});
