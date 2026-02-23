import Navigation from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
// import AmpDecorator from '#storybook/helpers/ampDecorator';
import { StoryArgs } from '#app/models/types/storybook';
// import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import { NavigationContainerProps } from './types';
import { Services } from '#app/models/types/global';

interface Props {
  navItems: NavigationContainerProps['navItems'];
  currentPath?: string;
  service: Services;
  // propsForTopBarOJComponent?: {
  //   blocks?: TopStoryItem[];
  // };
}

const Component = ({
  navItems,
  currentPath = '',
  service,
  // propsForTopBarOJComponent,
}: Props) => {
  return (
    <ServiceContextProvider service={service}>
      <Navigation navItems={navItems} currentPath={currentPath} />
    </ServiceContextProvider>
  );
};

export default {
  title: 'Components/Navigation',
  Component,
  parameters: { docs: {} },
};

export const Arabic = (_: StoryArgs, globalArgs: Props) => {
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
  return (
    <Component navItems={navItems} currentPath="/home" service={'arabic'} />
  );
};

export const Pidgin = (_: StoryArgs, globalArgs: Props) => {
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
  return (
    <Component navItems={navItems} currentPath="/home" service={'pidgin'} />
  );
};

// export const Canonical = (_, {}) => <Component />;

// export const Amp = (_, { service }) => <Component isAmp service={service} />;
// Amp.decorators = [AmpDecorator];
