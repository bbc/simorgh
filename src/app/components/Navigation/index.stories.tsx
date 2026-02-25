import Navigation from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import type {
  Navigation as NavigationType,
  Services,
} from '#app/models/types/global';
import readme from './README.md';
import metadata from './metadata.json';

interface Props {
  navItems: NavigationType[];
  service: Services;
}

const Component = ({ navItems, service }: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <Navigation navItems={navItems} />
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
  return <Component navItems={navItems} service={'arabic'} />;
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
  return <Component navItems={navItems} service={'pidgin'} />;
};
