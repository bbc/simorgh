import convertInclude from '.';

describe('convertInclude', () => {
  it('should convert an include block to an idt1 block', () => {
    const input = {
      required: false,
      tile: 'A quiz!',
      href:
        '/indepthtoolkit/quizzes/sistema_solar_Quiz_Mundo/syndicated?app-clickable=true&app-image=http%3A%2F%2Fnews.files.bbci.co.uk%2Fvj%2Flive%2Fidt-images%2Fquizzes-quiz_cta%2Fstart_geh2q.png',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt1.html',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'https://bbc.com/idt1.html',
        required: false,
        tile: 'A quiz!',
        platform: 'highweb',
        type: 'idt1',
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });

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
      type: 'include',
      model: {
        href: 'https://bbc.com/idt2.html',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'idt2',
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });

  it('should convert an include block to a vj block', () => {
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
        type: 'vj',
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });

  it('should convert an include block to an idt1 block with no leading / in href', () => {
    const input = {
      required: false,
      tile: 'A quiz!',
      href:
        'indepthtoolkit/quizzes/sistema_solar_Quiz_Mundo/syndicated?app-clickable=true&app-image=http%3A%2F%2Fnews.files.bbci.co.uk%2Fvj%2Flive%2Fidt-images%2Fquizzes-quiz_cta%2Fstart_geh2q.png',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt1.html',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'https://bbc.com/idt1.html',
        required: false,
        tile: 'A quiz!',
        platform: 'highweb',
        type: 'idt1',
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });

  it('should convert an include block to an idt2 block with no / in href', () => {
    const input = {
      required: false,
      tile: 'IDT2 Include',
      href: 'idt2',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt2.html',
    };
    const expected = {
      type: 'include',
      model: {
        href: 'https://bbc.com/idt2.html',
        required: false,
        tile: 'IDT2 Include',
        platform: 'highweb',
        type: 'idt2',
      },
    };
    expect(convertInclude(input)).toEqual(expected);
  });

  it('should return null for an unsupported include type', () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: '/idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt20.html',
    };
    expect(convertInclude(input)).toEqual(null);
  });

  it('should return null for an unsupported include type with no leading / in href', () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: 'idt3/111-222-333-444-555',
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt20.html',
    };
    expect(convertInclude(input)).toEqual(null);
  });

  it('should return null for null/undefined href', () => {
    const input = {
      required: false,
      tile: 'A random include',
      href: null,
      platform: 'highweb',
      type: 'include',
      url: 'https://bbc.com/idt20.html',
    };
    expect(convertInclude(input)).toEqual(null);
  });
});
