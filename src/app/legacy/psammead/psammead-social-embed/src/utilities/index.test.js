import {
  getProviderName,
  getCaptionText,
  detokenise,
  dictionaryFactory,
} from './index';

describe('getProviderName', () => {
  it('transforms the given provider correctly', () => {
    expect(getProviderName('unknown')).toEqual(undefined);
    expect(getProviderName('youtube')).toEqual('YouTube');
    expect(getProviderName('')).toEqual(undefined);
  });

  it('throws given invalid arguments', () => {
    expect(() => getProviderName()).toThrow();
    expect(() => getProviderName(9001)).toThrow();
  });
});

describe('detokenise', () => {
  it('detokenises the given text correctly', () => {
    expect(detokenise('Foo %token%', { '%token%': 'Bar' })).toEqual('Foo Bar');
    expect(detokenise('Foo %token%', {})).toEqual('Foo %token%');
  });

  it('returns null given invalid arguments', () => {
    expect(detokenise()).toBeNull();
    expect(detokenise('Foo')).toBeNull();
  });
});

describe('dictionaryFactory', () => {
  it('creates a valid dictionary', () => {
    expect(dictionaryFactory({ provider: 'youtube' })).toEqual({
      '%provider_name%': 'YouTube',
      '%provider%': 'youtube',
    });

    expect(dictionaryFactory({ provider: 'unknown' })).toEqual({
      '%provider_name%': 'unknown',
      '%provider%': 'unknown',
    });
  });
});

describe('getCaptionText', () => {
  it('returns caption text for a CPS page', () => {
    const cpsCaption = {
      textPrefixVisuallyHidden: 'Título del video, ',
      text: 'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
    };

    expect(
      getCaptionText({
        pageType: 'STY',
        caption: cpsCaption,
        provider: 'youtube',
      }),
    ).toEqual(cpsCaption);
  });

  it('returns caption text for an Article page', () => {
    const articleCaption = {
      textPrefixVisuallyHidden: 'Título del video, ',
      text: 'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
      articleText:
        'Advertencia: La BBC no se hace responsable por el contenido de sitios externos.',
      articleAdditionalText:
        'Este contenido de %provider_name% puede contener publicidad.',
    };

    expect(
      getCaptionText({
        pageType: 'article',
        caption: articleCaption,
        provider: 'youtube',
      }),
    ).toEqual({
      textPrefixVisuallyHidden: 'Título del video, ',
      additionalText: 'Este contenido de YouTube puede contener publicidad.',
      text: 'Advertencia: La BBC no se hace responsable por el contenido de sitios externos.',
    });
  });

  it('returns null if no caption object is given', () => {
    expect(
      getCaptionText({ pageType: 'article', provider: 'youtube' }),
    ).toBeNull();
  });
});
