import React from 'react';

import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { StoryProps } from '../../models/types/storybook';
import ThemeProvider from '../ThemeProvider';
import InlineLink from '.';
import Text from '../Text';
import md from './README.md';

interface Props extends StoryProps {
  children: React.ReactNode;
  text: string;
}

const Providers = ({ children, service, variant }: Omit<Props, 'text'>) => (
  <ThemeProvider service={service} variant={variant}>
    <ServiceContextProvider service={service} variant={variant}>
      {children}
    </ServiceContextProvider>
  </ThemeProvider>
);

export const InternalInlineLink = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => (
  <Providers service={service} variant={variant}>
    <InlineLink to="https://www.bbc.com/mundo" text={text} />
  </Providers>
);

export const ExternalInlineLink = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => (
  <Providers service={service} variant={variant}>
    <InlineLink to="https://google.com" text={text} />
  </Providers>
);

export const InlineLinkWithTypographyStyles = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => (
  <Providers service={service} variant={variant}>
    <InlineLink to="/" text={text} fontVariant="serifBold" size="elephant" />
  </Providers>
);

export const InlineLinkInsideText = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => {
  const words = text.split(' ');
  const middleIndex = Math.ceil(words.length / 2) - 1;
  const middleWord = words[middleIndex];

  return (
    <Providers service={service} variant={variant}>
      <Text>
        {words.slice(0, middleIndex).join(' ')}
        &nbsp;
        <InlineLink to="/igbo/articles/ceqnwl68n3qo" text={middleWord} />
        &nbsp;
        {words.slice(middleIndex + 1).join(' ')}
      </Text>
    </Providers>
  );
};

export default {
  title: 'New Components/InlineLink',
  Component: InternalInlineLink,
  parameters: {
    chromatic: {
      disable: true,
    },
    docs: {
      component: {
        title: 'InlineLink',
      },
      page: md,
    },
  },
};
