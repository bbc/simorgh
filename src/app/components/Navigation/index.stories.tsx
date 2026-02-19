// import AmpDecorator from '#storybook/helpers/ampDecorator';
import { StoryArgs } from '#app/models/types/storybook';
import Navigation from '.';
import { NavigationItem } from './types';

interface Props {
  topScrollableListItems?: React.ReactNode;
  navItems: NavigationItem[];
  currentPath?: string;
}

const Component = ({ navItems, currentPath = '' }: Props) => {
  return <Navigation navItems={navItems} currentPath={currentPath} />;
};

export default {
  title: 'Components/Navigation',
  Component,
  parameters: { docs: {} },
};

export const Example = (_: StoryArgs, globalArgs: Props) => {
  const { navItems, currentPath } = globalArgs;

  return <Component navItems={navItems} currentPath={currentPath} />;
};

// export const Canonical = (_, {}) => <Component />;

// export const Amp = (_, { service }) => <Component isAmp service={service} />;
// Amp.decorators = [AmpDecorator];
