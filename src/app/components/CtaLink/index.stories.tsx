import React from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';

import CtaLink from '.';

interface Props {
  href: string;
  children?: string;
}

const Component = ({ href, children }: Props) => (
  <ThemeProvider service="news">
    <CtaLink href={href}>{children}</CtaLink>
  </ThemeProvider>
);

export default {
  title: 'Components/CtaLink',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = () => {
  return <Component href="www.bbc.com/afrique">Call To Action</Component>;
};
