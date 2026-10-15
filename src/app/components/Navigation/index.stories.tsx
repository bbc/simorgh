import Navigation from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import type {
  Navigation as NavigationType,
  Services,
} from '#app/models/types/global';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
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

interface Props {
  navItems: NavigationType[];
  service: Services;
  isAmp?: boolean;
  bbcOrigin?: string;
}

const Component = ({ isAmp = false, navItems, service, bbcOrigin }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        isAmp={isAmp}
        service={service}
        pageType={HOME_PAGE}
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
    <main css={{ minHeight: '200vh' }}>
      <p>Scroll down, then up to reveal the sticky navigation.</p>
    </main>
  </ToggleContextProvider>
);

PidginAmp.decorators = [AmpDecorator];
