import React from 'react';
import { render } from '../../react-testing-library-with-providers';
import ScriptLink from '.';

const enabledToggleState = {
  scriptLink: {
    enabled: true,
  },
  variantCookie: {
    enabled: true,
  },
};

describe(`Script Link`, () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { container } = render(<ScriptLink />, {
      toggles: enabledToggleState,
      service: 'serbian',
      variant: 'lat',
      pathname: '/serbian/lat',
    });
    expect(container).toMatchSnapshot();
  });

  describe('assertions', () => {
    describe.each(['canonical', 'amp', 'lite'])('%s', platform => {
      it.each`
        service      | variant   | pageType             | path                                                                                 | variantPath
        ${'serbian'} | ${'lat'}  | ${'article'}         | ${'/serbian/articles/c805k05kr73o/lat'}                                              | ${'/serbian/articles/c805k05kr73o/cyr'}
        ${'serbian'} | ${'lat'}  | ${'cpsAssetPage'}    | ${'/serbian/lat/srbija-46748932'}                                                    | ${'/serbian/cyr/srbija-46748932'}
        ${'serbian'} | ${'lat'}  | ${'errorPage'}       | ${'/serbian/404/lat'}                                                                | ${'/serbian/404/cyr'}
        ${'serbian'} | ${'lat'}  | ${'homePage'}        | ${'/serbian/lat'}                                                                    | ${'/serbian/cyr'}
        ${'serbian'} | ${'lat'}  | ${'topicPage'}       | ${'/serbian/lat/topics/c7zp707dy8yt'}                                                | ${'/serbian/cyr/topics/c7zp707dy8yt'}
        ${'serbian'} | ${'cyr'}  | ${'article'}         | ${'/serbian/articles/c805k05kr73o/cyr'}                                              | ${'/serbian/articles/c805k05kr73o/lat'}
        ${'serbian'} | ${'cyr'}  | ${'cpsAssetPage'}    | ${'/serbian/cyr/srbija-46748932'}                                                    | ${'/serbian/lat/srbija-46748932'}
        ${'serbian'} | ${'cyr'}  | ${'errorPage'}       | ${'/serbian/404/cyr'}                                                                | ${'/serbian/404/lat'}
        ${'serbian'} | ${'cyr'}  | ${'homePage'}        | ${'/serbian/cyr'}                                                                    | ${'/serbian/lat'}
        ${'serbian'} | ${'cyr'}  | ${'topicPage'}       | ${'/serbian/cyr/topics/c7zp707dy8yt'}                                                | ${'/serbian/lat/topics/c7zp707dy8yt'}
        ${'ukchina'} | ${'trad'} | ${'legacyAssetPage'} | ${'/ukchina/trad/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs'} | ${'/ukchina/simp/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs'}
        ${'ukchina'} | ${'simp'} | ${'legacyAssetPage'} | ${'/ukchina/simp/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs'} | ${'/ukchina/trad/multimedia/2015/11/151120_video_100w_london_chinese_entrepreneurs'}
      `(
        'Script Link should contain link to other variant when on $service $variant $pageType',
        ({ service, variant, path, variantPath }) => {
          const isAmp = platform === 'amp';
          const isLite = platform === 'lite';

          let pathToUse = path;

          if (isAmp) pathToUse = `${path}.amp`;
          if (isLite) pathToUse = `${path}.lite`;

          const { container } = render(<ScriptLink />, {
            toggles: enabledToggleState,
            service,
            variant,
            pathname: pathToUse,
            isAmp,
          });

          const scriptLink = container.querySelector(`a[data-variant]`);

          expect(scriptLink?.getAttribute('href')).toBe(variantPath);
        },
      );
    });
  });

  it('should not render when scriptLink toggle is off', () => {
    const disabledToggleState = {
      scriptLink: {
        enabled: false,
      },
      variantCookie: {
        enabled: false,
      },
    };

    const { container } = render(<ScriptLink />, {
      toggles: disabledToggleState,
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('should not render when an alternate variant is not defined', () => {
    const { container } = render(<ScriptLink />, {
      toggles: enabledToggleState,
      service: 'pidgin',
      pathname: '/pidgin',
    });

    expect(container).toBeEmptyDOMElement();
  });

  it('should not render if pathname is not defined', () => {
    const { container } = render(<ScriptLink />, {
      toggles: enabledToggleState,
      service: 'serbian',
      pathname: '',
    });

    expect(container).toBeEmptyDOMElement();
  });
});
