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

export const Example = (_: StoryArgs, globalArgs: Props) => {
  const navItems = [
    {
      title: 'Home',
      url: '/home',
      subItems: [
        { title: 'Section 1', url: '/home/section1' },
        { title: 'Section 2', url: '/home/section2' },
      ],
    },
    {
      title: 'News',
      url: '/news',
    },
  ];
  return (
    <Component
      navItems={navItems}
      currentPath="/home"
      service={'afaanoromoo'}
    />
  );
};

// export const Canonical = (_, {}) => <Component />;

// export const Amp = (_, { service }) => <Component isAmp service={service} />;
// Amp.decorators = [AmpDecorator];
