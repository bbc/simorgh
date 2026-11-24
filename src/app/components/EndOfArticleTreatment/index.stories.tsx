import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import ThemeProviderSCSSModules from '#app/components/ThemeProviderSCSSModules';
import { ArticleEndPreview } from '#app/components/ArticlePreviewCard/types';
import EndOfArticleTreatment from '.';
import styles from './index.stories.module.scss';

const illustrativePreviews: ArticleEndPreview[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: `illustrative-preview-${index}`,
    title: `Ejemplo ilustrativo ${index + 1}: otra perspectiva sobre esta historia`,
    href: 'https://www.bbc.com/mundo',
    imageUrl: '/mundo/images/metadata/poster-1024x576.png',
    imageAlt: 'BBC News Mundo, imagen de ejemplo',
    paragraphs: [
      'Este texto ficticio permite revisar la presentación del adelanto. En las páginas reales se utiliza el comienzo del artículo seleccionado por la redacción.',
      'Puedes elegir otra lectura o abrir el artículo completo. Estos ejemplos de Storybook enlazan a la portada de BBC Mundo.',
    ],
    excerptSource: 'opening',
    readTime: 4,
    relationship: 'authored',
  }),
);

const Example = ({ previews }: { previews: ArticleEndPreview[] }) => (
  <RequestContextProvider
    service="mundo"
    pageType="article"
    pathname="/mundo/articles/cvg8w6ge2n2o?renderer_env=live"
  >
    <ServiceContextProvider service="mundo">
      <ThemeProviderSCSSModules service="mundo">
        <ThemeProvider service="mundo">
          <div className={styles.wrapper}>
            <EndOfArticleTreatment previews={previews} />
          </div>
        </ThemeProvider>
      </ThemeProviderSCSSModules>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export const FourArticles = {
  render: () => <Example previews={illustrativePreviews} />,
};
export const ThreeArticlesAndHomepage = {
  render: () => <Example previews={illustrativePreviews.slice(0, 3)} />,
};
export const TwoArticlesAndHomepage = {
  render: () => <Example previews={illustrativePreviews.slice(0, 2)} />,
};
export const OneArticleAndHomepage = {
  render: () => <Example previews={illustrativePreviews.slice(0, 1)} />,
};
export const HomepageFallback = { render: () => <Example previews={[]} /> };

export default {
  title: 'Components/EndOfArticleTreatment',
  component: EndOfArticleTreatment,
  parameters: { chromatic: { disableSnapshot: true } },
};
