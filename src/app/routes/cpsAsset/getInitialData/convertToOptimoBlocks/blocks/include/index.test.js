import loggerMock from '#testHelpers/loggerMock'; // Must be imported before convertInclude

import convertInclude from '.';
import {
  INCLUDE_ERROR,
  INCLUDE_FETCH_ERROR,
  INCLUDE_MISSING_URL,
  INCLUDE_REQUEST_RECEIVED,
  INCLUDE_UNSUPPORTED,
} from '#lib/logger.const';

const vjMarkup = `<div>Visual Journalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

const idt2Markup = `<div>IDT 2 Markup</div><script type="text/javascript" src="localhost/idt2.js"></script>`;

const idt1Markup = `<div>IDT 1 Markup</div><script type="text/javascript" src="localhost/idt1.js"></script>`;

describe('convertInclude', () => {
  const includesBaseUrl = 'https://foobar.com/includes';
  process.env.SIMORGH_INCLUDES_BASE_URL = includesBaseUrl;
  afterEach(() => {
    fetch.resetMocks();
    loggerMock.error.mockClear();
    loggerMock.info.mockClear();
  });

  it('should fetch and convert an include block to an idt1 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt1Markup));
    const input = {
      required: false,
      tile: 'A quiz!',
      href: '/indepthtoolkit/quizzes/123-456',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: '/indepthtoolkit/quizzes/123-456',
        required: false,
        tile: 'A quiz!',
        platform: 'highweb',
        type: 'idt1',
        html: idt1Markup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
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

  it('should fetch and convert an include block to an idt2 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup));
    const input = {
      required: false,
      tile: 'IDT2 Include',
      href: '/idt2/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: '/idt2/111-222-333-444-555',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'idt2',
        html: idt2Markup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
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

  it('should fetch and convert an include block to a vj block', async () => {
    fetch.mockResponse(() => Promise.resolve(vjMarkup));
    const input = {
      required: false,
      tile: 'Include from VisJo',
      href: '/include/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: '/include/111-222-333-444-555',
        required: false,
        tile: 'Include from VisJo',
        platform: 'highweb',
        type: 'vj',
        html: vjMarkup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
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

  it('should convert an include block to an idt1 block with no leading / in href', async () => {
    fetch.mockResponse(() => Promise.resolve(idt1Markup));
    const input = {
      required: false,
      tile: 'A quiz!',
      href: 'indepthtoolkit/quizzes/123-456',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'indepthtoolkit/quizzes/123-456',
        required: false,
        tile: 'A quiz!',
        platform: 'highweb',
        type: 'idt1',
        html: idt1Markup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
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

  it('should convert an include block to an idt2 block with no / in href', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup));
    const input = {
      required: false,
      tile: 'IDT2 Include',
      href: 'idt2/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'idt2/111-222-333-444-555',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'idt2',
        html: idt2Markup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
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

  it('should fetch and convert an include block to a vj block with no / in href', async () => {
    fetch.mockResponse(() => Promise.resolve(vjMarkup));
    const input = {
      required: false,
      tile: 'Include from VisJo',
      href: 'news/special/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'news/special/111-222-333-444-555',
        required: false,
        tile: 'Include from VisJo',
        platform: 'highweb',
        type: 'vj',
        html: vjMarkup,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/news/special/111-222-333-444-555',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toHaveBeenCalledWith(INCLUDE_REQUEST_RECEIVED, {
      url: 'https://foobar.com/includes/news/special/111-222-333-444-555',
    });
  });

  it('should convert an include block to an idt2 block with html set to null when fetch returns with status other than 200', async () => {
    fetch.mockResponse(() => Promise.resolve({ status: 304 }));
    const input = {
      required: false,
      tile: 'IDT2 Include',
      href: 'idt2',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'idt2',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'idt2',
        html: null,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      'https://foobar.com/includes/idt2/html',
      {
        timeout: 3000,
      },
    );
    expect(loggerMock.info).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toBeCalledWith(INCLUDE_FETCH_ERROR, {
      status: 304,
      url: 'https://foobar.com/includes/idt2/html',
    });
  });

  const propogateQueryTest = (summary, pathname, expectedUrlQuery) => {
    it(`should fetch and convert an include block with ${summary}`, async () => {
      fetch.mockResponse(() => Promise.resolve(idt1Markup));
      const input = {
        required: false,
        tile: 'A quiz!',
        href: '/indepthtoolkit/quizzes/123-456',
        platform: 'highweb',
        type: 'include',
      };
      const json = null;
      const assetType = null;

      const expected = {
        type: 'include',
        model: {
          href: '/indepthtoolkit/quizzes/123-456',
          required: false,
          tile: 'A quiz!',
          platform: 'highweb',
          type: 'idt1',
          html: idt1Markup,
        },
      };

      expect(await convertInclude(input, json, assetType, pathname)).toEqual(
        expected,
      );
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
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    expect(await convertInclude(input)).toEqual(null);
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toBeCalledWith(INCLUDE_UNSUPPORTED, {
      type: 'include',
      url: '/idt3/111-222-333-444-555',
    });
  });

  it('should return null for an unsupported include type with no leading / in href', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const input = {
      required: false,
      tile: 'A random include',
      href: 'idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    expect(await convertInclude(input)).toEqual(null);
    expect(fetch).not.toHaveBeenCalled();
    expect(loggerMock.error).not.toHaveBeenCalled();
    expect(loggerMock.info).toHaveBeenCalledTimes(1);
    expect(loggerMock.info).toBeCalledWith(INCLUDE_UNSUPPORTED, {
      type: 'include',
      url: 'idt3/111-222-333-444-555',
    });
  });

  it('should return null for null/undefined href', async () => {
    fetch.mockResponse(() => Promise.resolve('No fetch call'));
    const input = {
      required: false,
      tile: 'An include with no href',
      href: null,
      platform: 'highweb',
      type: 'include',
    };
    const output = await convertInclude(input);
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
    const input = {
      required: false,
      tile: 'A quiz!',
      href: '/indepthtoolkit/quizzes/123-456',
      platform: 'highweb',
      type: 'include',
    };
    const output = await convertInclude(input);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(output.model.html).toEqual(null);
    expect(loggerMock.info).not.toHaveBeenCalled();
    expect(loggerMock.error).toHaveBeenCalledTimes(1);
    expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_ERROR, {
      error: 'Error: this is an error message',
      url: 'https://foobar.com/includes/indepthtoolkit/quizzes/123-456',
    });
  });
});
