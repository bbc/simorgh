import convertInclude, { encodeHTML } from '.';

export const vjMarkup = `<div>Visual Jounalism Markup</div><script type="text/javascript" src="localhost/vj.js"></script>`;

export const idt2Markup = `<div>IDT 2 Markup</div><script type="text/javascript" src="localhost/idt2.js"></script>`;

describe('convertInclude', () => {
  afterEach(() => {
    fetch.resetMocks();
  });
  it('should fetch and convert an include block to an idt2 block', async () => {
    fetch.mockResponse(() => Promise.resolve(idt2Markup));
    const input = {
      required: false,
      tile: 'IDT2 Include',
      href: '/idt2/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt2.html',
    };
    const expected = {
      type: 'idt2',
      model: {
        href: 'https://bbc.com/idt2.html',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'include',
        html: encodeHTML(idt2Markup),
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });
  it('should fetch and convert an idt2 block when fetch response returns with a status other than 200', async () => {
    fetch.mockResponse(() => Promise.resolve({ status: 304 }));
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt2/111-222-333-444-556',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt40.html',
    };
    const expected = {
      type: 'idt2',
      model: {
        href: 'https://bbc.com/idt40.html',
        html: null,
        platform: 'highweb',
        required: false,
        tile: 'A random include',
        type: 'include',
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });
  it('should fetch and convert a Visual Journalism include block to type include', async () => {
    fetch.mockResponse(() => Promise.resolve(vjMarkup));
    const input = {
      required: false,
      tile: 'Include from VisJo',
      href: '/include/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/vj.html',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'https://bbc.com/vj.html',
        required: false,
        tile: 'Include from VisJo',
        platform: 'highweb',
        type: 'include',
        html: encodeHTML(vjMarkup),
      },
    };
    expect(await convertInclude(input)).toEqual(expected);
    expect(fetch).toHaveBeenCalled();
  });
  it('should return null for an unsupported include type', async () => {
    fetch.mockResponse(() => Promise.resolve('nothing to see here'));
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt20/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt20.html',
    };
    expect(await convertInclude(input)).toEqual(null);
    expect(fetch).not.toHaveBeenCalled();
  });
});
