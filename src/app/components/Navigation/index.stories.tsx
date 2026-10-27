import Navigation from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import type {
  Navigation as NavigationType,
  Services,
  PageTypes,
} from '#app/models/types/global';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { HOME_PAGE, ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '#storybook/helpers/ampDecorator';

const arabicNavItems = [
  {
    title: 'رئيسية',
    url: '/home',
    subItems: [
      { title: 'أخبار', url: '/home/section1' },
      { title: 'شاهد', url: '/home/section2' },
      { title: 'صحة وعلوم', url: '/home/section3' },
    ],
  },
  {
    title: 'شاهد',
    url: '/news',
  },
];

const pidginNavItems = [
  {
    title: 'News',
    url: '/home',
    subItems: [
      { title: 'Nigeria', url: '/home/section1' },
      { title: 'Africa', url: '/home/section2' },
      { title: 'World', url: '/home/section3' },
    ],
  },
  {
    title: 'Video',
    url: '/news',
  },
];

// Headline, byline, image and body paragraphs taken from the mundo article
// fixture used elsewhere in Storybook (see
// #data/mundo/articles/c206j730722o.json, also used in ArticlePage's
// stories), so the sticky navigation demo scrolls over realistic article
// content rather than placeholder text. The body paragraphs are repeated to
// make the article long enough to trigger the sticky navigation's
// scroll-activation point.
const mundoArticleParagraphs = [
  'Desde que Israel aumentó su ofensiva militar en el sur de Líbano, Naddine Ahmad, de 31 años, cada mañana les envía un mensaje a sus familiares en Beirut para saber si están con vida.',
  'Naddine, una analista de datos de Dearborn, una ciudad de 110.000 habitantes ubicada en el área metropolitana de Detroit, está molesta porque dice que "no es aceptable" el rol de Estados Unidos en Medio Oriente.',
  '"Es muy duro. Nuestro hogar está siendo destrozado con el dinero de nuestros impuestos", le dice a BBC Mundo, envuelta en una kufiya roja y blanca, en medio de una protesta que reclama que Israel detenga los bombardeos.',
  'Para los árabes estadounidenses, la guerra de Medio Oriente se siente cerca.',
  'A un año del ataque de Hamás a Israel y de la respuesta posterior contra Gaza y Líbano, en las vistosas casas del sur de Michigan ondean las banderas libanesas y en las cafeterías se ven carteles que anuncian el "esfuerzo consciente" para retirar los "productos sionistas" de la venta como una forma de protesta.',
  'La ciudad de Dearborn, en el histórico corredor industrial del país, concentra la mayor población de árabes estadounidenses, con el 54%, lo que la convierte en la primera ciudad de mayoría árabe del país, según datos del último censo.',
  'Michigan, con la comunidad libanesa más grande del país y la mayor concentración de votantes de origen árabe de Estados Unidos, es uno de los siete estados clave en las elecciones del 5 de noviembre.',
];

const mundoArticleFixture = {
  headline:
    'Kamala vs Trump: el impacto electoral del conflicto de Medio Oriente en Dearborn, la primera ciudad de EE.UU. con mayoría árabe',
  byline: {
    name: 'Ayelén Oliva',
    role: 'BBC News Mundo',
  },
  image: {
    src: 'https://ichef.bbci.co.uk/ace/ws/720/cpsprodpb/6366/live/65a47510-84d2-11ef-8869-e90b7d6ed85d.jpg',
    alt: 'Dearborn, en Michigan, es la primera ciudad de mayoría árabe de EE.UU.',
  },
  // Repeated to make the article long enough to scroll past the sticky
  // navigation's activation point.
  bodyParagraphs: [
    ...mundoArticleParagraphs,
    ...mundoArticleParagraphs,
    ...mundoArticleParagraphs,
  ],
};


interface Props {
  navItems: NavigationType[];
  service: Services;
  isAmp?: boolean;
  bbcOrigin?: string;
  pageType?: PageTypes;
}

const Component = ({
  isAmp = false,
  navItems,
  service,
  bbcOrigin,
  pageType = HOME_PAGE,
}: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        isAmp={isAmp}
        service={service}
        pageType={pageType}
        pathname="/pathname"
        bbcOrigin={bbcOrigin}
      >
        <Navigation navItems={navItems} />
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Navigation',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Arabic = () => (
  <Component navItems={arabicNavItems} service="arabic" />
);

export const Pidgin = () => (
  <Component navItems={pidginNavItems} service="pidgin" />
);

export const PidginAmp = () => (
  <Component isAmp navItems={pidginNavItems} service="pidgin" />
);

export const StickyNavigation = () => (
  <ToggleContextProvider toggles={{ stickyNavigation: { enabled: true } }}>
    <Component
      service="mundo"
      bbcOrigin="https://www.test.bbc.com"
      pageType={ARTICLE_PAGE}
      navItems={[
        {
          title: 'Noticias',
          url: '/mundo',
          subItems: [
            { title: 'América Latina', url: '/mundo/america_latina' },
            { title: 'Internacional', url: '/mundo/internacional' },
            { title: 'Economía', url: '/mundo/economia' },
            { title: 'Ciencia', url: '/mundo/ciencia' },
          ],
        },
        { title: 'Videos', url: '/mundo/topics/cyx5krnw38vt', type: 'watch' },
        { title: 'Podcasts', url: '/mundo/podcasts', type: 'listen' },
      ]}
    />
    <main css={{ minHeight: '200vh', maxWidth: '40rem', margin: '0 auto' }}>
      <h1>{mundoArticleFixture.headline}</h1>
      <p>Scroll down, then up to reveal the sticky navigation.</p>
      <figure>
        <img
          src={mundoArticleFixture.image.src}
          alt={mundoArticleFixture.image.alt}
          css={{ width: '100%', height: 'auto' }}
        />
        <figcaption>{mundoArticleFixture.image.alt}</figcaption>
      </figure>
      <p>
        {mundoArticleFixture.byline.name} · {mundoArticleFixture.byline.role}
      </p>
      {mundoArticleFixture.bodyParagraphs.map((paragraph, index) => (
        <p
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          data-sticky-nav-anchor={index === 0 || undefined}
        >
          {paragraph}
        </p>
      ))}
    </main>
  </ToggleContextProvider>
);

PidginAmp.decorators = [AmpDecorator];
