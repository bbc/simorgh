import React, { PropsWithChildren } from 'react';

import { withKnobs } from '@storybook/addon-knobs';
import { withServicesKnob } from '../../legacy/psammead/psammead-storybook-helpers/src';
import ThemeProvider from '../ThemeProvider';

import { CallToActionLinkProps } from './types';
import CallToActionLink from '.';

const Component = ({
  href,
  children,
}: PropsWithChildren<CallToActionLinkProps>) => (
  <ThemeProvider service="news">
    <CallToActionLink href={href}>{children}</CallToActionLink>
  </ThemeProvider>
);

export default {
  title: 'Components/Call To Action Link',
  Component,
  decorators: [withKnobs, withServicesKnob()],
};

export const Example = () => {
  return <Component href="www.bbc.com/afrique">Call To Action</Component>;
};
