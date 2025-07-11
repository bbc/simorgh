import React from 'react';
import { StoryProps } from '#app/models/types/storybook';

interface Props extends StoryProps {
  children: React.ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  // Simple mock that just renders children without any theme context
  return <div data-testid="theme-provider">{children}</div>;
};

export default ThemeProvider;
