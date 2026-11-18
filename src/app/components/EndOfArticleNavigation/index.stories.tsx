import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import ThemeProvider from '#app/components/ThemeProvider';
import ThemeProviderSCSSModules from '#app/components/ThemeProviderSCSSModules';
import EndOfArticleNavigation, {
  MOST_READ_TARGET,
  PORTRAIT_VIDEO_TARGET,
  RELATED_CONTENT_TARGET,
  TOPIC_DISCOVERY_TARGET,
} from '.';
import type { ArticleEndDestination } from './types';
import readme from './README.md';
import metadata from './metadata.json';
import styles from './index.stories.module.scss';

const availableSections: ArticleEndDestination[] = [
  {
    id: TOPIC_DISCOVERY_TARGET,
    label: 'Explorar estos temas',
    description: 'Encuentra otras historias sobre los temas de este artículo.',
    requiresJs: true,
  },
  {
    id: PORTRAIT_VIDEO_TARGET,
    label: 'Ver videos',
    description: 'Descubre más historias en video.',
    requiresJs: true,
    hideInOperaMini: true,
  },
  {
    id: RELATED_CONTENT_TARGET,
    label: 'Ver contenido relacionado',
    description: 'Encuentra más contexto y otras noticias relacionadas.',
  },
  {
    id: MOST_READ_TARGET,
    label: 'Ver lo más leído',
    description: 'Descubre las historias que más leen otros lectores.',
  },
];

const Example = ({
  destinations,
}: {
  destinations: ArticleEndDestination[];
}) => (
  <RequestContextProvider
    service="mundo"
    pageType="article"
    pathname="/mundo/articles/cje39lr0v1w7o?renderer_env=live"
  >
    <ServiceContextProvider service="mundo">
      <ThemeProviderSCSSModules service="mundo">
        <ThemeProvider service="mundo">
          <div className={styles.wrapper}>
            <Paragraph size="pica" className={styles.articleEnding}>
              Este es el último párrafo del artículo de ejemplo.
            </Paragraph>
            <EndOfArticleNavigation destinations={destinations} />
            {destinations.map(destination => (
              <section
                key={destination.id}
                className={styles.destinationSection}
                aria-labelledby={destination.id}
              >
                <Heading
                  level={2}
                  id={destination.id}
                  tabIndex={-1}
                  className={styles.destinationHeading}
                >
                  {destination.label}
                </Heading>
                <Paragraph size="pica" className={styles.destinationCopy}>
                  {destination.description}
                </Paragraph>
                <a href="https://www.bbc.com/mundo">
                  Ver noticias de BBC Mundo
                </a>
              </section>
            ))}
          </div>
        </ThemeProvider>
      </ThemeProviderSCSSModules>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export const AllAvailableSections = {
  render: () => <Example destinations={availableSections} />,
};

export const HomepageFallback = {
  render: () => (
    <Example
      destinations={availableSections.filter(
        destination => destination.id === MOST_READ_TARGET,
      )}
    />
  ),
};

export const HomepageOnly = {
  render: () => <Example destinations={[]} />,
};

export default {
  title: 'Components/EndOfArticleNavigation',
  component: EndOfArticleNavigation,
  parameters: {
    docs: { readme },
    metadata,
    chromatic: { disableSnapshot: true },
  },
};
