import Navigation from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import type {
  Navigation as NavigationType,
  Services,
} from '#app/models/types/global';
import readme from './README.md';
import metadata from './metadata.json';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { HOME_PAGE } from '#app/routes/utils/pageTypes';
import AmpDecorator from '#storybook/helpers/ampDecorator';

interface Props {
  navItems: NavigationType[];
  service: Services;
  isAmp?: boolean;
}

const Component = ({ isAmp = false, navItems, service }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        isAmp={isAmp}
        service={service}
        pageType={HOME_PAGE}
        pathname="/pathname"
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

export const Arabic = () => {
  const navItems = [
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
  return <Component navItems={navItems} service="arabic" />;
};

export const Pidgin = () => {
  const navItems = [
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
  return <Component navItems={navItems} service="pidgin" />;
};

export const PidginAmp = () => {
  const navItems = [
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
  return <Component isAmp navItems={navItems} service="pidgin" />;
};

PidginAmp.decorators = [AmpDecorator];
