import convertInclude from '.';

const vjMarkup = {
  plain: `<div>Visual Jounalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`,
  encoded: `&lt;div&gt;Visual Jounalism Markup&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;localhost/vj.js&quot;&gt;&lt;/script&gt;`,
};

const idt2Markup = {
  plain: `<div>IDT 2 Markup</div><script type="text/javascript" src="localhost/idt2.js"></script>`,
  encoded: `&lt;div&gt;IDT 2 Markup&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;localhost/idt2.js&quot;&gt;&lt;/script&gt;`,
};

const idt1Markup = {
  plain: `<div>IDT 1 Markup</div><script type="text/javascript" src="localhost/idt1.js"></script>`,
  encoded: `&lt;div&gt;IDT 1 Markup&lt;/div&gt;&lt;script type=&quot;text/javascript&quot; src=&quot;localhost/idt1.js&quot;&gt;&lt;/script&gt;`,
};

describe('convertInclude', () => {
  afterEach(() => {
    fetch.resetMocks();
  });

  it('should fetch and convert an include block to an idt1 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt1Markup.plain));
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
        html: idt1Markup.encoded,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });

  it('should fetch and convert an include block to an idt2 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup.plain));
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
        html: idt2Markup.encoded,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });

  it('should fetch and convert an include block to a vj block', async () => {
    fetch.mockResponse(() => Promise.resolve(vjMarkup.plain));
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
        html: vjMarkup.encoded,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });

  it('should convert an include block to an idt1 block with no leading / in href', async () => {
    fetch.mockResponse(() => Promise.resolve(idt1Markup.plain));
    const input = {
      required: false,
      tile: 'A quiz!',
      href: 'indepthtoolkit',
      platform: 'highweb',
      type: 'include',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'indepthtoolkit',
        required: false,
        tile: 'A quiz!',
        platform: 'highweb',
        type: 'idt1',
        html: idt1Markup.encoded,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });

  it('should convert an include block to an idt2 block with no / in href', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup.plain));
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
        html: idt2Markup.encoded,
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });

  it('should convert an include block to an idt2 block with html set to null when fetch returns with status other than 200', async () => {
    jest.mock('#lib/logger.web', () => jest.fn());
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
    expect(fetch).toHaveBeenCalled();
  });

  it('should return null for an unsupported include type', async () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    expect(await convertInclude(input)).toEqual(null);
  });

  it('should return null for an unsupported include type with no leading / in href', async () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: 'idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
    };
    expect(await convertInclude(input)).toEqual(null);
  });

  it('should return null for null/undefined href', async () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: null,
      platform: 'highweb',
      type: 'include',
    };
    expect(await convertInclude(input)).toEqual(null);
  });
});
