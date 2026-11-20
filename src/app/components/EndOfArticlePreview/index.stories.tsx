import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import Paragraph from '#app/components/Paragraph';
import ThemeProvider from '#app/components/ThemeProvider';
import ThemeProviderSCSSModules from '#app/components/ThemeProviderSCSSModules';
import EndOfArticlePreview from '.';
import type { ArticleEndPreview } from './types';
import readme from './README.md';
import metadata from './metadata.json';
import styles from './index.stories.module.scss';

const illustrativePreview: ArticleEndPreview = {
  id: 'storybook-article-preview',
  title:
    'Ejemplo ilustrativo: una nueva perspectiva sobre la historia que acabas de leer',
  href: 'https://www.bbc.com/mundo',
  imageUrl: '/mundo/images/metadata/poster-1024x576.png',
  imageAlt: 'BBC News Mundo, imagen de ejemplo',
  paragraphs: [
    'Este texto es una muestra ficticia para revisar la presentación de las primeras líneas de otro artículo. No describe una noticia publicada.',
    'En la página real, este espacio contiene texto del artículo de destino. El lector puede empezar a conocer esa historia antes de decidir si quiere abrirla.',
  ],
  excerptSource: 'opening',
  readTime: 4,
  relationship: 'curated',
};

const Example = ({ preview }: { preview: ArticleEndPreview | null }) => (
  <RequestContextProvider
    service="mundo"
    pageType="article"
    pathname="/mundo/articles/cje39lr0v1w7o?renderer_env=live"
  >
    <ServiceContextProvider service="mundo">
      <ThemeProviderSCSSModules service="mundo">
        <ThemeProvider service="mundo">
          <div className={styles.wrapper}>
            <Paragraph size="pica" className={styles.storyNote}>
              Ejemplo de Storybook con contenido ilustrativo. El enlace abre la
              portada de BBC Mundo.
            </Paragraph>
            <EndOfArticlePreview preview={preview} />
          </div>
        </ThemeProvider>
      </ThemeProviderSCSSModules>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export const ArticlePreview = {
  render: () => <Example preview={illustrativePreview} />,
};

export const MissingImage = {
  render: () => (
    <Example
      preview={{
        ...illustrativePreview,
        imageUrl: undefined,
        imageAlt: undefined,
      }}
    />
  ),
};

export const UnavailableExcerpt = {
  render: () => (
    <Example
      preview={{
        ...illustrativePreview,
        paragraphs: [],
        excerptSource: 'unavailable',
      }}
    />
  ),
};

export const NoSelection = {
  render: () => <Example preview={null} />,
};

export default {
  title: 'Components/EndOfArticlePreview',
  component: EndOfArticlePreview,
  parameters: {
    docs: { readme },
    metadata,
    chromatic: { disableSnapshot: true },
  },
};
