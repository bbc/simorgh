import convertInclude from '.';

describe('convertInclude', () => {
  it('should convert an include block to an idt2 block', () => {
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
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });
  it('should convert a Visual Journalism include block to type include', () => {
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
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });
  it('should return null for an unsupported include type', () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt20/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt20.html',
    };
    expect(convertInclude(input)).toEqual(null);
  });
});
