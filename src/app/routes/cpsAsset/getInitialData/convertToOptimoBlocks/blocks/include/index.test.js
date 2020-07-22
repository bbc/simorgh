import loggerMock from '#testHelpers/loggerMock'; // Must be imported before convertInclude

import convertInclude from '.';
import pageData from './fixtures';
import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_MISSING_URL,
  INCLUDE_REQUEST_RECEIVED,
  INCLUDE_UNSUPPORTED,
  INCLUDE_IFRAME_REQUEST_RECEIVED,
} from '#lib/logger.const';

const vjMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

const idt2Markup = `<div>IDT 2 Markup</div><script type="text/javascript" src="localhost/idt2.js"></script>`;

const idt1Markup = `<div>IDT 1 Markup</div><script type="text/javascript" src="localhost/idt1.js"></script>`;

const canonicalPathname = 'https://www.bbc.com/service/foo';

const ampPathname = 'https://www.bbc.com/service/foo.amp';

const [
  idt1Block,
  idt2Block,
  vjBlock,
  unsupportedIncludeBlock,
  noHrefIncludeBlock,
  vjAmpSupportedBlock,
  vjAmpNoSupportBlock,
] = pageData.content.blocks;

describe('convertInclude', () => {
  const initialIncludesBaseUrl = process.env.SIMORGH_INCLUDES_BASE_URL;
  const initialIncludesAmpBaseUrl = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;

  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL = 'https://foobar.com/includes';
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = 'https://news.files.bbci.co.uk';
  });

  afterEach(() => {
    fetch.resetMocks();
    loggerMock.error.mockClear();
    loggerMock.info.mockClear();
    process.env.SIMORGH_INCLUDES_BASE_URL = initialIncludesBaseUrl;
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = initialIncludesAmpBaseUrl;
  });

  it('should fetch and convert an include block to an idt1 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt1Markup));
    const input = idt1Block;
    const expected = {
      type: 'include',
      model: {
        href: '/indepthtoolkit/quizzes/123-456',
        index: 0,
        isAmpSupported: false,
        type: 'idt1',
        html: idt1Markup,
      },
    };
    expect(
      await convertInclude(input, pageData, null, canonicalPathname),
    ).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });

  it('should fetch and convert an include block to an idt2 block for a canonical request', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup));
    const input = idt2Block;
    const expected = {
      type: 'include',
      model: {
        href: '/idt2/111-222-333-444-555',
        index: 1,
        isAmpSupported: true,
        type: 'idt2',
        html: idt2Markup,
        imageBlock: {
          alt: 'image alt text',
          height: 1864,
          layout: 'responsive',
          src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/816',
          srcset:
            'https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w,https://foobar.com/includes/idt2/111-222-333-444-555/image/816 816w',
          width: 1632,
        },
      },
    };
    expect(
      await convertInclude(input, pageData, null, canonicalPathname),
    ).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/idt2/111-222-333-444-555/html',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/idt2/111-222-333-444-555/html',
    });
  });

  it('convert an include block to an idt2 block with an image block for an amp request', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup));
    const input = idt2Block;
    const expected = {
      type: 'include',
      model: {
        href: '/idt2/111-222-333-444-555',
        index: 1,
        isAmpSupported: true,
        type: 'idt2',
        imageBlock: {
          alt: 'image alt text',
          height: 1864,
          layout: 'responsive',
          src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/470',
          srcset:
            'https://foobar.com/includes/idt2/111-222-333-444-555/image/350 350w,https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w',
          width: 940,
        },
      },
    };
    expect(
      await convertInclude(input, pageData, null, '/news/1234568.amp'),
    ).toEqual(expected);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should fetch and convert an include block to a vj block', async () => {
    fetch.mockResponse(() => Promise.resolve(vjMarkup));
    const input = vjBlock;
    const expected = {
      type: 'include',
      model: {
        href: '/include/111-222-333-444-555',
        index: 2,
        isAmpSupported: true,
        type: 'vj',
        html: vjMarkup,
      },
    };
    expect(
      await convertInclude(input, pageData, null, canonicalPathname),
    ).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/include/111-222-333-444-555',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/include/111-222-333-444-555',
    });
  });

  it('should convert an include block to an idt2 block with html set to null when fetch returns with status other than 200', async () => {
    fetch.mockResponse(() => Promise.resolve({ status: 304 }));
    const input = idt2Block;
    const expected = {
      type: 'include',
      model: {
        href: '/idt2/111-222-333-444-555',
        index: 1,
        isAmpSupported: true,
        type: 'idt2',
        imageBlock: {
          alt: 'image alt text',
          height: 1864,
          layout: 'responsive',
          src: 'https://foobar.com/includes/idt2/111-222-333-444-555/image/816',
          srcset:
            'https://foobar.com/includes/idt2/111-222-333-444-555/image/470 470w,https://foobar.com/includes/idt2/111-222-333-444-555/image/816 816w',
          width: 1632,
        },
      },
    };
    expect(
      await convertInclude(input, pageData, null, canonicalPathname),
    ).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/idt2/111-222-333-444-555/html',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: `https://foobar.com/includes/idt2/111-222-333-444-555/html`,
    });
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toBeCalledWith(INCLUDE_FETCH_ERROR, {
      status: 304,
      url: 'https://foobar.com/includes/idt2/111-222-333-444-555/html',
    });
  });

  const propogateQueryTest = (summary, pathname, expectedUrlQuery) => {
    it(`should fetch and convert an include block with ${summary}`, async () => {
      fetch.mockResponse(() => Promise.resolve(idt1Markup));
      const input = idt1Block;
      const assetType = null;

      const expected = {
        type: 'include',
        model: {
          href: '/indepthtoolkit/quizzes/123-456',
          index: 0,
          isAmpSupported: false,
          type: 'idt1',
          html: idt1Markup,
        },
      };

      expect(
        await convertInclude(input, pageData, assetType, pathname),
      ).toEqual(expected);
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith(
        `https://foobar.com/includes/indepthtoolkit/quizzes/123-456${expectedUrlQuery}`,
        {
          timeout: 3000,
        },
      );
      expect(loggerMock.error).not.toHaveBeenCalled();
      expect(loggerMock.info).toHaveBeenCalledTimes(1);
      expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
        url: `https://foobar.com/includes/indepthtoolkit/quizzes/123-456${expectedUrlQuery}`,
      });
    });
  };

  propogateQueryTest(
    'with a propagated renderer_env=live',
    '/service/foobar?renderer_env=live',
    '?renderer_env=live',
  );

  propogateQueryTest(
    'with a propagated renderer_env=test',
    '/service/foobar?renderer_env=test',
    '?renderer_env=test',
  );

  propogateQueryTest(
    'without propagating an invalid renderer_env value',
    '/service/foobar?renderer_env=foo',
    '',
  );

  propogateQueryTest(
    'without propagating an invalid query parameter',
    '/service/foobar?foo=bar',
    '',
  );

  it('should return null for an unsupported include type', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const input = unsupportedIncludeBlock;
    expect(await convertInclude(input, null, null, canonicalPathname)).toEqual(
      null,
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toBeCalledWith(INCLUDE_UNSUPPORTED, {
      type: 'include',
      classification: 'not-supported',
      url: '/idt3/111-222-333-444-555',
    });
  });

  it('should return null for null/undefined href', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const input = noHrefIncludeBlock;
    const output = await convertInclude(input, null, null, canonicalPathname);
    expect(fetch).not.toHaveBeenCalled();
    expect(output).toEqual(null);
    expect(loggerMock.info).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_MISSING_URL, {
      required: false,
      tile: 'An include with no href',
      href: null,
      platform: 'highweb',
      type: 'include',
    });
  });

  it('should return null & log error when a fetch error', async () => {
    fetch.mockResponse(() => {
      throw new Error('this is an error message');
    });
    const input = idt1Block;
    const output = await convertInclude(
      input,
      pageData,
      null,
      canonicalPathname,
    );
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(output.model.html).toEqual(undefined);
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: `https://foobar.com/includes/indepthtoolkit/quizzes/123-456`,
    });
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_ERROR, {
      error: 'Error: this is an error message',
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });

  it('should return src if AMP is supported and include is a VJ on AMP', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const includeSupportingAmp =
      '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
    const input = vjAmpSupportedBlock;
    const expected = {
      type: 'include',
      model: {
        href: includeSupportingAmp,
        index: 5,
        isAmpSupported: true,
        type: 'vj',
        ampMetadata: {
          image:
            'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
          imageHeight: '360',
          imageWidth: '640',
          src:
            'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
        },
      },
    };
    const actual = await convertInclude(input, pageData, null, ampPathname);
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(
      INCLUDE_IFRAME_REQUEST_RECEIVED,
      {
        url:
          'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      },
    );
    expect(actual).toEqual(expected);
  });

  it('should return a supported VJ include on AMP with a propagated renderer_env parameter', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const includeSupportingAmp =
      '/include/newsspec/21841-green-diet/gahuza/app?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png';
    const input = vjAmpSupportedBlock;
    const ampPathnameWithRenderEnvParam =
      'https://www.bbc.com/service/foo.amp?renderer_env=test';
    const expected = {
      type: 'include',
      model: {
        href: includeSupportingAmp,
        index: 5,
        isAmpSupported: true,
        type: 'vj',
        ampMetadata: {
          image:
            'https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
          imageHeight: '360',
          imageWidth: '640',
          src:
            'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
        },
      },
    };
    const actual = await convertInclude(
      input,
      pageData,
      null,
      ampPathnameWithRenderEnvParam,
    );
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(
      INCLUDE_IFRAME_REQUEST_RECEIVED,
      {
        url:
          'https://news.files.bbci.co.uk/include/newsspec/21841-green-diet/gahuza/app/amp?responsive=true&newsapps=true&app-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png&app-clickable=true&amp-clickable=true&amp-image-height=360&amp-image-width=640&amp-image=https://news.files.bbci.co.uk/vj/live/idt-images/image-slider-asdf/app_launcher_ws_640_7ania.png',
      },
    );
    expect(actual).toEqual(expected);
  });

  it('should return no include if AMP not supported for VJ include on AMP', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const notSupportedVjIncludeOnAmp =
      '/news/special/2016/newsspec_14813/content/iframe/gahuza/us-gop.inc?responsive=true&app-clickable=true&app-image=http://a.files.bbci.co.uk/worldservice/live/assets/images/2016/11/09/161109092836_us_election_2nddaymaps_winner_ws_62_v3.png';
    const input = vjAmpNoSupportBlock;
    const actual = await convertInclude(input, pageData, null, ampPathname);
    const expected = {
      type: 'include',
      model: {
        href: notSupportedVjIncludeOnAmp,
        index: 6,
        isAmpSupported: false,
        type: 'vj',
      },
    };
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(0);
    expect(actual).toEqual(expected);
  });
});
