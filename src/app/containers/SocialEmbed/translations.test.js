import createTranslations from './translations';

describe('SocialEmbedContainer – createTranslations', () => {
  const translations = {
    socialEmbed: {
      caption: {
        textPrefixVisuallyHidden: 'Título del video: ',
        text:
          'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
      },
      fallback: {
        text: 'Contenido no disponible',
        linkText: 'Ver más en %provider_name%',
        linkTextSuffixVisuallyHidden: ', externo',
        warningText:
          'La BBC no se hace responsable del contenido de sitios externos.',
      },
      skipLink: {
        text: 'Saltar contenido de %provider_name%',
        endTextVisuallyHidden: 'Fin del contenido de %provider_name%',
      },
    },
  };

  it('should create a translations object', () => {
    expect(createTranslations({ translations, index: 1 })).toEqual({
      caption: {
        textPrefixVisuallyHidden: 'Título del video: ',
        text:
          'Advertencia: El contenido de sitios externos y terceras partes puede contener publicidad',
      },
      fallback: {
        text: 'Contenido no disponible',
        linkText: 'Ver más en %provider_name%',
        linkTextSuffixVisuallyHidden: ', externo',
        warningText:
          'La BBC no se hace responsable del contenido de sitios externos.',
      },
      skipLink: {
        text: 'Saltar contenido de %provider_name%, 1',
        endTextVisuallyHidden: 'Fin del contenido de %provider_name%, 1',
      },
    });
  });

  it('should create a translations object with default translations when no translations are provided', () => {
    expect(createTranslations({ translations: {}, index: 2 })).toEqual({
      caption: {
        text: 'Warning: Third party content may contain adverts',
        textPrefixVisuallyHidden: 'Video caption, ',
      },
      fallback: {
        linkText: 'View content on %provider_name%',
        linkTextSuffixVisuallyHidden: ', external',
        text: "Sorry but we're having trouble displaying this content",
        warningText: null,
      },
      skipLink: {
        endTextVisuallyHidden: 'End of %provider_name% content, 2',
        text: 'Skip %provider_name% content, 2',
      },
    });
  });
});
