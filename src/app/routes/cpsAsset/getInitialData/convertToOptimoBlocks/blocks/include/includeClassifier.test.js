import includeClassifier from './includeClassifier';

const vjIncludeSupportingAmp =
  '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
const vjIncludeNotSupportingAmp =
  '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png';
const idt1Include = '/indepthtoolkit/quizzes/123-456';
const idt2Include = '/idt2/111-222-333-444-555';

const canonicalPathname = 'https://www.bbc.com/service/foo';
const ampPathname = 'https://www.bbc.com/service/foo.amp';

describe('Include Classifier', () => {
  it.each`
    includeType | classification      | href
    ${`idt1`}   | ${`idt1-canonical`} | ${idt1Include}
    ${`idt2`}   | ${`idt2-canonical`} | ${idt2Include}
    ${`vj`}     | ${`vj-canonical`}   | ${vjIncludeSupportingAmp}
  `(
    'should classify $includeType as $classification on canonical',
    ({ includeType, classification, href }) => {
      const expected = {
        includeType,
        classification,
      };

      const actual = includeClassifier({
        href,
        pathname: canonicalPathname,
      });

      expect(actual).toEqual(expected);
    },
  );

  it('should classify VJ include not supporting AMP on canonical platform', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-canonical',
    };

    const actual = includeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it.each`
    includeType | classification            | href
    ${`idt1`}   | ${`idt1-amp`}             | ${idt1Include}
    ${`idt2`}   | ${`idt2-amp`}             | ${idt2Include}
    ${`vj`}     | ${`vj-supports-amp`}      | ${vjIncludeSupportingAmp}
    ${`vj`}     | ${`vj-amp-not-supported`} | ${vjIncludeNotSupportingAmp}
  `(
    'should classify $includeType as $classification on amp',
    ({ includeType, classification, href }) => {
      const expected = {
        includeType,
        classification,
      };

      const actual = includeClassifier({
        href,
        pathname: ampPathname,
      });

      expect(actual).toEqual(expected);
    },
  );

  it('should classify a vj include not supporting amp as not-supported on amp', () => {
    const expected = {
      includeType: 'vj',
      classification: 'vj-amp-not-supported',
    };

    const actual = includeClassifier({
      href: vjIncludeNotSupportingAmp,
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify a non-supported include as not supported on canonical', () => {
    const expected = {
      includeType: null,
      classification: 'not-supported',
    };

    const actual = includeClassifier({
      href: 'idt3/blah',
      pathname: canonicalPathname,
    });

    expect(actual).toEqual(expected);
  });

  it('should classify a non-supported include as not supported on amp', () => {
    const expected = {
      includeType: null,
      classification: 'not-supported',
    };

    const actual = includeClassifier({
      href: 'idt3/blah',
      pathname: ampPathname,
    });

    expect(actual).toEqual(expected);
  });

  it.each`
    includeType | classification      | href
    ${`idt1`}   | ${`idt1-canonical`} | ${`indepthtoolkit/quizzes/123-456`}
    ${`idt2`}   | ${`idt2-canonical`} | ${`idt2/111-222-333-444-555`}
    ${`vj`}     | ${`vj-canonical`}   | ${`include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png`}
  `(
    'should classify a supported $includeType without a leading / in href on canonical',
    ({ includeType, classification, href }) => {
      const expected = {
        includeType,
        classification,
      };

      const actual = includeClassifier({
        href,
        pathname: canonicalPathname,
      });

      expect(actual).toEqual(expected);
    },
  );

  it.each`
    includeType | classification       | href
    ${`idt1`}   | ${`idt1-amp`}        | ${`indepthtoolkit/quizzes/123-456`}
    ${`idt2`}   | ${`idt2-amp`}        | ${`idt2/111-222-333-444-555`}
    ${`vj`}     | ${`vj-supports-amp`} | ${`include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png`}
  `(
    'should classify a supported $includeType without a leading / in href on amp',
    ({ includeType, classification, href }) => {
      const expected = {
        includeType,
        classification,
      };

      const actual = includeClassifier({
        href,
        pathname: ampPathname,
      });

      expect(actual).toEqual(expected);
    },
  );
});
