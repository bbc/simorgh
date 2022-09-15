import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';

import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import { Services, Variants } from '../../models/types/global';
import ThemeProvider from '../ThemeProvider';
import Link from '.';
import Paragraph from '../Paragraph';
import Heading from '../Heading';

interface Props {
  children: React.ReactNode;
  service: Services;
  variant: Variants;
  text: string;
}

const Providers = ({ children, service, variant }: Omit<Props, 'text'>) => (
  <ThemeProvider service={service} variant={variant}>
    {children}
  </ThemeProvider>
);

export const LinkWrappingContent = ({
  service,
  variant,
  text,
}: Omit<Props, 'children'>) => (
  <Providers service={service} variant={variant}>
    <Link to="/">
      <Heading level={2}>{text}</Heading>
      <Paragraph>{text}</Paragraph>
    </Link>
  </Providers>
);

export default {
  title: 'NewComponents/Link',
  Component: LinkWrappingContent,
  decorators: [withKnobs, withServicesKnob()],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
