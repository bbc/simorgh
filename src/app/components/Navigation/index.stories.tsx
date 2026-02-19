// import AmpDecorator from '#storybook/helpers/ampDecorator';
import { StoryArgs } from '#app/models/types/storybook';
// import { TopStoryItem } from '#app/pages/ArticlePage/PagePromoSections/TopStoriesSection/types';
import Navigation from '.';
import { NavigationContainerProps } from './types';

interface Props {
  navItems: NavigationContainerProps['navItems'];
  currentPath?: string;
  // propsForTopBarOJComponent?: {
  //   blocks?: TopStoryItem[];
  // };
}

const Component = ({
  navItems,
  currentPath = '',
  // propsForTopBarOJComponent,
}: Props) => {
  return (
    <Navigation
      navItems={navItems}
      currentPath={currentPath}
      // propsForTopBarOJComponent={propsForTopBarOJComponent}
    />
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

  return <Component navItems={navItems} currentPath="/home" />;
};

// export const Canonical = (_, {}) => <Component />;

// export const Amp = (_, { service }) => <Component isAmp service={service} />;
// Amp.decorators = [AmpDecorator];
